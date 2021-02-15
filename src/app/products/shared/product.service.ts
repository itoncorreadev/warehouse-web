import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { TokenService } from "../../shared/token.service";
import { Product } from "./product.model";

@Injectable()

export class ProductService{
  public productUrl = "products";

  public constructor(private tokenHttp: TokenService){}

  public getAll(): Observable<Product[]>{
    let url = `${this.productUrl}?q[s]=updated_at+DESC`;

    return this.tokenHttp.get(url).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToProducts(response))
    )
  }

  public getImportant(): Observable<Product[]>{
    let url = `${this.productUrl}?q[s]=updated_at+ASC`;

    return this.tokenHttp.get(url).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToProducts(response).slice(0, 3))
    )
  }

  public getById(id: number): Observable<Product>{
    let url = `${this.productUrl}/${id}`;
    return this.tokenHttp.get(url).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToProduct(response))
    )
  }

  public create(product: Product): Observable<Product>{
    let url = this.productUrl;
    let body = JSON.stringify(product);

    return this.tokenHttp.post(url, body).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToProduct(response))
    )
  }

  public update(product: Product): Observable<Product>{
    let url = `${this.productUrl}/${product.id}`;
    let body = JSON.stringify(product);

    return this.tokenHttp.put(url, body).pipe(
      catchError(this.handleErrors),
      map(() => product)
    )
  }

  public delete(id: number): Observable<null>{
    let url = `${this.productUrl}/${id}`;

    return this.tokenHttp.delete(url).pipe(
      catchError(this.handleErrors),
      map(() => null)
    )
  }

  public searchByName(term: string): Observable<Product[]>{
    let url = `${this.productUrl}?q[name_cont]=${term}`;

    return this.tokenHttp.get(url).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToProducts(response))
    )
  }

  private handleErrors(error: Response){
    console.log("SALVANDO O ERRO NUM ARQUIVO DE LOG - DETALHES DO ERRO =>", error);
    return throwError(error);
  }

  private responseToProducts(response: Response): Product[]{
    let collection = response.json().data as Array<any>
    let products: Product[] = [];

    collection.forEach(item => {
      let product = new Product(
        item.id,
        item.attributes.name,
        item.attributes.description,
        item.attributes.code,
        item.attributes['product-type'],
        item.attributes.measure,
        item.attributes.min,
        item.attributes.med,
        item.attributes.max,
        item.attributes.location,
        item.attributes.status
      )
      products.push(product)
    })

    return products;
  }

  private responseToProduct(response: Response): Product {
    return new Product(
      response.json().data.id,
      response.json().data.attributes.name,
      response.json().data.attributes.description,
      response.json().data.attributes.code,
      response.json().data.attributes['product-type'],
      response.json().data.attributes.measure,
      response.json().data.attributes.min,
      response.json().data.attributes.med,
      response.json().data.attributes.max,
      response.json().data.attributes.location,
      response.json().data.attributes.status
    )
  }
}

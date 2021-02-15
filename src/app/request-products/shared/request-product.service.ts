import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { Observable, throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { TokenService } from "../../shared/token.service";
import { RequestProduct } from "./request-product.model";

@Injectable()

export class RequestProductService{

  public detailUrl0 = "requests";
  public requestId = '';
  public detailUrl1 = "details";

  constructor(private tokenHttp: TokenService){}

  public getAll(requestId: string): Observable<RequestProduct[]>{
    this.requestId = requestId;
    let url = `${this.detailUrl0}/${requestId}/${this.detailUrl1}?q[s]=updated_at+DESC`;

    return this.tokenHttp.get(url).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToRequestProducts(response))
    )
  }

  public getImportant(): Observable<RequestProduct[]>{
    let url = `${this.detailUrl0}/${this.requestId}/${this.detailUrl1}?q[s]=deadline+ASC`;

    return this.tokenHttp.get(url).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToRequestProducts(response).slice(0, 3))
    )
  }

  public getById(id: number): Observable<RequestProduct>{
    let url = `${this.detailUrl0}/${this.requestId}/${this.detailUrl1}/${id}`;

    return this.tokenHttp.get(url).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToRequestProduct(response))
    )
  }

  public create(requestProduct: RequestProduct): Observable<RequestProduct>{
    let url = `${this.detailUrl0}/${this.requestId}/${this.detailUrl1}`;
    let body = JSON.stringify(requestProduct);

    return this.tokenHttp.post(url, body).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToRequestProduct(response))
    )
  }

  public update(requestProduct: RequestProduct): Observable<RequestProduct>{
    let url = `${this.detailUrl0}/${this.requestId}/${this.detailUrl1}/${requestProduct.id}`;
    let body = JSON.stringify(requestProduct);

    return this.tokenHttp.put(url, body).pipe(
      catchError(this.handleErrors),
      map(() => requestProduct)
    )
  }

  public delete(id: number): Observable<RequestProduct>{
    let url = `${this.detailUrl0}/${this.requestId}/${this.detailUrl1}/${id}`;

    return this.tokenHttp.delete(url).pipe(
      catchError(this.handleErrors),
      map(() => null)
    )
  }

  public searchByProductName(term: string): Observable<RequestProduct[]>{
    let url = `${this.detailUrl0}/${this.requestId}/${this.detailUrl1}?q[name_cont]=${term}`;

    return this.tokenHttp.get(url).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToRequestProducts(response))
    )
  }

  private handleErrors(error: Response){
    console.log("SALVANDO O ERRO NUM ARQUIVO DE LOG - DETALHES DO ERRO =>", error);
    return throwError(error);
  }

  private responseToRequestProducts(response: Response): RequestProduct[]{
    let collection = response.json().data as Array<any>;
    let requestProducts: RequestProduct[] = [];

    collection.forEach(item => {
      let requestProduct = new RequestProduct(
        item.id,
        item.attributes.quantity,
        item.attributes['unit-price'],
        item.attributes['total-price'],
        item.attributes.observation,
        item.attributes.product.name
      )
      requestProducts.push(requestProduct);
    })
    return requestProducts;
  }

  private responseToRequestProduct(response: Response): RequestProduct {
    return new RequestProduct(
      response.json().data.id,
      response.json().data.attributes.quantity,
      response.json().data.attributes['unit-price'],
      response.json().data.attributes['total-price'],
      response.json().data.attributes.observation,
      response.json().data.attributes.product.name
    )
  }
}

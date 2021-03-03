import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Product } from "../products/shared/product.model";
import { ProductService } from "../products/shared/product.service";
import { RequestProduct } from './shared/request-product.model';
import { RequestProductService } from './shared/request-product.service';

@Component({
  selector: 'request-products',
  templateUrl: './request-products.component.html',
  styleUrls: ['../app.component.css']
})

export class RequestProductsComponent implements OnInit{
  public products: Array<Product>;
  public requestProducts: Array<RequestProduct>;
  public newRequestProduct: RequestProduct;
  public paginaAtual = 1;
  public errors = [];
  public requestId: string;

  public constructor(
    private requestProductService: RequestProductService,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private location: Location
  ){
    this.newRequestProduct = new RequestProduct(null, null, '', null);
  }

  public ngOnInit(){

    this.requestId = this.activatedRoute.snapshot.params['request_id'];

    this.requestProductService.getAll(this.requestId)
      .subscribe(
        requestProducts => this.requestProducts = requestProducts.sort((a, b) => b.id - a.id),
        error => this.errors.push("Ocorreu um error no servidor, tente mais tarde.")
      )

      this.productService.getAll()
      .subscribe(
        products => this.products = products.sort((a, b) => b.id - a.id),
        error => this.errors.push("Ocorreu um error no servidor, tente mais tarde.")
      )
  }


  public createRequestProduct(){

    this.errors= [];

    if(!this.newRequestProduct.product_id || !this.newRequestProduct.quantity || !this.newRequestProduct.unit_price){
      if(!this.newRequestProduct.product_id)
      this.errors.push("Selecione um produto válido.");
      if(!this.newRequestProduct.quantity)
      this.errors.push("Adicione a quantidade do produto selecionado.");
      if(!this.newRequestProduct.unit_price)
      this.errors.push("Adicione o valor do produto selecionado.");
    } else {
      this.requestProductService.create(this.newRequestProduct)
        .subscribe(
          requestProduct => {
            this.requestProducts.unshift(requestProduct);
            this.newRequestProduct = new RequestProduct(null, null, '', null);
          },
          () => this.errors.push("Ocorreu um erro no servidor, tente mais tarde!")
        )
    }
  }

  public deleteRequestProduct(requestProduct: RequestProduct){
    if(confirm(`Deseja realmente excluir a detail "${requestProduct.observation} de ${requestProduct.observation}"`)){
      this.requestProductService.delete(requestProduct.id)
        .subscribe(
          () => this.requestProducts = this.requestProducts.filter(t => t !== requestProduct),
          () => "Ocorreu um erro no servidor, tente novamente mais tarde!",
        )
    }
  }

  public goBack(){
    this.location.back();
  }

}

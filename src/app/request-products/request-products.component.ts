import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { RequestProduct } from './shared/request-product.model';
import { RequestProductService } from './shared/request-product.service';

@Component({
  selector: 'request-products',
  templateUrl: './request-products.component.html'
})

export class RequestProductsComponent implements OnInit{
  public requestProducts: Array<RequestProduct>;
  public newRequestProduct: RequestProduct;

  public constructor(private requestProductService: RequestProductService, private activatedRoute: ActivatedRoute){
    this.newRequestProduct = new RequestProduct(null, null, '', '', '', '');
  }

  public ngOnInit(){

    const requestId = this.activatedRoute.snapshot.params['request_id'];

    this.requestProductService.getAll(requestId)
      .subscribe(
        requestProduct => this.requestProducts = requestProduct.sort((a, b) => b.id - a.id),
        error => alert("Ocorreu um error no servidor, tente mais tarde.")
      )
  }

  public createRequestProduct(){
    this.newRequestProduct.quantity = this.newRequestProduct.quantity;

    if(!this.newRequestProduct.quantity){
      alert("Adicione a quantidade do produto!")
    } else {
      console.log(this.newRequestProduct);
      this.requestProductService.create(this.newRequestProduct)
        .subscribe(
          requestProduct => {
            this.requestProducts.unshift(requestProduct);
            this.newRequestProduct = new RequestProduct(null, null, '', '', '', '');
          },
          () => alert("Ocorreu um erro no servidor, tente mais tarde!")
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
}

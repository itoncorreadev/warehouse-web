import { Location } from "@angular/common";
import { Component, OnInit, TemplateRef } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { LoaderService } from "../components/loader/loader.service";
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
  public modalRef: BsModalRef;

  public constructor(
    private requestProductService: RequestProductService,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private location: Location,
    private loaderService: LoaderService,
    private modalService: BsModalService
  ){
    this.newRequestProduct = new RequestProduct(null, null, '', null);
  }

  public ngOnInit(){
    this.requestId = this.activatedRoute.snapshot.params['request_id'];
    this.requestProductService.getAll(this.requestId)
      .subscribe(
        requestProducts => this.requestProducts = requestProducts.sort((a, b) => b.id - a.id),
        error => this.errors.push("Ocorreu um error no servidor, tente mais tarde."),
        () => this.loaderService.hide()
      )

      this.productService.getAll()
      .subscribe(
        products => this.products = products.sort((a, b) => b.id - a.id),
        error => this.errors.push("Ocorreu um error no servidor, tente mais tarde."),
        () => this.loaderService.hide()
      )
  }

  public ngAfterViewInit(){
    this.loaderService.show()
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'})
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
      this.loaderService.show();
      this.requestProductService.create(this.newRequestProduct)
        .subscribe(
          requestProduct => {
            this.requestProducts.unshift(requestProduct);
            this.newRequestProduct = new RequestProduct(null, null, '', null);
          },
          () => this.errors.push("Ocorreu um erro no servidor, tente mais tarde!"),
          () => this.loaderService.hide()
        )
    }
  }

  public deleteRequestProduct(requestProduct: RequestProduct): void{
    this.loaderService.show();
    this.requestProductService.delete(requestProduct.id)
        .subscribe(
          () => this.requestProducts = this.requestProducts.filter(t => t !== requestProduct),
          () => "Ocorreu um erro no servidor, tente novamente mais tarde!",
          () => this.loaderService.hide()
        )
    this.modalRef.hide();
  }

  public decline(){
    this.modalRef.hide();
    this.loaderService.hide();
  }

  public goBack(){
    this.location.back();
  }

}

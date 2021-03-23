import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoaderService } from "../components/loader/loader.service";
import { Product } from './shared/product.model';
import { ProductService } from "./shared/product.service";

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['../app.component.css']
})

export class ProductsComponent implements OnInit{
  public products: Array<Product>;
  public newProduct: Product;
  public paginaAtual = 1;
  public errorText = '';
  public modalRef: BsModalRef;

  public constructor(
    private productService: ProductService,
    private loaderService: LoaderService,
    private modalService: BsModalService
  ){
    this.newProduct = new Product(null, '');
  }

  public ngOnInit(){
    this.productService.getAll()
      .subscribe(
        products => this.products = products.sort((a, b) => b.id - a.id),
        error => this.errorText = "Ocorreu um error no servidor, tente mais tarde.",
        () => this.loaderService.hide()
      )
  }

  public ngAfterViewInit(){
    this.loaderService.show();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'})
  }

  public createProduct(){
    this.errorText = '';
    this.newProduct.name = this.newProduct.name.trim();

    if(!this.newProduct.name){
      this.errorText = "O produto deve ter um nome!";
    } else {
      this.loaderService.show()
      this.productService.create(this.newProduct)
        .subscribe(
          product => {
            this.products.unshift(product),
            this.newProduct = new Product(null, '')
          },
          () => this.errorText = "Ocorreu um erro no servidor, tente mais tarde!",
          () => this.loaderService.hide()
        )
    }
  }

  public deleteProduct(product: Product): void {
    this.loaderService.show();
    this.productService.delete(product.id)
        .subscribe(
          () => this.products = this.products.filter(t => t !== product),
          () => "Ocorreu um erro no servidor, tente novamente mais tarde!",
          () => this.loaderService.hide()
        )
    this.modalRef.hide();
  }

  public decline(){
    this.modalRef.hide();
    this.loaderService.hide();
  }

  public colorClassForStatus(fieldName: string){
    return {
      "success": fieldName == "success",
      "warning": fieldName == "warning",
      "danger": fieldName == "danger",
      "info": fieldName == "info"
    }
  }

  public labelClassForStatus(fieldName: string){
    return {
      "label-success": fieldName == "success",
      "label-warning": fieldName == "warning",
      "label-danger": fieldName == "danger",
      "label-info": fieldName == "info"
    }
  }

}

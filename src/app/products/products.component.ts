import { Component, OnInit } from "@angular/core";
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

  public constructor(private productService: ProductService, private loaderService: LoaderService){
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

  public createProduct(){
    this.loaderService.show()
    this.errorText = '';
    this.newProduct.name = this.newProduct.name.trim();

    if(!this.newProduct.name){
      this.errorText = "O produto deve ter um nome!";
    } else {
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

  public deleteProduct(product: Product){
    this.loaderService.show()
    if(confirm(`Deseja realmente excluir o produto "${product.name}"`)){
      this.productService.delete(product.id)
        .subscribe(
          () => this.products = this.products.filter(t => t !== product),
          () => "Ocorreu um erro no servidor, tente novamente mais tarde!",
          () => this.loaderService.hide()
        )
    } else {
      this.loaderService.hide()
    }
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

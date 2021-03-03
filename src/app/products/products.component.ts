import { Component, OnInit } from "@angular/core";
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

  public constructor(private productService: ProductService){
    this.newProduct = new Product(null, '');
  }

  public ngOnInit(){
    this.productService.getAll()
      .subscribe(
        products => this.products = products.sort((a, b) => b.id - a.id),
        error => this.errorText = "Ocorreu um error no servidor, tente mais tarde."
      )
  }

  public createProduct(){
    this.errorText = '';
    this.newProduct.name = this.newProduct.name.trim();

    if(!this.newProduct.name){
      this.errorText = "O produto deve ter um nome!";
    } else {
      this.productService.create(this.newProduct)
        .subscribe(
          product => {
            this.products.unshift(product);
            this.newProduct = new Product(null, '');
          },
          () => this.errorText = "Ocorreu um erro no servidor, tente mais tarde!"
        )
    }
  }

  public deleteProduct(product: Product){
    if(confirm(`Deseja realmente excluir o produto "${product.name}"`)){
      this.productService.delete(product.id)
        .subscribe(
          () => this.products = this.products.filter(t => t !== product),
          () => "Ocorreu um erro no servidor, tente novamente mais tarde!",
        )
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

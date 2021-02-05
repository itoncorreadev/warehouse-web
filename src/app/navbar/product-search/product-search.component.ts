import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { of, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { Product } from "../../products/shared/product.model";
import { ProductService } from "../../products/shared/product.service";

@Component({
  selector: 'product-search',
  templateUrl: './product-search.component.html'
})

export class ProductSearchComponent implements OnInit{

  public searchTerms: Subject<string> = new Subject();
  public products: Product[] = [];

  public constructor(private productService: ProductService, private router: Router){}

  public ngOnInit(){
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(
        term => term ? this.productService.searchByName(term) : of<Product[]>([])
      )
    ).subscribe(products => this.products = products)
  }

  public search(term: string){
    this.searchTerms.next(term);
  }

  public gotoProduct(product: Product){
    this.products = [];
    this.router.navigate(['/products', product.id]);
  }
}

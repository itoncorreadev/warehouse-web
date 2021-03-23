import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { Product } from "../../products/shared/product.model";
import { ProductService } from "../../products/shared/product.service";
import { FormUtils } from "../../shared/form.utils";
import { RequestProduct } from '../shared/request-product.model';
import { RequestProductService } from "../shared/request-product.service";


@Component({
  selector: 'request-product-detail',
  templateUrl: './request-product-detail.component.html',
  styles: [".form-control-feedback{ margin-right: 25px }"]
})

export class RequestProductDetailComponent implements OnInit{
  public form: FormGroup;
  public requestProduct: RequestProduct;
  public productTypeOptions: Array<any>;
  public productMeasureOptions: Array<any>;
  public productGroupOptions: Array<any>;
  public productStatusOptions: Array<any>;
  public formUtils: FormUtils;
  public products: Array<Product>;
  public msgText = '';

  public constructor(
    private requestProductService: RequestProductService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder
  ){
    this.productTypeOptions = [
      { value: true, text: "Perresível"},
      { value: false, text: "Não peresível"}
    ];

    this.productStatusOptions = [
      { value: true, text: "Ativo"},
      { value: false, text: "Inativo"}
    ];

    this.productMeasureOptions = [
      { value: "Un", text: "Unidade"},
      { value: "Kg", text: "Quilograma"},
      { value: "ml", text: "Mililitro"},
      { value: "Pc", text: "Pacote"}
    ];

    this.productGroupOptions = [
      { value: 1, text: "Diversos"},
      { value: 2, text: "Bebidas e Sucos"},
      { value: 3, text: "Limpeza e Higiene"}
    ];

    this.form = this.formBuilder.group({
      quantity: [null],
      unit_price: [null],
      product_id: [null]
    })

    this.formUtils = new FormUtils(this.form);
  }

  public ngOnInit(){
    this.requestProduct = new RequestProduct(null, null, null, null);

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.requestProductService.getById(+params.get('id')))
    )
    .subscribe(
      requestProduct => this.setRequestProduct(requestProduct),
      error => alert("Ocorreu um error no servidor, tente mais tarde.")
    )

    this.productService.getAll()
      .subscribe(
        products => this.products = products.sort((a, b) => b.id - a.id),
        error => alert("Ocorreu um error no servidor, tente mais tarde.")
      )
  }

  public setRequestProduct(requestProduct: RequestProduct): void {
    this.requestProduct = requestProduct;
    this.form.patchValue(requestProduct);
  }

  public goBack(){
    this.location.back();
  }

  public updateRequestProduct(){
    this.requestProduct.quantity = this.form.get('quantity').value;
    this.requestProduct.unit_price = this.form.get('unit_price').value;
    this.requestProduct.product_id = this.form.get('product_id').value;

    this.requestProductService.update(this.requestProduct)
    .subscribe(
      () => this.msgText = "Produto atualizado com sucesso!",
      () => alert("Ocorreu um erro no servidor, tente mais tarde!"),
      () => setTimeout(function(){history.back();}, 3000)
    )
  }
}

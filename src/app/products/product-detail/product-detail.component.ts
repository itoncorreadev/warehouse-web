import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { FormUtils } from "../../shared/form.utils";
import { Product } from '../shared/product.model';
import { ProductService } from "../shared/product.service";



@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styles: [".form-control-feedback{ margin-right: 25px }"]
})

export class ProductDetailComponent implements OnInit{
  public form: FormGroup;
  public product: Product;
  public productTypeOptions: Array<any>;
  public productMeasureOptions: Array<any>;
  public productGroupOptions: Array<any>;
  public productStatusOptions: Array<any>;
  public formUtils: FormUtils;


  public constructor(
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
      name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      description: [null, Validators.required],
      category: [null],
      code: [null],
      product_type: [null],
      measure: [null],
      min: [null],
      med: [null],
      max: [null],
      location: [null],
      status: [null]
    })

    this.formUtils = new FormUtils(this.form);
  }


  public ngOnInit(){
    this.product = new Product(null, null);

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.productService.getById(+params.get('id')))
    )
    .subscribe(
      product => this.setProduct(product),
      error => alert("Ocorreu um error no servidor, tente mais tarde.")
    )
  }


  public setProduct(product: Product): void {
    this.product = product;
    console.log(product);
    this.form.patchValue(product);
  }


  public goBack(){
    this.location.back();
  }


  public updateProduct(){
    this.product.name = this.form.get('name').value;
    this.product.description = this.form.get('description').value;
    this.product.category = this.form.get('category').value;
    this.product.code = this.form.get('code').value;
    this.product.product_type = this.form.get('product_type').value;
    this.product.measure = this.form.get('measure').value;
    this.product.min = this.form.get('min').value;
    this.product.med = this.form.get('med').value;
    this.product.max = this.form.get('max').value;
    this.product.location = this.form.get('location').value;
    this.product.status = this.form.get('status').value;

    this.productService.update(this.product)
    .subscribe(
      () => alert("Produto atualizado com sucesso!"),
      () => alert("Ocorreu um erro no servidor, tente mais tarde!"),
      () => this.goBack()
    )
  }
}

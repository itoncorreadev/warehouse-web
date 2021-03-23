import { Component, OnInit } from "@angular/core";
import { RequestService } from 'app/requests/shared/request.service';
import { TableUtils } from 'app/shared/table.utils';
import { LoaderService } from "../components/loader/loader.service";
import { Product } from "../products/shared/product.model";
import { ProductService } from "../products/shared/product.service";
import { Request } from "../requests/shared/request.model";
import { Task } from "../tasks/shared/task.model";
import { TaskService } from "../tasks/shared/task.service";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../app.component.css']
})

export class DashboardComponent implements OnInit{
  public tasks: Task[];
  public products: Product[];
  public requests: Request[];
  public tableUtils: TableUtils;
  public paginaAtualTask = 1;
  public paginaAtualProduct = 1;
  public paginaAtualRequest = 1;

  public constructor(
    private taskService: TaskService,
    private productService: ProductService,
    private requestService: RequestService,
    private loaderService: LoaderService
  ){}

  public ngOnInit(){
    this.taskService.getImportant()
      .subscribe(
        tasks => this.tasks = tasks,
        error => alert("Ocorreu um error no servidor, tente mais tarde."),
        () => this.loaderService.hide()
      )

    this.productService.getImportant()
      .subscribe(
        products => this.products = products,
        error => alert("Ocorreu um error no servidor, tente mais tarde.")
      )

    this.requestService.getImportant()
      .subscribe(
        requests => this.requests = requests,
        error => alert("Ocorreu um error no servidor, tente mais tarde.")
      )
  }

  public ngAfterViewInit(){
    this.loaderService.show();
  }

  public iconClassForInOut(fieldName: string){
    return {
      "glyphicon-arrow-down text-success": fieldName == "in",
      "glyphicon-arrow-up text-danger": fieldName == "out",
      "glyphicon-refresh text-warning": fieldName == "devolution"
    }
  }

  public colorClassForStatus(fieldName: boolean){
    return {
      "success": fieldName == true,
      "danger animate__animated animate__pulse animate__infinite animate__slow": fieldName == false
    }
  }

  public labelClassForStatus(fieldName: boolean): object{
    return {
      "label-success": fieldName == true,
      "label-danger": fieldName == false
    }
  }

  public animatedClassForStatus(fieldName: boolean){
    return {
      "animate__animated animate__bounceIn animate__repeat-2": fieldName == false
    }
  }

  public colorClassForStatusProduct(fieldName: string){
    return {
      "success": fieldName == "success",
      "warning": fieldName == "warning",
      "animate__animated animate__pulse animate__infinite animate__slow danger": fieldName == "danger",
      "info": fieldName == "info"
    }
  }

  public labelClassForStatusProduct(fieldName: string){
    return {
      "label-success": fieldName === "success",
      "label-warning": fieldName === "warning",
      "label-danger": fieldName === "danger",
      "label-info": fieldName === "info"
    }
  }


}

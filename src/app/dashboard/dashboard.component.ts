import { Component, OnInit } from "@angular/core";
import { RequestService } from 'app/requests/shared/request.service';
import { TableUtils } from 'app/shared/table.utils';
import { Product } from "../products/shared/product.model";
import { ProductService } from "../products/shared/product.service";
import { Request } from "../requests/shared/request.model";
import { Task } from "../tasks/shared/task.model";
import { TaskService } from "../tasks/shared/task.service";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit{
  public tasks: Task[];
  public products: Product[];
  public requests: Request[];
  public tableUtils: TableUtils;

  public constructor(private taskService: TaskService, private productService: ProductService, private requestService: RequestService){}

  public ngOnInit(){
    this.taskService.getImportant()
      .subscribe(
        tasks => this.tasks = tasks,
        error => alert("Ocorreu um error no servidor, tente mais tarde.")
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

  public iconClassForInOut(fieldName: string){
    return {
      "glyphicon-arrow-down text-success": fieldName == "in",
      "glyphicon-arrow-up text-danger": fieldName == "out",
      "glyphicon-refresh text-warning": fieldName == "devolution"
    }
  }

  public colorClassForInOut(fieldName: string){
    return {
      "success": fieldName == "in",
      "danger": fieldName == "out",
      "warning": fieldName == "devolution"
    }
  }

  public colorClassForStatusTask(fieldName: string){
    return {
      "success": fieldName == "Feita",
      "danger": fieldName == "Pendente"
    }
  }

  public colorClassForStatusProduct(fieldName: string){
    return {
      "success": fieldName == "success",
      "warning": fieldName == "warning",
      "danger": fieldName == "danger",
      "info": fieldName == "info"
    }
  }

}

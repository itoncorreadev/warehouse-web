import { Component, OnInit } from "@angular/core";
import { Product } from "../products/shared/product.model";
import { ProductService } from "../products/shared/product.service";
import { Task } from "../tasks/shared/task.model";
import { TaskService } from "../tasks/shared/task.service";

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
})

export class DashboardComponent implements OnInit{
  public tasks: Task[];
  public products: Product[];

  public constructor(private taskService: TaskService, private productService: ProductService){}

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
  }
}

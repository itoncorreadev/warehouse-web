import { Component } from "@angular/core";
import { TaskService } from "../../tasks/shared/task.service";

@Component({
  selector: 'task-search',
  templateUrl: './task-search.component.html'
})

export class TaskSearchComponent{

  public constructor(private taskService: TaskService){}

}

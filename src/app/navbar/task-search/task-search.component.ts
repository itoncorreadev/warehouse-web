import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import "rxjs/add/observable/of";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/switchMap";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { Task } from "../../tasks/shared/task.model";
import { TaskService } from "../../tasks/shared/task.service";

@Component({
  selector: 'task-search',
  templateUrl: './task-search.component.html'
})

export class TaskSearchComponent implements OnInit{

  public searchTerms: Subject<any> = new Subject();
  public tasks: Task[] = [];

  public constructor(private taskService: TaskService, private router: Router){}

  public ngOnInit(){
    this.searchTerms
    .debounceTime(300)
    .distinctUntilChanged()
    .switchMap(
      term => term ? this.taskService.searchByTitle(term) : Observable.of<Task[]>([])
    ).subscribe(tasks => this.tasks = tasks)
  }

  public search(term: string){
    this.searchTerms.next(term);
  }

  public gotoTask(task: Task){
    this.tasks = [];
    this.router.navigate(['/tasks', task.id]);
  }
}

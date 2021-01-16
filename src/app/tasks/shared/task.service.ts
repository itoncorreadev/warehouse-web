import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { Task } from "./task.model";

@Injectable()

export class TaskService{
  public taskUrl = "api/tasks";

  public constructor(private http: Http){}

  public getTasks(): Observable<Task[]>{
    return this.http.get(this.taskUrl)
      .map((response: Response) => response.json().data as Task[])
  }

  public getImportantTasks(): Observable<Task[]>{
    return this.getTasks()
      .map(tasks => tasks.slice(0,3));
  }

  public getTask(id: number): Observable<Task>{
    let url = `${this.taskUrl}/${id}`;
    return this.http.get(url)
      .map((response: Response) => response.json().data as Task);
  }
}

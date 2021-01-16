import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/add/Observable/throw";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { Task } from "./task.model";

@Injectable()

export class TaskService{
  public taskUrl = "api/tasks";

  public constructor(private http: Http){}

  public getTasks(): Observable<Task[]>{
    return this.http.get(this.taskUrl)
      .catch(this.handleErrors)
      .map((response: Response) => response.json().data as Task[])
  }

  public getImportantTasks(): Observable<Task[]>{
    return this.getTasks()
      .catch(this.handleErrors)
      .map(tasks => tasks.slice(0,3));
  }

  public getTask(id: number): Observable<Task>{
    let url = `${this.taskUrl}/${id}`;
    return this.http.get(url)
      .catch(this.handleErrors)
      .map((response: Response) => response.json().data as Task);
  }

  private handleErrors(error: Response){
    console.log("SALVANDO O ERRO NUM ARQUIVO DE LOG - DETALHES DO ERRO =>", error);
    return Observable.throw(error);
  }
}

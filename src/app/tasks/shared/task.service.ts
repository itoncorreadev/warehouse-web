import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
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

  public createTask(task: Task): Observable<Task>{
    let url = this.taskUrl;
    let body = JSON.stringify(task);
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post(url, body, { headers: headers})
      .catch(this.handleErrors)
      .map(response => response.json().data as Task)
  }

  public updateTask(task: Task): Observable<Task>{
    let url = `${this.taskUrl}/${task.id}`;
    let body = JSON.stringify(task);
    let headers = new Headers({'Content-type': 'application/json'});

    return this.http.put(url, body, { headers: headers })
      .catch(this.handleErrors)
      .map(() => task)
  }

  public deleteTask(id: number): Observable<null>{
    let url = `${this.taskUrl}/${id}`;
    let headers = new Headers({'Content-type': 'application/json'});

    return this.http.delete(url, {headers: headers })
      .catch(this.handleErrors)
      .map(() => null)
  }

  private handleErrors(error: Response){
    console.log("SALVANDO O ERRO NUM ARQUIVO DE LOG - DETALHES DO ERRO =>", error);
    return Observable.throw(error);
  }
}

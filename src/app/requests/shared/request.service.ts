import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { TokenService } from "../../shared/token.service";
import { Request } from "./request.model";

@Injectable()

export class RequestService{

  public requestUrl = "requests";

  constructor(private tokenHttp: TokenService){}

  public getAll(): Observable<Request[]>{
    let url = `${this.requestUrl}?q[s]=updated_at+DESC`;

    return this.tokenHttp.get(url).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToRequests(response))
    )
  }

  public getImportant(): Observable<Request[]>{
    let url = `${this.requestUrl}?q[s]=updated_at+DESC`;

    return this.tokenHttp.get(url).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToRequests(response).slice(0, 3))
    )
  }

  public getById(id: number): Observable<Request>{
    let url = `${this.requestUrl}/${id}`;

    return this.tokenHttp.get(url).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToRequest(response))
    )
  }

  public create(request: Request): Observable<Request>{
    let url = `${this.requestUrl}`;
    let body = JSON.stringify(request);

    return this.tokenHttp.post(url, body).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToRequest(response))
    )
  }

  public update(request: Request): Observable<Request>{
    let url = `${this.requestUrl}/${request.id}`;
    let body = JSON.stringify(request);

    return this.tokenHttp.put(url, body).pipe(
      catchError(this.handleErrors),
      map(() => request)
    )
  }

  public delete(id: number): Observable<Request>{
    let url = `${this.requestUrl}/${id}`;

    return this.tokenHttp.delete(url).pipe(
      catchError(this.handleErrors),
      map(() => null)
    )
  }

  public searchByDocument(term: string): Observable<Request[]>{
    let url = `${this.requestUrl}?q[document_cont]=${term}`

    return this.tokenHttp.get(url).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToRequests(response))
    )
  }

  private handleErrors(error: Response){
    console.log("SALVANDO O ERRO NUM ARQUIVO DE LOG - DETALHES DO ERRO =>", error);
    return throwError(error);
  }

  private responseToRequests(response: Response): Request[]{
    let collection = response.json().data as Array<any>;
    let requests: Request[] = [];

    collection.forEach(item => {
      let request = new Request(
        item.id,
        item.attributes['date-to-br'],
        item.attributes['request-type'],
        item.attributes.description,
        item.attributes['document-type'],
        item.attributes['document-code'],
        item.attributes.status,
        item.attributes.user.name
      )

      requests.push(request)
    })

    return requests;
  }

  private responseToRequest(response: Response): Request {
    return new Request(
      response.json().data.id,
      response.json().data.attributes['date-to-br'],
      response.json().data.attributes['request-type'],
      response.json().data.attributes.description,
      response.json().data.attributes['document-type'],
      response.json().data.attributes['document-code'],
      response.json().data.attributes.status,
      response.json().data.attributes.user.name
    )
  }

}

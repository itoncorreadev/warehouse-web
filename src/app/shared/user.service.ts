import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { TokenService } from "../shared/token.service";
import { User } from "./user.model";


@Injectable()

export class UserService{
  public userUrl = "users";

  public constructor(private tokenHttp: TokenService){}

  public getAll(): Observable<User[]>{
    let url = `${this.userUrl}?q[s]=updated_at+DESC`;

    return this.tokenHttp.get(url).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToUsers(response))
    )
  }

  private handleErrors(error: Response){
    console.log("SALVANDO O ERRO NUM ARQUIVO DE LOG - DETALHES DO ERRO =>", error);
    return throwError(error);
  }

  private responseToUsers(response: Response): User[]{
    let collection = response.json().data as Array<any>
    let users: User[] = [];

    collection.forEach(item => {
      let user = new User(
        item.id,
        item.attributes.name,
        item.attributes.email,
        '',
        '',
      )
      users.push(user)
    })

    return users;
  }
}

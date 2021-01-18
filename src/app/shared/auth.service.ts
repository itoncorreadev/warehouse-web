import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { Angular2TokenService } from "angular2-token";
import { Observable } from "rxjs/Observable";
import { User } from "./user.model";

@Injectable()

export class AuthService{
  public constructor(private tokenService: Angular2TokenService){

  }

  public signUp(user: User){
    //
  }

  public signIn(uid: string, password: string){
    //
  }

  public signOut(){
    //
  }

  public isSignedIn(){
    //
  }

  private handleErrors(error: Response){
    console.log("SALVANDO O ERRO NUM ARQUIVO DE LOG - DETALHES DO ERRO =>", error);
    return Observable.throw(error);
  }
}

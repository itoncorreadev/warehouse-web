import { Component } from '@angular/core';
import { TokenService } from "./shared/token.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  public paginaAtual = 1;
  public paginaAtualTask = 1;
  public paginaAtualProduct = 1;
  public paginaAtualRequest = 1;

  title = 'Warehouse';

  public constructor(private tokenService: TokenService){
    this.tokenService.init({
      apiBase: 'https://warehouse-rails-api.herokuapp.com',
      //apiBase: 'http://api.warehouse.test:3000',
      globalOptions: {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.warehouse.v2'
        }
      }
    })
  }
}

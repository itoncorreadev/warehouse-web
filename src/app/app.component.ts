import { Component } from '@angular/core';
import { TokenService } from "./shared/token.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
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

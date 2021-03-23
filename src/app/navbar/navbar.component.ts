import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { LoaderService } from "../components/loader/loader.service";
import { AuthService } from "../shared/auth.service";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html'
})

export class NavbarComponent{

  public constructor(private authService: AuthService,  private router: Router, private loaderService: LoaderService){}

  public signOutUser(){
    this.loaderService.show()
    this.authService.signOut()
      .subscribe(
        () => {
          this.router.navigate(['/sign-in']),
          this.loaderService.hide()
        },
        () => this.loaderService.hide()
      )
  }

  public userSignedIn(){
    return this.authService.userSignedIn();
  }

   public userName(){
     return this.authService.currentUser();
   }

}

import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoaderService } from "../components/loader/loader.service";
import { AuthService } from "../shared/auth.service";
import { FormUtils } from "../shared/form.utils";

@Component({
  selector: 'sign-in-form',
  templateUrl: 'sign-in-form.component.html'
})

export class SignInFormComponent {
  public form: FormGroup;
  public formUtils: FormUtils;
  public submitted: boolean;
  public formErrors: Array<string>;

  public constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private loaderService: LoaderService){
    this.setupForm();

    this.formUtils = new FormUtils(this.form);
    this.submitted = false;
    this.formErrors = null;
  }

  public signInUser(){
    this.submitted = true;
    this.loaderService.show();

    this.authService.signIn(this.form.get('email').value, this.form.get('password').value)
      .subscribe(
        () => {
          this.router.navigate(['/dashboard']);
          this.formErrors = null;
          this.loaderService.hide();
        },
        (error) => {
          this.submitted = false;
          this.loaderService.hide();
          if( error.status === 401 ){
            this.formErrors = JSON.parse(error._body).errors;
          } else {
            this.formErrors = ["Não foi possível processar a sua solicitação. Por favor, tente mais tarde."]
          }
        }
      )
  }

  private setupForm(){
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }
}

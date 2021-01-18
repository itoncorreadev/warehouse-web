import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'sign-up-form',
  templateUrl: 'sign-up-form.component.hetml'
})

export class SignUpFormComponent{
  public userForm: FormGroup;

  public constructor(private FormBuilder: FormBuilder){
    this.userForm = this.FormBuilder.group({
      name: [null, [Validators.required, Validators.minLength(7), Validators.maxLength(100)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      passwordConfirmation: [null, [Validators.required]],
    })
  }

  public signUpUser(){
    console.log("Formulario de SignUp enviado!");
    console.log(this.userForm.value);
  }
}

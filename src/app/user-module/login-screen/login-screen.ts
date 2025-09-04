import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-screen',
  imports: [ReactiveFormsModule],
  templateUrl: './login-screen.html',
  styleUrl: './login-screen.css'
})
export class LoginScreen {

  loginform: FormGroup;

  constructor(private fb: FormBuilder) {
    // quando a tela inicializar.
    // cria o campo obrigatorio de email.
    // cria o campo obrigatorio de senha.

    this.loginform = this.fb.group({

      email: ["",[Validators.required]],
      password: ["",[Validators.required]]
    });
  
  }

  onloginclick() {

    alert("botao de login clicado");

    console.log("Email", this.loginform.value.email);

    console.log ("password", this.loginform.value.password);
    
  }

}

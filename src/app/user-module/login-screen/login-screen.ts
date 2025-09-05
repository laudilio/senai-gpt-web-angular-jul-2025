import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-screen',
  imports: [ReactiveFormsModule],
  templateUrl: './login-screen.html',
  styleUrl: './login-screen.css'
})
export class LoginScreen {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // quando a tela inicializar.
    // cria o campo obrigatorio de email.
    // cria o campo obrigatorio de senha.

    this.loginForm = this.fb.group({

      email: ["",[Validators.required]],
      password: ["",[Validators.required]]
    });
  
  }

  async onloginclick() {

    alert("botao de login clicado");

    console.log("Email", this.loginForm.value.email);

    console.log ("password", this.loginForm.value.password);

    if (this.loginForm.value.email == "") {

      alert("preencha o email.");
      return;

    }

    if (this.loginForm.value.password == ""){

      alert("preencha a senha.");
      return;
    }

    let response = await fetch("https://senai-gpt-api.azurewebsites.net/login", {

      method: "POST", //Enviar ,

      headers: {

        "Content-Type" : "application/json"

      },
      body: JSON.stringify({

        email:  this.loginForm.value.email,
        password: this.loginForm.value.password,
      })
    });

    console.log("STATUS CODE", response.status);

    if (response.status == 200){

      alert("esta correto");
    } else{

      alert("nao deu certo o status");


    }
    
  }

}

import { ThisReceiver } from '@angular/compiler';
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

  emailErrorMessage: string;
  sussesslogin: string;
  credencialIncorreta: string;

  constructor(private fb: FormBuilder) {
    // quando a tela inicializar.
    // cria o campo obrigatorio de email.
    // cria o campo obrigatorio de senha.

    this.loginForm = this.fb.group({

      email: ["",[Validators.required]],
      password: ["",[Validators.required]]
    });


//inicia com uma string
    this.emailErrorMessage = "";
    this.sussesslogin = "";
    this.credencialIncorreta = "";
  }

  async onloginclick() {

    alert("botao de login clicado");

    console.log("Email", this.loginForm.value.email);

    console.log ("password", this.loginForm.value.password);

    if (this.loginForm.value.email == "") {

      //alert("preencha o e-mail");
      this.emailErrorMessage = "o campo de email e obrigatorio.";

      alert("preencha o email.");
      return;

    }

    if (this.loginForm.value.password == ""){

      alert("preencha a senha.");
      return;
    }

    let response = await fetch("https://senai-gpt-api.azurewebsites.net/login", {

      method: "POST", //Enviar , get.. buscar 

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

      this.sussesslogin = "logado com sucesso"
    } else{

      this.credencialIncorreta = "credencial incorreta"   

    }
  
    
  }

}

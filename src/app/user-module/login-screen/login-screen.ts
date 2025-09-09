import { ThisReceiver } from '@angular/compiler';
import { ChangeDetectorRef, Component } from '@angular/core';
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

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {
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

     this.emailErrorMessage = "";
    this.sussesslogin = "";
    this.credencialIncorreta = "";

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

    if (response.status >= 200&& response.status <= 299){

      this.sussesslogin = "logado com sucesso"

      let json =await response.json();

      console.log("JSON",json);

      let meuToken = json.accessToken;

      let userId = json.user.id;

      localStorage.setItem("meuToken", meuToken);
      localStorage.setItem("meuId", userId);

      window.location.href = "chat";

    } else{

      this.credencialIncorreta = "credencial incorreta"   

    }

    this.cd.detectChanges(); // forcar uma atualizacao na tela.
  
    
  }

}

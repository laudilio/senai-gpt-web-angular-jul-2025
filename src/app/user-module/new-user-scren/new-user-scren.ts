import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-user-scren',
  imports: [ReactiveFormsModule],
  templateUrl: './new-user-scren.html',
  styleUrl: './new-user-scren.css'
})
export class NewUserScren { 

  newUserScren: FormGroup;

  constructor(private fb: FormBuilder) {
    // quando a tela inicializar.
    // cria o campo obrigatorio de email.
    // cria o campo obrigatorio de senha.

    this.newUserScren = this.fb.group({

      email: ["",[Validators.required]],
      password: ["",[Validators.required]],
      newPassword:["",[Validators.required]],
      nome:["",[Validators.required]],

    });
  }
    async click() {
       const token = localStorage.getItem("meuToken");
       let response = await fetch("https://senai-gpt-api.azurewebsites.net/users", {
        
      method: "POST", //Enviar , get.. buscar 

      headers: {

        "Content-Type" : "application/json",
        "authorization":`Bearer ${token}`
      },
      body: JSON.stringify({

        nome: this.newUserScren.value.nome,
        email: this.newUserScren.value.email,
        password: this.newUserScren.value.password,
        newpassword: this.newUserScren.value.newPassword
      })
    });

    }



}


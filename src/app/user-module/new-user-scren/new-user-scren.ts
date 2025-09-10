import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators ,} from '@angular/forms';

@Component({
  selector: 'app-new-user-scren',
  imports: [ReactiveFormsModule],
  templateUrl: './new-user-scren.html',
  styleUrl: './new-user-scren.css'
})
export class NewUserScren { 

  newUserScren: FormGroup;

  constructor(private fb: FormBuilder,) {
    // quando a tela inicializar.
    // cria o campo obrigatorio de email.
    // cria o campo obrigatorio de senha.

    this. newUserScren = this.fb.group({

      email: ["",[Validators.required]],
      password: ["",[Validators.required]],
      newPassword:["",[Validators.required]],
      nome:["",[Validators.required]],

    });

  }
}

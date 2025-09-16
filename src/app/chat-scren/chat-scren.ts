import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';


interface Ichat {

  chatTitle: string;
  id: number;
  userId: string; 
}

@Component({
  selector: 'app-chat-scren',
  imports: [HttpClientModule,CommonModule],
  templateUrl: './chat-scren.html',
  styleUrl: './chat-scren.css'
})
export class ChatScren {

  chats : Ichat[];

  constructor(private http: HttpClient, private cd?: ChangeDetectorRef){ //constroi a classe // inicializacao de variaveis
    this.chats = [];
  }

  ngOnInit() { //executado quando o angular esta pronto pra rodar //busca dados da api

    this.getChats();

  }

  async getChats () {
    //metodo que busca os chats da api
    let response = await this.http.get("https://senai-gpt-api.azurewebsites.net/chats",{
      headers:{
        "Authorization" : "Bearer " + localStorage.getItem("meuToken")
      }
    }).toPromise();

    if(response){

      this.chats = response as [];

    }else{

      console.log("Erro ao buscar o site")
    }

    this.cd?.detectChanges();

  }

}

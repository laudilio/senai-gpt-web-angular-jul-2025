import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';


interface Ichat {

  chatTitle: string;
  id: number;
  userId: string; 
  
}

interface IMessage{
  chatId: number;
  id: number;
  text: string;
  userId: string;
}

@Component({
  selector: 'app-chat-scren',
  imports: [CommonModule],
  templateUrl: './chat-scren.html',
  styleUrl: './chat-scren.css'
})
export class ChatScren {

  chats : Ichat[];
  chatSelecionado: Ichat;
  mensagens: IMessage[];

  constructor(private http: HttpClient, private cd?: ChangeDetectorRef){ //constroi a classe // inicializacao de variaveis
    this.chats = [];
    this.chatSelecionado = null!;
    this.mensagens = [];
  }

  ngOnInit() { //executado quando o angular esta pronto pra rodar //busca dados da api

    this.getChats();

  }

  async getChats () {
    //metodo que busca os chats da api
    let response = await firstValueFrom (this.http.get("https://senai-gpt-api.azurewebsites.net/chats",{
      headers: {
        "Authorization" : "Bearer " + localStorage.getItem("meuToken")
      }
    }));

    if(response){

      this.chats = response as [];

    }else{

      console.log("Erro ao buscar o site")
    }

    this.cd?.detectChanges();

  }
  
  async onChatClick (chatClicado: Ichat) {

    console.log("chat clicado", chatClicado);

    this.chatSelecionado = chatClicado;

    // logica para buscar as mensagens.
    let response = await firstValueFrom (this.http.get("https://senai-gpt-api.azurewebsites.net/messages?chatId=" + chatClicado.id,{
      headers: {
        "Authorization" : "Bearer " + localStorage.getItem("meuToken")
      }
    }));

    console.log("MENSAGENS", response);

    this.mensagens = response as IMessage[];


  }

}

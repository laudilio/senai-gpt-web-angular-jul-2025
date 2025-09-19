import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, ɵgetUnknownElementStrictMode } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
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
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './chat-scren.html',
  styleUrl: './chat-scren.css'
})
export class ChatScren {

  chats : Ichat[];
  chatSelecionado: Ichat;
  mensagens: IMessage[];
  mensagemUsario = new FormControl(""); // declaramose atribuimos valor.


  constructor(private http: HttpClient, private cd: ChangeDetectorRef){ //constroi a classe // inicializacao de variaveis
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

    this.cd.detectChanges(); // forcar uma atualizacao na tela.


  }

  async enviarMensagem () {

    let novamensagemUsario = {

      chatId: this.chatSelecionado.id,
      userId: localStorage.getItem("meuId"),
      text: this.mensagemUsario.value 
    };

    let novamensagemUsarioresponse = await firstValueFrom (this.http.post("https://senai-gpt-api.azurewebsites.net/messages",novamensagemUsario,{
      headers: {
        "content-type": "application/json",
        "Authorization" : "Bearer " + localStorage.getItem("meuToken")
      }
    }));

    await this.onChatClick(this.chatSelecionado);

    // 2 enviar a mensagem do usuario para a ia responder

    let respostaIaresponse = await firstValueFrom(this.http.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",{
      "contents": [
        {
          "parts": [
            {
              "text": this.mensagemUsario.value + ".Me de uma resposta mais objetiva."
            }
          ]
        }
      ]
    }, {

      headers: {
        "content-type": "application/json",
        "X-goog-api-key": "AIzaSyDV2HECQZLpWJrqCKEbuq7TT5QPKKdLOdo"

      }

    })) as any;

    let novarespostaIa = {

      chatId: this.chatSelecionado.id,
      userId: "chatbot",
      text: respostaIaresponse.candidates[0].content.parts[0].text

    }
    
    let novarespostaIaResponse = await firstValueFrom (this.http.post("https://senai-gpt-api.azurewebsites.net/messages",novarespostaIa, {
      headers: {
        "content-type": "application/json",
        "Authorization" : "Bearer " + localStorage.getItem("meuToken")
      }
    }));
    
    // atualiza as mensagens da tela

    await this.onChatClick(this.chatSelecionado);
 
  }

}

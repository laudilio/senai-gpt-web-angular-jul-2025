import { Routes } from '@angular/router';
import { LoginScreen } from './user-module/login-screen/login-screen';
import { ChatScren } from './chat-scren/chat-scren';

export const routes: Routes = [
    {
        path: "login",
        loadComponent:() => LoginScreen
    },
    {
        path:"",
        loadComponent: () => LoginScreen
    },
    {
        path:"chat-screen",
        loadComponent: () => ChatScren
    }

];


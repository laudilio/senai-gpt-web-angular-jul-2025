import { ApplicationConfig, inject, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, Router } from '@angular/router';

import { routes } from './app.routes';
import { HttpErrorResponse, HttpInterceptorFn, provideHttpClient, withInterceptors } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);// direciona para as telas.
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {

      if(err.status == 401) {
        // token expirou
        localStorage.clear(); //limpatodos os dados do localstorage.
        router.navigate(['/login']); // redireciona para o login.
    
      }

      return throwError(() =>err);

    })
  );
}


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),// instancia do httpModule.
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes)
  ]
};

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {finalize, Observable} from "rxjs";
import {AppStateService} from "./app-state.service";
import {LoadingService} from "./loading.service";

@Injectable()
export class HttpAppInterceptor implements HttpInterceptor {

  constructor(public appState : AppStateService , private ls : LoadingService) {
  }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>>  {
/*    this.appState.setProductState({
      status : "LOADING"
    })*/
    this.ls.showLoadingSpinner()
    let req = request.clone({
      headers : request.headers.set("Autorization" , "Beares JWT")
    });
    return next.handle(req).pipe(
      finalize(()=>{
        this.ls.hideLoadingSpinner()
      }))
  }
};

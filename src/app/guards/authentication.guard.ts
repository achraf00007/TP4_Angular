import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AppStateService} from "../services/app-state.service";


@Injectable({
  providedIn: 'root'
})

export class AutenticationGuard implements CanActivate {

  constructor(private appState: AppStateService , private router : Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.appState.authState.isAutenticated== true){
      return true
    }else{
      this.router.navigateByUrl("/login")
      return false
    }
  }
};

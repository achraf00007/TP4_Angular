import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {AppStateService} from "./app-state.service";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, public appState: AppStateService) {
  }

  async login(username: string, password: string) {
    let user: any = await firstValueFrom(this.http.get("http://localhost:3000/users/" + username))
    if (password == atob(user.password)) {
      let decodedJwt : any = jwtDecode(user.token);
      this.appState.setAuthState({
        isAutenticated : true ,
        username : decodedJwt.sub ,
        roles : decodedJwt.roles ,
        token : user.token

      })
      return Promise.resolve(true)
    }else {
      return Promise.reject("Bad credentials")
    }
  }

  autenticateUser(user: Object) {

  }
}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import { DateTime } from "luxon";
import {shareReplay, tap} from "rxjs/operators";
import {User} from "../interface/User";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':'*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private user = new Subject<User>();

  constructor(private http: HttpClient) { }

  login(username:string, password:string):Observable<any> {
    return this.http.post<Observable<any>>("http://localhost:3000/api/auth/login",{username,password},httpOptions)
      .pipe(tap(res => {
        this.setSession(res);
        console.log(res)
      })).pipe(shareReplay())
  }

  private setSession(authResult: any) {
    const expiresAt = DateTime.now().plus({seconds: authResult.data.expiresIn.toString().slice(0,authResult.data.expiresIn.toString().length-1)});

    localStorage.setItem('id_token', authResult.data.idToken);
    console.log(this.user)
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }

  getUser():Observable<User> {
    return this.user.asObservable();
  }

  logout() {
    this.user.next();
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    return DateTime.now().toMillis() < (this.getExpiration().toMillis());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    let expiresAt: number  = 0;
    if (expiration != null) {
      expiresAt = JSON.parse(expiration);
    }
    return DateTime.fromMillis(expiresAt);
  }
}

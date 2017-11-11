import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import {User} from "../model/model.user";
import 'rxjs/add/operator/map';
@Injectable()
export class AuthService {

  constructor(public http: Http ) { }

  public logIn(user: User){
    // creating base64 encoded String from user name and password
    var base64Credential: string = btoa( user.username+ ':' + user.password);
    let headers = new Headers();
    headers.append('Accept', 'application/json')
    headers.append("Authorization", "Basic " + btoa(user.username + ":" + user.password));
    let options = new RequestOptions();
    options.headers=headers;
    return this.http.get("http://localhost:8080/account/login" ,   options)
      .map(resp=>resp.json());
  }
}

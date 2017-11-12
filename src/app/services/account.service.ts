import { Injectable } from '@angular/core';
import {User} from "../model/model.user";
import {Http} from "@angular/http";

@Injectable()
export class AccountService {
  constructor(public http: Http) { }

  createAccount(user:User){
    console.log(user.username);
    return this.http.post('http://localhost:8080/account/register',user)
      .map(resp=>resp.json());
  }
}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {User} from "../../model/model.user";
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  user: User=new User();
  constructor(public accountService :AccountService) { }

  ngOnInit() {
  }
  register(){
    console.log(this.user.username);
  this.accountService.createAccount(this.user).
  subscribe(data=>{
    console.log("account created succefuly")
    },err=>{
    console.log(err);
    }

  )
}
}

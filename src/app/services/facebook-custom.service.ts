import { Injectable } from '@angular/core';
import {FacebookService, InitParams, LoginResponse} from "ngx-facebook";
import {FacebookUser} from "../model/mode.FacebookUser";

@Injectable()
export class FacebookCustomService {
  public user: FacebookUser =new FacebookUser();
  constructor(private fb: FacebookService, ) {

    // this will init the app using the facebook app id
    let initParams: InitParams = {
      appId: '1900664226929744',
      xfbml: true,
      version: 'v2.8'
    };
    this.fb.init(initParams);
  }
login(){
  this.fb.login()
 .then((response: LoginResponse) =>{
   //getting some user info , the user_id is the most importent
  this.fb.api('/me?fields=name,email,picture,first_name,last_name').then((response) => {

    this.user.id = response.id;
    this.user.fullName = response.firstName+ " "+response.lastName;
    this.user.photoUrl = "https://graph.facebook.com/" + response.id + "/picture?type=normal";
    localStorage.setItem("currentUserFB",JSON.stringify(this.user));
    console.log("uuu"+ this.user.id);
  }).catch((error: any) => console.error(error));
  }).catch((error: any) => console.error(error));

}
  getUserAlbums(){
    console.log("uuu"+ this.user.id);
    this.fb.api('/'+this.user.id+'/albums').then((response) => {
    console.log(response);
    }).catch((error: any) => console.error(error));
  }
logOut() {
  this.fb.logout().then(() => {
    localStorage.removeItem('currentUserFB');
  });
}
}

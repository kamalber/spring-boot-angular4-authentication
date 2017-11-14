import { Injectable } from '@angular/core';
import {FacebookService, InitParams, LoginOptions, LoginResponse} from "ngx-facebook";
import {FacebookUser} from "../model/mode.FacebookUser";

@Injectable()
export class FacebookCustomService {
  public user: FacebookUser =new FacebookUser();
  public token:string="";
  constructor(private fb: FacebookService) {

    // this will init the app using the facebook app id
    let initParams: InitParams = {
      appId: '127062021306633',
     // status: true ,
      xfbml: true,
      version: 'v2.11',
    };
    this.fb.init(initParams);
  }
login(){
 return  this.fb.login({
   scope: 'user_photos',
 }).then((response: LoginResponse) =>{
    this.token=response.authResponse.accessToken;
    this.loadUser();
  }).catch((error: any) => console.error(error));

}
//this is a private method invoked when user logged with facebook
private loadUser(){
  //getting some user info , the user_id is the most importent
  return this.fb.api('/me?fields=name,id,email,picture,first_name,last_name&access_token='+this.token).then((response) => {
    this.user.id = response.id;
    this.user.fullName = response.firstName+ " "+response.lastName;
    localStorage.setItem("currentUserFB",JSON.stringify(this.user));
  }).catch((error: any) => console.error(error));
}

// load all user's albums
  getUserAlbums(){
  // retrieving the facebook user id
    let user_id=JSON.parse(localStorage.getItem("currentUserFB")).id;
    return this.fb.api('/'+user_id+'/albums?fields=created_time,cover_photo,name&access_token='+this.token);
  }

  // getting the album's cover photo picture
  getLambumsCoverPhotoPicture(coverPhotoID:string){
    return this.fb.api('/'+coverPhotoID+'/picture?type=normal&access_token='+this.token);
  }

logOut() {
  this.fb.logout().then(() => {
    localStorage.removeItem('currentUserFB');
  });
}
}

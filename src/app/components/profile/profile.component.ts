import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "../../model/model.user";
import {Router} from "@angular/router";
import { LoginResponse} from "ngx-facebook";
import {FacebookCustomService} from "../../services/facebook-custom.service";
import {FacebookUser} from "../../model/mode.FacebookUser";
import {Album} from "../../model/model.album";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  currentUser: User;
  currentFbUser: FacebookUser;
   albumsList:Array<Album>= new Array();

  constructor(public authService: AuthService,public router:Router,private facebookService: FacebookCustomService) {
    this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
    this.currentFbUser=JSON.parse(localStorage.getItem('currentUserFB'));
  }


  ngOnInit() {
  }

 // link the facebook account
loginWithFacebook(){
  this.facebookService.login();
}
// retrieving the connected User's albums
getAlbums(){
  this.facebookService.getUserAlbums().then((ress) => {
    let albums = ress.data;
    console.log(albums);
    //Crossing the data in order to get the albums informations
    for (var i = 0; i < albums.length; i++) {
     let loadedAlbum:Album=new Album();
     loadedAlbum.id=albums[i].id;
     loadedAlbum.name=albums[i].name;
     loadedAlbum.created_time=albums[i].created_time;
      console.log(this.albumsList);
     this.facebookService.getLambumsCoverPhotoPicture(albums[i].cover_photo.id).then((ress) => {
      loadedAlbum.picture=ress.picture;
      this.albumsList.push(loadedAlbum);
    }).catch((error: any) => console.error(error));
    }
  }).catch((error: any) => console.error(error));
}

// loggin out from the app
  logOut() {
    this.authService.logOut()
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {

        });
  }
}

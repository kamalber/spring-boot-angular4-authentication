import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "../../model/model.user";
import {Router} from "@angular/router";
import { LoginResponse} from "ngx-facebook";
import {FacebookCustomService} from "../../services/facebook-custom.service";
import {FacebookUser} from "../../model/mode.FacebookUser";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  currentUser: User;
  currentFbUser: FacebookUser;
  public albumsList:any;
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
// getting the albums list
getAlbums(){
  this.facebookService.getUserAlbums().then((ress) => {
    this.albumsList=ress.data;
    console.log(ress);
  }).catch((error: any) => console.error(error));
}
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

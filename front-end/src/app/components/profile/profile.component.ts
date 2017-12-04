import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "../../model/model.user";
import {Router} from "@angular/router";
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
  albumsList: Array<Album> = new Array();

  constructor(public authService: AuthService, public router: Router, private facebookService: FacebookCustomService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentFbUser = JSON.parse(localStorage.getItem('currentUserFB'));

  }




  ngOnInit() {
  }

  // link the facebook account,
  // after the user grant access to his photos , all his albums will be loaded
  loginWithFacebook() {
    this.facebookService.login().then(() => {
      this.getAlbums();
    }).catch((error: any) => console.error(error));
  }

// retrieving the connected User's albums
  private getAlbums() {
    this.facebookService.getUserAlbums().then((ress) => {
      let albums = ress.data;
      //Crossing the data in order to get the albums informations
      for (var i = 0; i < albums.length; i++) {
        this.retrieveAlbum(albums[i]);
      }
    }).catch((error: any) => console.error(error));
  }

// this method help creating an album object from the retrieve user's albums
  private retrieveAlbum(albumObj) {
    let loadedAlbum: Album = new Album();
    loadedAlbum.id = albumObj.id;
    loadedAlbum.name = albumObj.name;
    loadedAlbum.created_time = albumObj.created_time;

    this.facebookService.getaAlbumsCoverPhotoPicture(albumObj.cover_photo.id).then((ress) => {
      loadedAlbum.picture = ress.data.url;

      this.albumsList.push(loadedAlbum);
    }).catch((error: any) => console.error(error));
  }


  // getting the album's photos
  getAlbumsPhotos(albumID: string) {
    this.facebookService.getAlbumsPhotos(albumID).then((ress) => {
    }).catch((error: any) => console.error(error));
  }

// login out from the app
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

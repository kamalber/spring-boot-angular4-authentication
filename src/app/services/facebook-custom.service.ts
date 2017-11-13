import { Injectable } from '@angular/core';
import {FacebookService, InitParams} from "ngx-facebook";

@Injectable()
export class FacebookCustomService {

  constructor(private fb: FacebookService) {

    let initParams: InitParams = {
      appId: '1900664226929744',
      xfbml: true,
      version: 'v2.8'
    };
    this.fb.init(initParams);
  }


}

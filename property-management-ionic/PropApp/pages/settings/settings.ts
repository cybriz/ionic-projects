import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Parse } from "parse";
import { LoginPage } from "../login/login";
import { Events } from 'ionic-angular';


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  checked1= true;
  checked2= true;
  checked3= true;
  checked4= true;

  constructor(public navCtrl: NavController, public navParams: NavParams,public events: Events) {
  }

  logout(user:User) {
    let self=this;
    console.log('User logging Out!')
    Parse.User.logOut().then((currentUser) => {
          
          console.log("pp",currentUser)
          self.events.publish('user', self.hideTabBar());
        });
      }

  hideTabBar(){
    console.log("pp2")
    if(document.querySelector(".tabbar")){
      console.log("pp3")
        document.querySelector(".tabbar")['style'].display = 'none';
    }
  }

}

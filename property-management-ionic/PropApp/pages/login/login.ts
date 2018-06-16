import { User } from "./../../models/user";
import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

import { AngularFireAuth } from "angularfire2/auth";
import { AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Parse } from 'parse';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import {Events} from 'ionic-angular';
import { RegisterPage } from './../register/register';
import { ResetPasswordPage } from './../reset-password/reset-password';
import { CountrylistPage } from './../countrylist/countrylist';
import { StatelistPage } from './../statelist/statelist';
import { CreateManagementOrDevPage } from "../create-mgmt-dev/create-mgmt-dev";
import {SearchorCreateManagementDevPage} from '../searchorcreate-mgmt-dev/searchorcreate-mgmt-dev';



@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  rForm: FormGroup;
  user = {} as User;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    // private aAuth: AngularFireAuth,
    public alertCtrl: AlertController,
    private fb: FormBuilder
  ) {
    this.rForm = fb.group({
      email1: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
        ])
      ]
    });
  }

  login(user: User) {
    let self = this;
    Parse.User.logIn(user.email, user.password, {
      success: function(user) {
        self.events.publish("user", self.user.email);
      },
      error: function(user, error) {
        console.log(error);
        self.showAlert(error.message);
      }
    });
  }
    register(user:User){
      // this.navCtrl.push(CountrylistPage);
     
      // this.navCtrl.push(UserCurrentLocationPage);
      // this.navCtrl.push(RegisterPage);
      //  this.navCtrl.push(SearchorCreateManagementDevPage);
      //  this.navCtrl.push(CreateManagementOrDevPage);
     
      this.navCtrl.push(RegisterPage);
     
    }


  showAlert(error) {
    let alert = this.alertCtrl.create({
      title: error,
      buttons: ["OK"]
    });
    alert.present();
  }

  stringTrim(val) {
    if (val) {
      var trimmed = val.trim();
      this.user.email = trimmed;
      console.log("hello" + this.user.email);
    }
  }

  trimString(val) {
    if (val) {
      var trimmed = val.trim();
      this.user.password = trimmed;
      console.log("passwordtrim");
    }
  }
  forgotPass(){
    this.navCtrl.push(ResetPasswordPage);
  }
}

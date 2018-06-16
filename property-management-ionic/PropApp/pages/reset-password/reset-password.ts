import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Parse } from "parse";
import { AlertController } from "ionic-angular";
import { LoginPage } from "../login/login";
import { User } from "./../../models/user";

@Component({
  selector: "page-reset-password",
  templateUrl: "reset-password.html"
})
export class ResetPasswordPage {
  user = {} as User;
  recoveryEmail: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController
  ) {}

  resetPass(user) {
    // let alert = this.alertCtrl.create({
    //   // title: "Enter Your Email",
    //   // message: "A new password will be sent to your email",
    //   inputs: [
    //     {
    //       name: "recoveryEmail",
    //       placeholder: "your@gmail.com"
    //     }
    //   ],
    //   buttons: [
    //     {
    //       text: "Cancel",
    //       role: "cancel",
    //       handler: data => {
    //         console.log("Cancel clicked");
    //       }
    //     },
    // {
    // text: "Submit",
    // handler: data => {
    let self = this;
    Parse.User.requestPasswordReset(this.recoveryEmail, {
      success: function() {
        console.log("Password reset request was sent successfully");
        let alert = self.alertCtrl.create({
          title:
            "An email with the link to reset your password had been sent to the email: " +
            self.recoveryEmail,
          buttons: ["OK"]
        });
        alert.present();
      },
      error: function(error) {
        console.log(
          "The login failed with error: " + error.code + " " + error.message
        );
        let alert = self.alertCtrl.create({
          title:
            "Unable to send reset email to: <br/>" +
            self.recoveryEmail +
            "<br/>" +
            "due to: " +
            error.message,
          buttons: ["OK"]
        });
        alert.present();
      }
    });
    // }
    // }
    //   ]
    // });
    // alert.present();
  }
  backButton(user: User) {
    console.log("uu");
    this.navCtrl.push(LoginPage);
  }
}

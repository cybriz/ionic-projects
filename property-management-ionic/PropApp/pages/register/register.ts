import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { HomePage } from "../home/home";
import { NewRegisterPage } from "../newregister/newregister";
import { LoginPage } from "../login/login";
import { Events } from 'ionic-angular';

@Component({
  selector: "page-messages",
  templateUrl: "register.html"
})
export class RegisterPage {
  buttonColor: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad MessagesPage");
  }

  ownerrenter() {
    this.buttonColor = "#488aff";
    this.navCtrl.push(NewRegisterPage, {
      userData: "Owner/Renter",
      userInfo:"As owner or renter of property,you will be able to interact with other owners of the same property,while also being able to interact with the property management and the property developer",
      emailadd:"Email",
      button:'Create'
      

    });
  }

  management() {
    this.buttonColor = "#488aff";
    this.navCtrl.push(NewRegisterPage, {
        userData: "Management",
        userInfo:"You will be able to interact with people who are residing in the properties that you are managing, such as sending them messages,updates via this app",
        emailadd:"Your Work Email",
        pagenum:'(1/3)',
        button: 'Next'
      });
  }

  developer() {
    this.buttonColor = "#488aff";
    this.navCtrl.push(NewRegisterPage, {
        userData: "Developer",
        userInfo:"You will be able to interact with people who bought your properties such as sending them messages,updates via this app",
        emailadd:"Your Work Email",
        pagenum:'(1/3)',
        button: 'Next'
      });
  }

  cancel() {
    this.navCtrl.push(LoginPage);
  }
}

import { User } from "./../../models/user";
import { Component } from "@angular/core";
import {IonicPage,NavController,NavParams,ToastController} from "ionic-angular";
// import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import {AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument} from "angularfire2/firestore";
import { FormBuilder, FormGroup, Validators, EmailValidator } from "@angular/forms";
import { AlertController } from "ionic-angular";
import { Parse } from "parse";
import { HomePage } from "../home/home";
import { SearchorCreateManagementDevPage } from "../searchorcreate-mgmt-dev/searchorcreate-mgmt-dev";

@Component({
  selector: "page-newregister",
  templateUrl: "newregister.html"
})
export class NewRegisterPage {
  name: string;
  phone: number;
  email: "";
  password: string;
  user = {} as User;
  rForm: FormGroup;
  userData: string;
  status: string;
  userInfo: string;
  emailadd: string;
  pagenum: string;
  button:string;

  constructor(
    public navCtrl: NavController,private fb: FormBuilder,public navParams: NavParams,
    public toast: ToastController,public alertCtrl: AlertController) {
    let self = this;
    this.userData = navParams.data.userData;
    this.userInfo = navParams.data.userInfo;
    this.emailadd = navParams.data.emailadd;
    this.button = navParams.data.button;
    self.pagenum = navParams.data.pagenum;
    this.rForm = fb.group({
      name: [null,Validators.compose([Validators.required, Validators.minLength(4)])],
      password: [null,Validators.compose([Validators.pattern('^[A-z0-9[!"#$%&()*+,./:;<=>?@^_{|}~-]+$'),Validators.required,Validators.minLength(6)])],
      phone: [null,Validators.compose([Validators.required,Validators.minLength(4),Validators.pattern("^[0-9]*$")]) ],
      email: [null, Validators.compose([Validators.required, Validators.email])]
    });
  }

  changepage(){
    let self=this;
    console.log('**'+ this.userData)
   if (this.userData == "Owner/Renter"){
    let self = this;
    
    var User = Parse.Object.extend("User");
    let user = new User();
    var data = {
      email: this.user.email,
      password: this.user.password,
      phone: this.user.phone,
      username: this.user.name,
      type: this.userData,
      status: "NEW"
    };

    user.save(data, {
      success: function(user) {
        console.log('1');
        let alert= self.alertCtrl.create({
          title:"Check your email",
          subTitle:"Verification email has sent successful",
          buttons:['OK']
        });
        alert.present();
        console.log('2');
        console.log("created")
        self.navCtrl.push(HomePage);
      },
      error: function(user, error) {
        self.showAlert(error.message);
        console.log('error' + error.message)
      }
    });
    }
    else if(this.userData == "Management") {
      self.navCtrl.push(SearchorCreateManagementDevPage,{
        orcreate:'Management',
        search:'Search Management/Property Name',
        email: this.user.email,
        password: this.user.password,
        phone: this.user.phone,
        username: this.user.name,
        
        });
    }
    else if(this.userData == "Developer") {
      self.navCtrl.push(SearchorCreateManagementDevPage, {
        orcreate:'Developer',
        search:'Search Developer',
        email: this.user.email,
        password: this.user.password,
        phone: this.user.phone,
        username: this.user.name,
      });
    }
  }

  showAlert(error) {
    let alert = this.alertCtrl.create({
      title: error,
      buttons: ["OK"]
    });
    alert.present();
  }
  isReadonly() {
    return true;
  }

  } 
        
     
      
    



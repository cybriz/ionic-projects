import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { MyPropertiesPage } from "../myproperties/myproperties";
import { Parse } from "parse";

@Component({
  selector: "page-summary",
  templateUrl: "summary.html"
})
export class SummaryPage {
  name: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  companyname: string;
  town: string;
  street1: string;
  street2: string;
  country: string;
  state: string;
  postcode: string;
  companyemail: string;
  companywebsite: string;
  companyphone: string;
  addressCountry:string;
  addressState:string;
  addressStreet1:string;
  addressStreet2:string;
  addressTown:string;
  addressPostcode:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController
  ) {
    this.name = navParams.data.name;
    console.log("**name" + this.name);
    this.username = navParams.data.username;
    console.log("username:" + this.username);
    this.email = navParams.data.email;
    this.password = navParams.data.password;
    this.phone = navParams.data.phone;
    this.companyname = navParams.data.companyname;
    this.town = navParams.data.town;
    this.street1 = navParams.data.street1;
    this.street2 = navParams.data.street2;
    this.postcode = navParams.data.postcode;
    this.state = navParams.data.state;
    this.country = navParams.data.country;
    console.log("country" + this.country);
    this.companyemail = navParams.data.companyemail;
    this.companywebsite = navParams.data.companywebsite;
    this.companyphone = navParams.data.companyphone;
    this.addressCountry = navParams.data.addressCountry;
    
    this.addressState = navParams.data.addressState;
    this.addressPostcode = navParams.data.addressPostcode;
    this.addressTown = navParams.data.addressTown;
    this.addressStreet2 = navParams.data.addressStreet2;
    this.addressStreet1 = navParams.data.addressStreet1;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SummaryPage");
  }
  create() {
    let self = this;
    self.saveUser();
    self.saveManagementODev();
    self.saveStates();
    this.navCtrl.push(MyPropertiesPage);
  }
  saveUser() {
    let self = this;
    var User = Parse.Object.extend("User");
    let user = new User();
    var data = {
      email: this.email,
      password: this.password,
      phone: this.phone,
      username: this.username,
      type: this.name,
      status: "NEW"
    };

    user.save(data, {
      success: function(user) {
        console.log("1");
        // let alert = self.alertCtrl.create({
        //   title: "Check your email",
        //   subTitle: "Verification email has sent successful",
        //   buttons: ["OK"]
        // });
        // alert.present();
        console.log("2");

        console.log("created");
      },
      error: function(user, error) {
        console.log("error");
      }
    });
  }

  saveManagementODev() {
    let self = this;
    // self.country = self.addressCountry;
      console.log('ijdj:', self.country);
    if (this.name === "Management") {
      var ManagementDef = Parse.Object.extend("ManagementDef");
      let management = new ManagementDef();
      
      
      // self.town = self.addressTown;
      var data1 = {
        email: self.companyemail,
        postcode: self.postcode,
        phone: self.companyphone,
        town: self.town,
        addressStreet1: self.street1,
        addressStreet2: self.street2,
        website: self.companywebsite,
        name: self.companyname,
        country: self.country,
        states: self.state,
        status: "NEW",
       
      };
      management.save(data1, {
        success: function(user) {
          console.log("1");

          console.log("2");

          console.log("created management");
        },
        error: function(user, error) {
          // self.showAlert(error.message);
          console.log("error");
        }
      });
    } else {
      var DeveloperDef = Parse.Object.extend("DeveloperDef");
      let developer = new DeveloperDef();
      // self.country = self.addressCountry;
      console.log('ijdj:', self.country);
      var data2 = {
        postcode: self.postcode,
        phone: self.phone,
        town: self.town,
        addressStreet1: self.street1,
        addressStreet2: self.street2,
        website: self.companywebsite,
        name: self.companyname,
        country: self.country,
        states: self.state,
        email: self.companyemail,
        status: "NEW"
      };
      developer.save(data2, {
        success: function(user) {
          console.log("1");
          console.log("2");

          console.log("created developer");
        },
        error: function(user, error) {
          // self.showAlert(error.message);
          console.log("error");
        }
      });
    }
  }

  saveStates() {
    let self= this;
    var States = Parse.Object.extend("States");
    var states= new States;
    var query = new Parse.Query("States");
    var innerQuery = new Parse.Query(States);
    innerQuery.exists(self.state);
    query.matchesQuery("Name", innerQuery);
    query.find({
      success: function(object){
        console.log('notexist' + self.state)
        var States = Parse.Object.extend('States');
        var states = new States();
         var data={
          Name:self.state
            };
            states.save(data,{
              success: function(user){
                console.log('created states')
              },
              error: function(user, error){
                console.log(error)
              }
            })
      } , error : function(){
        console.log(' exist')
      } 
    });
  }
}

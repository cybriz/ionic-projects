import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CountrylistPage } from '../countrylist/countrylist';
import { StatelistPage } from '../statelist/statelist';
import { SummaryPage } from '../summary/summary';
import { Parse } from "parse";
import { Management } from "./../../models/management";
import { MyPropertiesPage } from '../myproperties/myproperties';

@Component({
  selector: 'page-create-managment-dev',
  templateUrl: 'create-managment-dev.html',
})
export class CreateManagmentDevPage {
  management = {} as Management;
  pagename:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pagename = navParams.data.pagename;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateNewManagementPage');
  }
 create(){
    var ManagementDef = Parse.Object.extend("ManagementDef");
    let management = new ManagementDef();
    let self = this;

    var data = {
      email: this.management.email,
      postcode: this.management.postcode,
      phone: this.management.phone,
      town : this.management.town,
      addressStreet1 : this.management.streetone,
      addressStreet2 : this.management.streettwo,
      website: this.management.website,
      name : this.management.name
    };

    management.save(data, {
      success: function(user) {
        console.log('1');
        self.navCtrl.push(SummaryPage,{
        });
        console.log('2');
        
        console.log("created")
      },
      error: function(user, error) {
        // self.showAlert(error.message);
        console.log('error')
      }
    });
  }
  changepage(){
    let self=this;
    if (this.pagename == "Management"){
      self.navCtrl.push(SummaryPage,{
        name:"Management"
      });
    }
    else if (this.pagename == "Developer"){
      self.navCtrl.push(SummaryPage,{
        name:"Developer"
      });
    }
    
  }

 selectCountry(){
  this.navCtrl.push(CountrylistPage);
 }
 selectSate(){
  this.navCtrl.push(StatelistPage);
 }
 selectManagement(){}
}

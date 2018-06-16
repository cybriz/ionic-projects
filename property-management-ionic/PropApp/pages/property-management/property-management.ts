import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PropertyPage } from "../property/property";

@Component({
  selector: 'page-property-management',
  templateUrl: 'property-management.html',
})
export class PropertyManagementPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewWillEnter() {
    let tabs = document.querySelectorAll('.tabbar');
    if ( tabs !== null ) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.transform = 'translateY(56px)';
      });
    }
  }
  ionViewDidLeave() {
    let tabs = document.querySelectorAll('.tabbar');
    if ( tabs !== null ) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.transform = 'translateY(0)';
      });
    } 
  }

  defaultDate: String = new Date().toISOString();

  nextButton(){
    this.navCtrl.push(PropertyPage)
  }
}

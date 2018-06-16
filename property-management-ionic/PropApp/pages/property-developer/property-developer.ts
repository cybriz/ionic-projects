import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PropertyPage } from "../property/property";
import { Events } from "ionic-angular";

@Component({
  selector: 'page-property-developer',
  templateUrl: 'property-developer.html',
})
export class PropertyDeveloperPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public events: Events) {

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
  defaultDate1: String = new Date().toISOString();
  
  nextButton(){
    this.navCtrl.push(PropertyPage)
  }
    
}

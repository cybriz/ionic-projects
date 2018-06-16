import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-property-type-own',
  templateUrl: 'property-type-own.html',
})
export class PropertyTypeOwnPage {
  itemDisplay = {
  name:"",
  address:"",
  date:"",
  pic:"",
  }
  morePics=[];
  itemDisplayArray=[]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.itemDisplay.name = navParams.get("name")
    this.itemDisplay.address = navParams.get("address")
    this.itemDisplay.pic = navParams.get("pic")
    this.itemDisplay.date = navParams.get("date")
    this.morePics = navParams.get("morePics")

    this.itemDisplayArray.push(this.itemDisplay)
    console.log("why", navParams.get("morePics"))
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad PropertyTypeOwnPage');
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
}

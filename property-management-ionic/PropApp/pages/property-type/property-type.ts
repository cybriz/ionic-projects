import { ListOfLocationPage } from "./../list-of-location/list-of-location";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { PropertyPage } from "../property/property";
import { Events } from "ionic-angular";
import { Parse } from "parse";
import { TabsPage } from "../tabs/tabs";

@Component({
  selector: "page-property-type",
  templateUrl: "property-type.html"
})
export class PropertyTypePage {
  items: Array<any>;
  userData: string;
  userInfo: string;
  sections: any = {
    own: "own",
    rent: "rent"
  };
  selectedPropertyType: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events
  ) {}

  ionViewWillEnter() {
    let tabs = document.querySelectorAll(".tabbar");
    if (tabs !== null) {
      Object.keys(tabs).map(key => {
        tabs[key].style.transform = "translateY(56px)";
      });
    }
  }
  ionViewDidLeave() {
    let tabs = document.querySelectorAll(".tabbar");
    if (tabs !== null) {
      Object.keys(tabs).map(key => {
        tabs[key].style.transform = "translateY(0)";
      });
    }
  }

  defaultDate: String = new Date().toISOString();

  datePickerCallback() {
    // var x =  (<HTMLInputElement>document.getElementById("select")).value;
    let month = this.defaultDate.slice(5, 7);

    console.log("month: ", month);
    console.log("year: ", this.defaultDate.substring(0, 4));

    document.getElementById("demo").innerHTML ="You selected: " + this.defaultDate;
  }

  nextButton() {
    if (this.selectedPropertyType) {
      this.events.publish("ID", "this.selectedPropertyType");
      this.navCtrl.push(PropertyPage, {
        propertyType: this.selectedPropertyType,
        date: this.defaultDate
      });
    } else {
      console.info("Please select a button and pick a date!");
    }
  }

  passingOwn(event) {
    console.log(event.target.innerText);

    this.selectedPropertyType = this.sections.own;
  }

  passingRent(event) {
    console.log(event.target.innerText);

    this.selectedPropertyType = this.sections.rent;
  }
}

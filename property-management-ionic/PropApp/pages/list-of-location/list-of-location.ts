import { PropertyPage } from "../property/property";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Events } from "ionic-angular";
import { PropertyLocationSelectionPage } from "../property-location-selection/property-location-selection";

@Component({
  selector: "page-list-of-location",
  templateUrl: "list-of-location.html"
})
export class ListOfLocationPage {
  items: Array<any>;
  selectedItems: any;
  myStore = [];
  input: Array<string>;
  SearchType: string;
  itemss = [];
  numberOfItemsToDisplay = 30;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events
  ) {
    this.setItems();
    for (let i = 0; i < 20; i++) {
      this.itemss.push(this.itemss.length+1 + ". "+ this.items[i]);
    }
  }

  ionViewWillEnter() {
    let tabs = document.querySelectorAll(".tabbar");
    if (tabs !== null) {
      Object.keys(tabs).map(key => {
        tabs[key].style.display = "none";
      });
    }
  }

  setItems() {
    this.items = [
      "Ara damansara",
      "Citta Mall",
      "Subang jaya",
      "Petaling Jaya",
      "KLCC",
      "Ampang",
      "Old Klang Road",
      "Little India Brickfields",
      "Klang",
      "Shah Alam",
      "Bukit Bintang",
      "Berjaya Plaza",
      "Times Square",
      "agdfg",
      "bcvbcvb",
      "Little India Brickfields",
      "ddfg",
      "edfg df",
      "fdfg dfg",
      "Little India Brickfields",
      "Little India Basdckfields",
      "Little India Brickfields"
    ];
  }

  filterItems(ev: any) {
    this.setItems();
    let val = ev.target.value;
    // console.log("input_value: ", val)
    let x: any;
    if (val && val.trim() !== "") {
      this.items = this.items.filter(function(item) {
        let x = item.toLowerCase().includes(val.toLowerCase());
        return x;
      });
    } else {
      this.checkingErrorMsg();
    }
  }

  checkingErrorMsg() {
    if ((this.items = [])) {
      document.getElementById("errMsg").style.display = "block";
    }
  }

  onClear(ev) {
    this.filterItems(ev);
    ev.stopPropagation();
  }

  SelectChangeHandler(event) {
    // console.log("event: ", event.target.innerText)
    if (event) {
      let searchBox = this.myStore.push(event.target.innerText);
      // console.log("aaa: ", searchBox)
      // console.log("bbb: ",this.myStore)
      // console.log(this.myStore.slice(length-1))
      let myStore1 = this.myStore.slice(length - 1);
      this.selectedItems = this.myStore.splice(0, 1);
    }
    // this.navCtrl.push(PropertyPage,{
    //   SearchType: this.selectedItems
    // })
  }

  doInfinite(infiniteScroll) {
    console.log("Begin async operation");

    setTimeout(() => {
      for (let i = 0; i < 10; i++) {
        this.itemss.push(this.itemss.length + ". "+ this.items[i]);
  
      }
      // if(this.itemss.length > this.numberOfItemsToDisplay){
      // this.numberOfItemsToDisplay += 5
      
   
      console.log("length", this.itemss.length);
      
      // var res = Math.max(0, this.items.length);
      // console.log("max", res);
      // }
    
      console.log("Async operation has ended");
      // if(this.items.length === 0 ){
      infiniteScroll.complete();
      // }
    }, 500);
  }


  directToMap() {
    this.navCtrl.push(PropertyLocationSelectionPage);
  }
}

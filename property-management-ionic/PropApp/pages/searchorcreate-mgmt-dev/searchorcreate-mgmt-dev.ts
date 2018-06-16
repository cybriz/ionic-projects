import { Component, Pipe, PipeTransform } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { CreateManagementOrDevPage } from "../create-mgmt-dev/create-mgmt-dev";
import { Parse } from "parse";
import { SummaryPage } from "../summary/summary";

@Component({
  selector: "page-searchorcreate-mgmt-dev",
  templateUrl: "searchorcreate-mgmt-dev.html"
})
export class SearchorCreateManagementDevPage {
  orcreate: string;
  search: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  selectedItems = [];
  myStore = [];
  input: Array<any>;
  searchQuery: string = "";
  country: string;
  data: string;
  value: string;
  ev: string;
  items: string[];
  addressCountry: string;
  addressState: string;
  addressStreet1: string;
  addressStreet2: string;
  addressTown: string;
  addressPostcode: string;
  companyphone: string;
  companyemail: string;

  companywebsite: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.orcreate = navParams.data.orcreate;
    console.log("orecreate" + this.orcreate);
    this.search = navParams.data.search;
    this.username = navParams.data.username;
    console.log("username:" + this.username);
    (this.email = navParams.data.email),
      (this.password = navParams.data.password),
      (this.phone = navParams.data.phone);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SearchorCreatePage");
  }

  onClear(ev) {
    this.filterItems(ev);
    ev.stopPropagation();
  }

  ngOnInit() {
    this.setItems();
  }

  setItems() {
    if (this.orcreate == "Management") {
      let self = this;
      this.items = [];
      var query = new Parse.Query("ManagementDef");
      query.limit(1000);
      query.find({
        success: function(results) {
          console.log(results);
          for (let a of results) {
            console.log("name:", a["attributes"].name);
            let b = a["attributes"].name;
            self.companywebsite = a["attributes"].website;
            self.addressCountry = a["attributes"].country;
            self.addressPostcode = a["attributes"].postcode;
            self.addressState = a["attributes"].states;
            self.addressStreet1 = a["attributes"].addressStreet1;
            self.addressStreet2 = a["attributes"].addressStreet2;
            self.addressTown = a["attributes"].town;
            self.companyemail = a["attributes"].email;
            self.companyphone = a["attributes"].phone;
            self.items.push(b);
          }
        },
        error: function() {
          console.log("query failed");
        }
      });
    } else {
      let self = this;
      this.items = [];
      var dev = new Parse.Query("DeveloperDef");
      dev.limit(1000);
      dev.find({
        success: function(results) {
          console.log(results);
          for (let a of results) {
            console.log("name:", a["attributes"].name);
            let b = a["attributes"].name;
            self.companywebsite = a["attributes"].website;
            self.addressCountry = a["attributes"].country;
            self.addressPostcode = a["attributes"].postcode;
            self.addressState = a["attributes"].states;
            self.addressStreet1 = a["attributes"].addressStreet1;
            self.addressStreet2 = a["attributes"].addressStreet2;
            self.addressTown = a["attributes"].town;
            self.companyemail = a["attributes"].email;
            self.companyphone = a["attributes"].phone;
            self.items.push(b);
          }
        },
        error: function(error) {
          console.log("query failed" + error);
        }
      });
    }
  }

  filterItems(ev: any) {
    if (this.orcreate == "Management"){
    let self = this;
    this.value = ev.target.value;
    let val = ev.target.value;
  
    // console.log("input_value: ", ev.target.value);
    this.items = [];
    var query = new Parse.Query("ManagementDef");
    query.startsWith("name", val);
    query
      .find()
      .then(function(results) {
        for (let a of results) {
          let b = a["attributes"].name;
          // console.log("b", b)
          self.items.push(b);
        }
      })
      .catch(function(error) {
        // There was an error.
      });
    } else {
      let self = this;
      this.value = ev.target.value
      let val = ev.target.value;
      // console.log("input_value: ", ev.target.value);
      this.items = []; 
      var query = new Parse.Query("DeveloperDef");

      query.startsWith('name', val);
      query
        .find()
        .then(function(results) {
          for (let a of results) {
            let b = a["attributes"].name;
            self.items.push(b);
          }
        })
        .catch(function(error) {
      
        });
    }
    
  }

  SelectChangeHandler(event) {
    if (event) {
      let searchBox = this.myStore.push(event.target.innerText);
      console.log("bbb: ", this.myStore);
      let myStore1 = this.myStore.slice(length - 1);
      this.selectedItems = this.myStore.splice(0, 1);
      console.log("**" + this.selectedItems[0]);
    }
  }

  next() {
    let self = this;
    if (this.orcreate == "Management") {
      this.navCtrl.push(SummaryPage, {
        name: "Management",
        username: this.username,
        email: this.email,
        phone: this.phone,
        password: this.password,
        companyname: this.selectedItems[0],
        website: this.companywebsite,
        addressCountry: this.addressCountry,
        addressPostcode: this.addressPostcode,
        addressState: this.addressState,
        addressStreet1: this.addressStreet1,
        addressStreet2: this.addressStreet2,
        addressTown: this.addressTown
      });
    } else {
      this.navCtrl.push(SummaryPage, {
        name: "Developer",
        username: this.username,
        email: this.email,
        phone: this.phone,
        password: this.password,
        companyname: this.selectedItems[0],
        companywebsite: this.companywebsite,
        addressCountry: this.addressCountry,
        addressPostcode: this.addressPostcode,
        addressState: this.addressState,
        addressStreet1: this.addressStreet1,
        addressStreet2: this.addressStreet2,
        addressTown: this.addressTown,
        companyemail: this.companyemail,
        companyphone: this.companyphone
      });
    }
  }
  createDevMgtPage() {
    let self = this;
    console.log("***" + this.orcreate);
    if ((this.orcreate = "Management")) {
      self.navCtrl.push(CreateManagementOrDevPage, {
        pagename: "Management",
        username: this.username,
        email: this.email,
        phone: this.phone,
        password: this.password
      });
    } else if (this.orcreate == "Developer") {
      self.navCtrl.push(CreateManagementOrDevPage, {
        pagename: "Developer",
        username: this.username,
        email: this.email,
        phone: this.phone,
        password: this.password
      });
    }
  }


}

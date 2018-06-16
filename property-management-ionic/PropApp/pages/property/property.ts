import { ListOfLocationPage } from "../list-of-location/list-of-location";
import { Component, Sanitizer } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Events } from "ionic-angular";
import { StringLike } from "@firebase/util";
import { PropertyLocationSelectionPage } from "../property-location-selection/property-location-selection";
import { Parse } from "parse";
import { PropertySummaryPage } from "../property-summary/property-summary";
import { isObject } from "ionic-angular/util/util";
import { ReverseGeocodePage } from "../reverseGeocode/reverseGeocode";

@Component({
  selector: "page-property",
  templateUrl: "property.html"
})
export class PropertyPage {
  userPropertyData = {
    id: "",
    userId: this.navParams.get("propertyType"),
    propertyDefId: "",
    unitNo: "",
    linkType: ""
  };
  select: any;
  someStore = [];
  solution: string;
  arrayStore = [];
  printItOut=[];
  myStore = [];
  selectedItems: any;
  object1: any;
  addr: any;
  lat: any;
  lng: any;
  AddressSentence: any;
  selectedId: string;
  ClickedId: string;
  filterNameFromParse = [];
  names: any;
  data: any;
  building_name: any;
  nameFromParse = [];
  keys = [];
  passKeys: any;
  storage = [];
  newData=[];
  itemss = [];
  numberOfItemsToDisplay=40;
  // anotherPrintItOut = {
  //   name:"",
  //   addressStreet1:"",
  //   addressStreet2:"",
  //   postcode:"",
  //   town:"",
  //   state:"",
  //   country:"",
  //   id:"",
  //   lat:"",
  //   lng:"",
  // };
  anotherPrintItOut=[];
  date:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events
  ) {
    
    console.log("selectedProperty: " + navParams.get("propertyType"));
    this.date = navParams.get("date")
    console.log("tiktok: " + this.date);
    

    let answer = navParams.get("SearchType");
   
    if (answer) {
      let bobo = this.arrayStore.push(answer);
      this.solution = this.arrayStore[0];
      console.log("ppp", this.solution);
      
    }

    this.events.subscribe("geo", (addr, lat, long, buildng_name, id) => {
      console.log("Welcome", addr, "at", lat, long, buildng_name, id);
      this.newData.push(addr)
    });
  }

  ionViewWillEnter() {
    let tabs = document.querySelectorAll(".tabbar");
    if (tabs !== null) {
      Object.keys(tabs).map(key => {
        tabs[key].style.display = "none";
      });
    }
  }

  ionViewDidLoad() {
    this.initializeItems();
  }

  directToMap() {
    this.navCtrl.push(PropertyLocationSelectionPage,{
      date: this.date,
    });
  }

  directToListOfLocation() {
    this.navCtrl.push(ListOfLocationPage);



    // let self= this;
    // if (this.select != "") {
    //   self.events.subscribe("items", selected => {
    //     console.log("seelecteD: " + selected);
    //     self.select = selected;
    //   });
    // }
  }

  // getPropertyDef() {
  //   let self = this;
  //   let query = new Parse.Query("propertyDef");
  //   query.limit(1000);

  //   query.find({
  //     success: function(results) {
  //       for (let i = 0; i < results.length; i++) {
  //         self.object1 = results[i];
  //         console.log(self.object1);

  //         self.AddressSentence = `
  //         ${self.object1.attributes["name"] || ""}

  //         ${self.object1.attributes["addressStreet1"] || ""}${self.object1["attributes"].addressStreet1 !== "" ? ", " : ""}${self.object1.attributes["addressStreet2"] || ""}${self.object1["attributes"].addressStreet2 !== "" ? ", " : ""}
  //         ${self.object1.attributes["postcode"] || ""}${self.object1["attributes"].postcode !== "" ? ", " : ""}${self.object1.attributes["town"] || ""}${self.object1["attributes"].town !== "" ? ", " : ""}
  //         ${self.object1.attributes["state"] || ""}${self.object1["attributes"].state !== "" ? ", " : ""}${self.object1.attributes["country"] || ""}`;
  //         console.log(self.AddressSentence);

  //         self.printItOut.push(self.AddressSentence);
  //         // console.log("printItOut: ", self.printItOut);
  //         // console.log("OBJECT ID: ", self.object.id);
  //         // self.userPropertyData.propertyDefId = object.id
  //         // console.log("getName(object): ", self.getName(self.object1))
  //         // console.log("getID(object): ", self.getID(self.object1))
  //         // console.log("StoreNameInArray", self.StoreNameInArray(self.object1["attributes"].name))
  //         // console.log("getKeys: ", self.getKeys(self.printItOut))
  //         // console.log("GetAddressSentence: ", self.GetAddressSentence(`
  //         // ${(self.object1.attributes["name"] ) || ""}
  //         // console.log("name", self.getNameFromDB(self.object1.attributes["name"]))
  //         // self.getAddressStreet1FromDB(self.AddressSentence.addressStreet1)
  //         // ${(self.object1.attributes["addressStreet1"] ) || ""}${(self.object1["attributes"].addressStreet1 !== '' ? ', ' : '' )}${(self.object1.attributes["addressStreet2"] ) || ""}${(self.object1["attributes"].addressStreet2 !== '' ? ', ' : '' )}
  //         // ${(self.object1.attributes["postcode"] )|| ""}${(self.object1["attributes"].postcode !== '' ? ', ' : '' )}${(self.object1.attributes["town"] )|| ""}${(self.object1["attributes"].town !== '' ? ', ' : '' )}
  //         // ${(self.object1.attributes["state"] )|| ""}${(self.object1["attributes"].state !== '' ? ', ' : '' )}${self.object1.attributes["country"] || ""}`))
  //       }
  //     },
  //     error: function(error) {
  //       alert("query failed: " + error.message);
  //     }
  //   });
  // }

  initializeItems() {
    let self = this;
    this.printItOut=[];
      let query = new Parse.Query("propertyDef");

      this.reuseableQuery(query)
  }
  
  filterItems(ev: any) {
    // this.initializeItems();
    let self = this;
    // let val = ev.target.value;
    // console.log("val:", ev.target.value);
    this.printItOut = []
    // ev.target.value = ev.target.value.toLowerCase().replace(/\b\w/g, function(m){
    //   return m.toUpperCase();
  // }) ;
    let val = ev.target.value;

    if (val && val.trim() !== "") {
     
      
      let query = new Parse.Query("propertyDef").contains("name", val)
      console.log("match", query.matches("name", val, 'i'))   //not recorded inside the parse documentation
      this.reuseableQuery(query)
    } 
    else {
      this.ionViewDidLoad();
    }
  } 


  SelectChangeHandler(event, item) {
    let self = this;
    if (event) {
      let searchBox = self.myStore.push(event.target.innerText);
      let myStore1 = self.myStore.slice(length - 1);
      self.selectedItems = self.myStore.splice(0, 1);
      console.log("event", event.target);

      // let eventNodes = document.getElementById("ID").innerText;
      // console.log("bobo", Object.keys(document.getElementById("ID")))
      // Object.keys(eventNodes).forEach(function (key) {
      //     console.log("eventNODES:",eventNodes[key]);
      // });

      // let index = self.items.indexOf(item.id);
      // if(index > -1){
      //   self.items[index] = self.data;
      //   console.log("data: ", self.items[index])
      // }
    }
    // console.log("gettingID",(<HTMLInputElement>document.getElementById("ID")))
    console.log("clicked lat ", item.lat);
    console.log("clicked longg ", item.lng);
    console.log("clicked ID: ", item.id);
    console.log("clicked address: ",item.addressStreet1 +(item.addressStreet1 !== '' ? ', ' : '') + item.addressStreet2 + item.postcode + item.town + item.state + item.country)
    console.log("passingID: ", self.getIdFromSelectChangeHandler(item.id));
    console.log("passingLAT: ",self.getLatFromSelectChangeHandler(item.lat));
    console.log("passingLNG: ",self.getLngFromSelectChangeHandler(item.lng));
    console.log("passingBuildingName: ",self.getBuildingNameFromSelectChangeHandler(item.name));
    console.log("passingAddress: ", self.getAddressFromSelectChangeHandler(item.addressStreet1 +(item.addressStreet1 !== '' ? ', ' : '') + item.addressStreet2 + (item.addressStreet2 !== '' ? ', ' : '') +item.postcode + (item.postcode !== '' ? ', ' : '') + item.town + (item.town !== '' ? ', ' : '') +item.state + (item.state !== '' ? ', ' : '') +item.country))
    // console.log("clicked ID: ", self.getID(self.object1))
    // self.inputUserPropertyIntoParse();

    this.navCtrl.push(PropertySummaryPage, {
      lat: this.lat,
      lng: this.lng,
      address: this.addr,
      name: this.building_name,
      UserProperty: this.userPropertyData,
      date: this.date
    });
  }

  // inputUserPropertyIntoParse() {
  //   let self = this;
  //   let userProperty = Parse.Object.extend("UserProperty");
  //   let userProp = new userProperty();

  //   userProp.save(self.userPropertyData, {
  //     success: function(userProp) {
  //       console.log("UserProperty created");
  //     },
  //     error: function(error) {
  //       console.log("error");
  //     }
  //   });
  // }

  // onClear(ev) {
  //   this.ionViewDidLoad();
  //   ev.stopPropagation();
  // }

  getIdFromSelectChangeHandler(ID) {
    return (this.userPropertyData.propertyDefId = ID);
  }

  getLatFromSelectChangeHandler(latx) {
    return (this.lat = latx);
  }

  getLngFromSelectChangeHandler(lngx) {
    return (this.lng = lngx);
  }

  getBuildingNameFromSelectChangeHandler(namex) {
    return (this.building_name = namex);
  }

  getAddressFromSelectChangeHandler(addressx){
    return this.addr = addressx
  }


  reuseableQuery(query){
    let self=this;

    query.find({
      success: function(results) {
        for (let i = 0; i < results.length; i++) {
          self.object1 = results[i];
          // console.log(self.object1);

          self.AddressSentence = {
            name:self.object1.attributes["name"],
            addressStreet1:self.object1["attributes"].addressStreet1,
            addressStreet2:self.object1["attributes"].addressStreet2,
            postcode:self.object1.attributes["postcode"],
            town:self.object1.attributes["town"],
            state:self.object1.attributes["state"],
            country:self.object1.attributes["country"],
            id:self.object1.id,
            lat:self.object1.attributes["latitude"],
            lng:self.object1.attributes["longitude"],
          }

          self.printItOut.push(self.AddressSentence);
          // console.log("printItOut: ", self.printItOut[0]);
        //  self.getPrintItOut(self.printItOut)
         
        }
      },
      error: function(error) {
        alert("query failed: " + error.message);
      }
    });
  }

  getPrintItOut(data){
      // console.log("data", this.anotherPrintItOut=data)
      return this.anotherPrintItOut = data
    }
  
  // getAddressStreet1FromDB(data){
  //   let self = this;
  //   if(data){
  //     // console.log("data", this.anotherPrintItOut.name = data)
  //     return self.anotherPrintItOut.addressStreet1 = data
  //   }
  // }

  // doInfinite(infiniteScroll) {
  //   console.log('Begin async operation');

  //   let self = this;

  //       self.printItOut.concat( self.newData);
       
  //   if(infiniteScroll){
  //     console.log('Async operation has ended');
  //     infiniteScroll.complete();
  //   }
  //     if (self.newData.length === 0) {
  //       infiniteScroll.enable(false);
  //     }
  // }



  doInfinite(infiniteScroll) {
    console.log("Begin async operation");

    setTimeout(() => {
      for (let i = 0; i < 5; i++) {
        this.itemss.push(this.itemss.length + ". " + this.printItOut[i])
      }
      
      
      console.log("length", this.itemss.length);
      // var res = Math.max(0, this.items.length);
      // console.log("max", res);
      // if(!this.itemss){
        infiniteScroll.enable(false);
      // }
      console.log("Async operation has ended");
    }, 500);
  }

  // pinMarker(event, info){

  //   console.log("clicked info[lat] ",  info["attributes"].latitude)
  //   console.log("clicked info[long] ",  info["attributes"].longitude)

  // this.navCtrl.push(ReverseGeocodePage,{
  //     lat: info["attributes"].latitude,
  //     lng: info["attributes"].longitude,
  // })
  // console.log("pinMarkerLAT: ", this.lat, this.lng)
  // event.stopPropagation()
  // }
}

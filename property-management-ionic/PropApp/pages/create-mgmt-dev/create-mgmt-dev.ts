import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  Modal,
  LoadingController
} from "ionic-angular";
// import { CountrylistPage } from '../countrylist/countrylist';
import { StatelistPage } from "../statelist/statelist";
import { SummaryPage } from "../summary/summary";
import { Parse } from "parse";
import { Management } from "./../../models/management";
import { User } from './../../models/user';
import { MyPropertiesPage } from "../myproperties/myproperties";
import { Geolocation } from "@ionic-native/geolocation";
// import {
//   NativeGeocoder,
//   NativeGeocoderReverseResult,
//   NativeGeocoderForwardResult
// } from "@ionic-native/native-geocoder";
import { CountrylistPage } from "../countrylist/countrylist";
// import { Geocoder, GeocoderStatus } from "geocoder";
declare var google;

@Component({
  selector: "page-create-mgmt-dev",
  templateUrl: "create-mgmt-dev.html"
})
export class CreateManagementOrDevPage {
  management = {} as Management;
  user = {} as User;
  pagename: string;
  data: string;
  state: string;
  callback: string;
  address: string;
  latitude: number;
  longitude: number;
  loading:any;
  username:string;
  email:string;
  password:string;
  phone:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public geo: Geolocation,
    // private nativeGeocoder: NativeGeocoder,
    private modal: ModalController,
    public loadingCtrl: LoadingController
  ) {
    this.pagename = navParams.data.pagename;
    this.username = navParams.data.username;
    console.log('username:'+ this.username)
    this.email = navParams.data.email,
    this.password = navParams.data.password,
    this.phone = navParams.data.phone,
    this.data = "Select Country";
    this.state = "Select State";
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CreateNewManagementPage");
  }
  store() {
    let self = this;
    if(self.pagename === 'Management'){
    var ManagementDef = Parse.Object.extend("ManagementDef");
    let management = new ManagementDef();
    self.saveStates();
    
    var data1 = {
      email: this.management.email,
      postcode: this.management.postcode,
      phone: this.management.phone,
      town: this.management.town,
      addressStreet1: this.management.streetone,
      addressStreet2: this.management.streettwo,
      website: this.management.website,
      name: this.management.name,
      country: this.data,
      states:this.state
    };
    management.save(data1, {
      success: function(user) {
        console.log("1");
        self.navCtrl.push(SummaryPage, {});
        console.log("2");

        console.log("created management");
      },
      error: function(user, error) {
        // self.showAlert(error.message);
        console.log("error");
      }
    });
  }else{
    var DeveloperDef = Parse.Object.extend("DeveloperDef");
    let developer = new DeveloperDef();
    self.saveStates();
    
    var data2 = {
      email: this.management.email,
      postcode: this.management.postcode,
      phone: this.management.phone,
      town: this.management.town,
      addressStreet1: this.management.streetone,
      addressStreet2: this.management.streettwo,
      website: this.management.website,
      name: this.management.name,
      country: this.data,
      states:this.state
    };
    developer.save(data2, {
      success: function(user) {
        console.log("1");
        self.navCtrl.push(SummaryPage, {});
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

  saveStates(){
    let self= this;
    var States = Parse.Object.extend("States");
    var states= new States;
    var query = new Parse.Query("States");
    var innerQuery = new Parse.Query(States);
    innerQuery.exists(self.state);
    query.matchesQuery("name", innerQuery);
    query.find({
      success: function(object){
        console.log('notexist' + self.state)
        var States = Parse.Object.extend('States');
        var states = new States();
         var data={
          name:self.state
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

  selectCountry() {
    const myModal: Modal = this.modal.create(CountrylistPage);
    myModal.present();
    myModal.onDidDismiss(data => {
      this.data = String(data);
    });
  }
  selectState() {
    const myModal: Modal = this.modal.create(StatelistPage);
    myModal.present();
    myModal.onDidDismiss(state => {
      this.state = String(state);
    });
  }
  onPositionReceived(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    console.log("Your latitude is :" + lat + " and longitude is " + lng);
    console.log(position);
    var geocoder = new google.maps.Geocoder(); // create a geocoder object
    var location = new google.maps.LatLng(
      position.coords.latitude,
      position.coords.longitude
    );
    let self = this;
    geocoder.geocode({ location }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        console.log(results);
        if (results[1]) {
          var address = results[0].formatted_address;
          self.getLocalityFromPlaces(results[0]);
          self.getCountryFromPlaces(results[0]);
          self.getPostalCodeFromPlaces(results[0]);
          self.getRouteFromPlaces(results[0]);
          self.getSublocalityFromPlaces(results[0]);
          self.getStateFromPlaces(results[0]);
          console.log("address" + address);
        } else {
          console.log("no results");
        }
      } else {
        console.log("geocoder failed due:" + status);
      }
    });
  }

  getRouteFromPlaces(places) { 
    for (let element in places.address_components) { 
        if (places.address_components[element].types[0] === "route") {
             this.management['streetone'] = places.address_components[element].long_name;
            } 
            console.log('route:'+ this.management['streetone'])
           } 
       } 
  getSublocalityFromPlaces(places) { 
    for (let element in places.address_components) { 
        if (places.address_components[element].types[2] === "sublocality_level_1") {
              this.management['streettwo'] = places.address_components[element].long_name;
              }
              console.log('sublocal:' + this.management['streettwo'])
          } 
            }      
  getLocalityFromPlaces(places) { 
    for (let element in places.address_components) { 
      if (places.address_components[element].types[0] === "locality") {
          this.management['town'] = places.address_components[element].long_name;
          }
          console.log('town' + this.management['town'] )
        }
      } 

  getCountryFromPlaces(places) {
    for (let element in places.address_components) {
          if (places.address_components[element].types[0] === "country") {
              this.data= places.address_components[element].long_name;
            }
            console.log('country' +this.data)
        } 
      } 

  getPostalCodeFromPlaces(places) { 
    for (let element in places.address_components) {
          if (places.address_components[element].types[0] === "postal_code") { 
               this.management['postcode']= places.address_components[element].long_name;
               console.log('postcode' +this.management['postcode'])
              } 
            } 
        }
  getStateFromPlaces(places) { 
          for (let element in places.address_components) {
                if (places.address_components[element].types[0] === "administrative_area_level_1") { 
                     this.state = places.address_components[element].long_name;
                    } 
                    console.log('state' +this.state)
                  } 
              }
      

  currentlocation() {
    let self = this
    let loading = this.loadingCtrl.create({
      content: 'Please wait..',
      spinner: 'crescent'
    })
    loading.present();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.onPositionReceived.bind(this));
      setTimeout(() => {
        loading.dismiss();
      },10000);
    }
    
  }
next(){
  let self = this;
    console.log('uppercae:', self.management.name)
  if (this.pagename == 'Developer'){
    self.navCtrl.push(SummaryPage, {
      name:'Developer',
      username: this.username,
      email:this.email,
      phone: this.phone,
      password:this.password,
      postcode: this.management.postcode,
      town: this.management.town,
      street1: this.management.streetone,
      street2: this.management.streettwo,
      country: this.data,
      state:this.state,
      companyname:this.management.name,
      companyemail: this.management.email,
      companyphone: this.management.phone,
      companywebsite: this.management.website,
  
    });
  } else {
  self.navCtrl.push(SummaryPage, {
    name:'Management',
    username: this.username,
    email:this.email,
    phone: this.phone,
    password:this.password,
    postcode: this.management.postcode,
    town: this.management.town,
    street1: this.management.streetone,
    street2: this.management.streettwo,
    country: this.data,
    state:this.state,
    companyname:this.management.name,
    companyemail: this.management.email,
    companyphone: this.management.phone,
    companywebsite: this.management.website,

  });
  }
 }
}

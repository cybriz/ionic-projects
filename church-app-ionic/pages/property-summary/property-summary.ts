// import { Parse } from 'parse';
import { Component} from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { Events } from "ionic-angular";
declare var google;

@Component({
  selector: "page-property-summary",
  templateUrl: "property-summary.html"
})

export class PropertySummaryPage {
  address: string;
  map: any;
  lat:number;
  lng:number;
  name_val:any;
  propertyDef:any;
  userProperty:any;
  image:any;
  date:any;
  morePics=[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events
  ) {
      this.address = navParams.data.address;
      this.lat = navParams.get("lat");
      this.lng = navParams.get("lng");
      this.name_val = navParams.get("name");
      this.propertyDef = navParams.get("propertyDef");
      this.userProperty = navParams.get("UserProperty");
      this.image = navParams.get("images");
      this.date = navParams.get("date");
      this.morePics = navParams.get("morePics");
      console.log("nana: ", this.lat, this.lng, this.name_val, this.propertyDef, this.userProperty, this.address, this.image, this.date, this.morePics);
  }

  ionViewDidLoad() {
    this.initMap(this.lat, this.lng);
    console.log("alihe: ", this.lat, this.lng)
  }

  initMap(lat, lng) {
    var latLng = new google.maps.LatLng(lat=1.518581, lng=103.82053799999994);
    console.log("hhhhh:",lat, lng);
    var map1 = new google.maps.Map(document.getElementById("map9"), {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      fullscreenControl: false
    });

    var marker = new google.maps.Marker({
      position: latLng,
      title: "Hello World!",
      map: map1,
      animation: google.maps.Animation.DROP
    });
    marker.setMap(map1);
    marker.addListener("click", toggleBounce);
    function toggleBounce() {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    }
  }
  add(){
  //   let self = this;
  //   console.log("WHYYYY," , self.address)
  //   this.events.publish("address123",self.address);
  //   if(typeof(this.propertyDef) !== "undefined"){
  //     console.log("propertydef: ",this.propertyDef)
  //   let PropertyDefinition = Parse.Object.extend("propertyDef");
  //   let prop = new PropertyDefinition();
  //     // let self = this;
  //   prop.save(this.propertyDef, {
  //     success: function(prop) {
  //       console.log("PropertyDefinition created");
  //       self.navCtrl.push(TabsPage).then(( ) =>{
  //         self.events.publish("address123",self.address, self.name_val, self.image, self.date, self.morePics);
  //         console.log("YIEPEE")
  //       })
        
  //     },
  //     error: function(err) {
  //       console.log("WARNING!!!! error");
  //     }
  //   });
  // }
  //  else {
  //    this.inputUserPropertyIntoParse()

  //   }
  }

  inputUserPropertyIntoParse() {
  //   let self = this;
  //   let userProperty = Parse.Object.extend("UserProperty");
  //   let userProp = new userProperty();
  
  //   userProp.save(self.userProperty, {
  //     success: function(userProp) {
  //       console.log("UserProperty created");
  //       self.navCtrl.push(TabsPage)
  //         // .then(( ) =>{
  //         //  self.events.publish("address123",self.address, self.name_val);
  //         // console.log("YIEPEE22")
  //       // })
  //     },
  //   });
  // }
  }
}

import { Parse } from 'parse';
import { Component} from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
declare var google;
import { Events } from "ionic-angular";

@Component({
  selector: "page-reverseGeocode",
  templateUrl: "reverseGeocode.html"
})

export class ReverseGeocodePage{
  address: string;
  map: any;
  lat:number;
  lng:number;
  building_name:any;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events
  ) {
      this.address = navParams.data.address;
      this.lat = navParams.get("lat");
      this.lng = navParams.get("lng");
      this.building_name = navParams.get("building_name");
      console.log("nana: ", this.lat, this.lng, this.building_name );
  }

  ionViewDidLoad() {
    this.initMap(this.lat, this.lng);
  }

  initMap(lat, lng) {
    console.log("hhhhh:", lat, lng);

    let latLng = new google.maps.LatLng(lat, lng);
    let map1 = new google.maps.Map(document.getElementById("map9"), {
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
}
import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
declare var google;

@Component({
  selector: 'page-google-map',
  templateUrl: 'google-map.html',
})
export class GoogleMapPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoogleMapPage');
    this.initMap()
  }
  initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: {lat: -24.345, lng: 134.46}  // Australia.
    });
  
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer({
      draggable: true,
      map: map,
      panel: document.getElementById('right-panel')
    });

    let self = this;
    directionsDisplay.addListener('directions_changed', function() {
      self.computeTotalDistance(directionsDisplay.getDirections());
      console.log("directionsDisplay.getDirections(): ", directionsDisplay.getDirections())
    });
  
    this.displayRoute('permas jaya', 'skudai', directionsService,
        directionsDisplay);
  }
  
  displayRoute(origin, destination, service, display) {
    service.route({
      origin: origin,
      destination: destination,
  /*     waypoints: [{location: 'melaka'}, {location: 'muar'}], */
      travelMode: 'DRIVING',
      avoidTolls: true
    }, function(response, status) {
      if (status === 'OK') {
        display.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
  }
  
  computeTotalDistance(result) {
    var total = 0
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value;
    }
    total = total / 1000;
    document.getElementById('total').innerHTML = total + ' km';
  }
}

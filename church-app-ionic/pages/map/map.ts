import { Component, ViewChild, ElementRef } from '@angular/core';
// import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalController } from 'ionic-angular';
import { IonPullUpFooterState } from 'ionic-pullup';
declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  expanded: any;
  contracted: any;
  showIcon = true;
  info:any;
  footerState: IonPullUpFooterState;

  @ViewChild("source")
  public sourceElementRef: ElementRef;

  @ViewChild("mapView")
  public mapElementRef: ElementRef;

  constructor(public modalCtrl: ModalController) {
    this.footerState = IonPullUpFooterState.Collapsed;
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoogleMapPage');
    this.initMap()
  }

  footerExpanded() {
    console.log('Footer expanded!');
  }

  footerCollapsed() {
    console.log('Footer collapsed!');
  }

  toggleFooter() {
    this.footerState = this.footerState == IonPullUpFooterState.Collapsed ? IonPullUpFooterState.Expanded : IonPullUpFooterState.Collapsed;
  }

  initMap() {
    var chenLiTang = { lat: 1.518581, lng: 103.820538 };
    console.log("map : " + this.mapElementRef.nativeElement)
    var map = new google.maps.Map(this.mapElementRef.nativeElement, {
      center: chenLiTang,
      zoom: 7,
      fullscreenControl: false,
    });

    var contentString = '<div id="content">' +
      '<h3>长老会真理堂新山教会</h3>' +
      '<p>Chen-Li Presbyterian Church</p>' +
      '<a href="https://www.chenlitang.com">' +
      'https://www.chenlitang.com</a> ' +
      '</div>';

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    var marker = new google.maps.Marker({
      position: chenLiTang,
      map: map,
      title: '长老会真理堂新山教会'
    });
    marker.addListener('click', function () {
      infowindow.open(map, marker);
    });

    var directionsDisplay = new google.maps.DirectionsRenderer({
      map: map,
      panel: document.getElementById('floating-panel'),
    });
    console.log("display : " + directionsDisplay.getMap().getCenter())
    console.log("directionsDisplay.panel: ", this.getPanelInfo(directionsDisplay))
    console.log("directionsDisplay", directionsDisplay)
   

    let source = new google.maps.places.Autocomplete(this.sourceElementRef.nativeElement, {
      type: "regions"
    });
    

    let self = this
    directionsDisplay.addListener('directions_changed', function () {
      console.log('directionsDisplay.getDirections(): ', directionsDisplay.getDirections())
      self.computeTotalDistance(directionsDisplay.getDirections());
    });

    source.addListener("place_changed", () => {
      if (source.getPlace() != undefined) {
        var src = source.getPlace().name
      } else {
        // var src: any = chenLiTang
        chenLiTang;
      }
      // Set destination, origin and travel mode.
      var request = google.maps.DirectionsRequest = {
        destination: chenLiTang,
        origin: src,
        travelMode: google.maps.TravelMode.DRIVING
      };
      console.log("request : " + request.origin)

      // Pass the directions request to the directions service.
      var directionsService = new google.maps.DirectionsService();
      directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          // Display the route on the map. 
          console.log("response : " + response.geocoded_waypoints.map(f => f.place_id))
          directionsDisplay.setDirections(response);
        } else { console.log("not OK !" + status) }
      });
    })
  }
  computeTotalDistance(result) {
    var total = 0;
    var myroute = result.routes[0];
    console.log("result: ", result)
    for (var i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i].distance.value;
    }
    total = total / 1000;
    document.getElementById('total').innerHTML ='Total Distance: ' + total + ' km';

  }
  getPanelInfo(panelInfo){
    if(panelInfo){
      return this.info = panelInfo
    }
  }

  // expand() {
  //   console.log("this.info ",this.info)
  //   this.expanded = true;
  //   this.contracted = !this.expanded;
  //   this.showIcon = false;
  //   setTimeout(() => {
  //     const modal = this.modalCtrl.create('PopupFabModalPage',{
  //       information: this.info
  //     });
  //     modal.onDidDismiss(data => {
  //       this.expanded = false;
  //       this.contracted = !this.expanded;
  //       setTimeout(() => this.showIcon = true, 330);
  //     });
  //     modal.present();
  //   }, 200);
  // }
}

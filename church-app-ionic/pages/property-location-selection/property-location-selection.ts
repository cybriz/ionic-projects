import { Component, ViewChild, ElementRef } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { Events } from "ionic-angular";
import { HomePage } from "../home/home";
import { PropertySummaryPage } from "../property-summary/property-summary";
// import { SideMenuPage } from "../side-menu/side-menu";
declare var google;

@Component({
  selector: "page-property-location-selection",
  templateUrl: "property-location-selection.html"
})
export class PropertyLocationSelectionPage {
  @ViewChild("map") mapRef: ElementRef;
  propertyDef = {
    id: "",
    name:"",
    addressStreet1:"",    //route
    addressStreet2:"",    //sublocality_level_1
    town:"",              //locality
    postcode:"",          //postal_code
    state:"",             //administrative_area_level_1
    country:"",           
    latitude:"",
    longitude:"",
  };
  val: any;
  def: any;
  name : any;
  parseProp = [];
  Array = [];
  address: string;
  latitude: any;
  longitude: any;
  x: any;
  images:any;
  date:any;
  moreImages:any;
  morePictures=[];
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events
  ) {}

  ionViewDidLoad() {
    // console.log(this.mapRef)
    this.initMap(this.latitude= 1.518581,this.longitude= 103.82053799999994);
  }

  initMap(lat, lng) {
    const options =  {
      center: { lat, lng},
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      fullscreenControl: false
    }
    // let map = new google.maps.Map(document.getElementById("map"), {
    const map = new google.maps.Map(this.mapRef.nativeElement, options);
 
    // setTimeout(()=>{
    //   map.setMapTypeId('terrain');
    // }, 2000);

    // Create the search box and link it to the UI element.
    let input = <HTMLInputElement>document.getElementById("pac-input");
    let searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    google.maps.event.addListener(map, "bounds_changed", function() {
      if (map.getBounds()) {
        // console.log('map.getBounds(): ' + map.getBounds())
        searchBox.setBounds(map.getBounds());
      }
    });

    let markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    let self = this;
    searchBox.addListener("places_changed", function() {
      let places = searchBox.getPlaces();

      self.address = places[0].formatted_address;
      self.latitude = places[0].geometry.location.lat();
      self.longitude = places[0].geometry.location.lng();
      self.name = places[0].name;
      console.log("places: ", places);

      // self.data = {
      //   address: places[0].formatted_address,
      //   latitude: places[0].geometry.location.lat(),
      //   longitude: places[0].geometry.location.lng(),
      //   name_val: places[0].name
      // };

      console.log("address: " + self.getNameFromPlaces(places[0]));
      console.log("latitude: " + self.getLatitudeFromPlaces(places[0]));
      console.log("longitude: " + self.getLongitudeFromPlaces(places[0]));
      console.log("route: " + self.getRouteFromPlaces(places[0]));
      console.log("sublocality_level_1: " + self.getSublocalityFromPlaces(places[0]));
      console.log("locality: " + self.getLocalityFromPlaces(places[0]));
      console.log("administrative_area_level_1: " +self.getAdministrativeFromPlaces(places[0]));
      console.log("country: " + self.getCountryFromPlaces(places[0]));
      console.log("postal_code: " + self.getPostalCodeFromPlaces(places[0]));

      // for (let i = 0; i < places[0].address_components.length; i++) {
      //   let addressType = places[0].address_components[i].types[0];

      //   if (typeof addressType == "string") {
      //     self.def = places[0].address_components[i].types[0];
      //     self.val = places[0].address_components[i][self.propertyDef[addressType]];
      //     // self.name_val.push(places[0].name)
      //     // let data = console.log("{"+self.def + ": " + self.val+"}");
      //     // let smth1 = self.data1.push(self.def)
      //     // let smth2 = self.data2.push(self.val)
      //     self.temp[places[0].address_components[i].types[0]] = places[0].address_components[i][self.propertyDef[addressType]];
      //     self.Array.push(self.temp)
      //     self.Array.push(self.data)
      //     const array0 = self.data1.push(self.Array[0])
      //     const array1 = self.data2.push(self.Array[1])
      //     // console.log(array0.concat(array1))
      //     // console.log(self.data1)
      //     // console.log(self.data2)
      //     self.data3 = self.data1.concat(self.data2)
      //     console.log("ES6",[...self.data1, ...self.data2])
      //     console.log("T.T",self.data1.concat(self.data2))
      //     // self.dataCombined = self.Array.concat(data)
      //     console.log("data: ", self.Array)
      //     // console.log("address; ", self.Array)

      //     // console.log("re-print: ", self.propertyDef)
      //     // let smth = self.parseProp.push(self.def+ ": " + self.val);
      //     // console.log("jeje: ", self.parseProp);
      //   }
      // }

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      let bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        let icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

      
          // var photos = place.photos;
          // if (!photos) {
          //   return;
          // }

        // Create a marker for each place.
        markers.push(
          new google.maps.Marker({
            map: map,
            // icon: icon,
            title: place.name,
            position: place.geometry.location,
            draggable: true,
            // icon: photos[0].getUrl({'maxWidth': 200, 'maxHeight': 200})
          })
        );


        // console.log("First pic: ", photos[0].getUrl({'maxWidth': 200, 'maxHeight': 200}))
        // console.log("establishment_pic: ",self.imagesFromPlaces(places[0],photos))
        // console.log("MORE PICS: ", self.moreImagesFromPlaces(places[0], photos))

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  }

  imagesFromPlaces(places , photos){
    let self=this;
    for (let element in places.types) {
      // console.log("typessss: ", places.types[element])
      if (places.types[element] === "establishment") {
        // console.log("Element: ", element )
        // console.log("IMAGES: ",self.images = photos[element].getUrl({'maxWidth': 200, 'maxHeight': 200}) )
        return self.images = photos[element].getUrl({'maxWidth': 200, 'maxHeight': 200})
      }
    }
    return "";
  }
  
  moreImagesFromPlaces(places , photos){
    let self=this;
    for (let element in places.types) {
        console.log("Element: ", places.types[element])
        console.log("MORE IMAGES: ",self.moreImages = photos[element].getUrl({'maxWidth': 200, 'maxHeight': 200}))
        self.morePictures.push(self.moreImages)
        // console.log("lai lai", self.morePictures)
    }
    return "";
  }

  getNameFromPlaces(places) {
    let self = this;
    if(places.name){
      return self.propertyDef.name = self.name;
    }
    return "";
  }

  getRouteFromPlaces(places) {
    for (let element in places.address_components) {
      if (places.address_components[element].types[0] === "route") {
        return this.propertyDef.addressStreet1 = places.address_components[element].long_name;
      }
    }
    return "";
  }

  getSublocalityFromPlaces(places) {
    for (let element in places.address_components) {
      if (places.address_components[element].types[0] === "sublocality_level_1") {
        return this.propertyDef.addressStreet2 = places.address_components[element].long_name;
      }
    }
    return "";
  }

  getLocalityFromPlaces(places) {
    for (let element in places.address_components) {
      if (places.address_components[element].types[0] === "locality") {
        return this.propertyDef.town = places.address_components[element].long_name;
      }
    }
    return "";
  }

  getAdministrativeFromPlaces(places) {
    for (let element in places.address_components) {
      if (places.address_components[element].types[0] === "administrative_area_level_1") {
        return this.propertyDef.state = places.address_components[element].long_name;
      }
    }
    return "";
  }

  getCountryFromPlaces(places) {
    for (let element in places.address_components) {
      if (places.address_components[element].types[0] === "country") {
        return this.propertyDef.country = places.address_components[element].long_name;
      }
    }
    return "";
  }

  getPostalCodeFromPlaces(places) {
    for (let element in places.address_components) {
      if (places.address_components[element].types[0] === "postal_code") {
        return this.propertyDef.postcode = places.address_components[element].long_name;
      }
    }
    return "";
  }

  getLatitudeFromPlaces(places) {
    let self=this;
    if(places.geometry){
      return self.propertyDef.latitude = self.latitude.toString();
    }
    return "";
  }

  getLongitudeFromPlaces(places) {
    let self=this;
    if(places.geometry){
      return self.propertyDef.longitude = self.longitude.toString();
    }
    return "";
  }

  buttonConfirm() {
    let self = this;
    // let PropertyDefinition = Parse.Object.extend("propertyDef");
    // let prop = new PropertyDefinition();

    // prop.save(this.propertyDef, {
    //   success: function(prop) {
    //     console.log("PropertyDefinition created");
    //   },
    //   error: function(err) {
    //     console.log("WARNING!!!! error");
    //   }
    // });

    this.navCtrl.push(PropertySummaryPage, {
      address: self.address,
      lat: self.latitude,
      lng: self.longitude,
      name: self.name,
      propertyDef: self.propertyDef,
      images: self.images,
      date: self.date,
      morePics: self.morePictures
    });
    // this.events.publish("geo",
    //   self.address,
    //   self.latitude,
    //   self.longitude,
    //   self.name,
    //   self.propertyDef.id,
    // );
  }
  buttonCancel() {
    this.navCtrl.push(HomePage)
  }
}

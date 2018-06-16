import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
// import { AngularFireAuth } from "angularfire2/auth";
import { AlertController } from "ionic-angular";
import { MessagesPage } from "../messages/messages";
import { SettingsPage } from "../settings/settings";
import { LoginPage } from "../login/login";
import { PropertyTypePage } from "../property-type/property-type";
import { PropertyManagementPage } from "../property-management/property-management";
import { PropertyDeveloperPage } from "../property-developer/property-developer";
import { Parse } from "parse";
import { Events } from "ionic-angular";
import { PropertyTypeOwnPage } from '../property-type-own/property-type-own'

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  appType = "Own";
  typeQuery:any;
  getObjectFromLoop;
  email:"";
  compareManagement:any;
  // cardsData:any = {
  // address:"",
  // name:"",
  // picLink:"",
  // date:"",
  // }
  cardsData:any = {
    'Own':[{
      address:"",
      name:"",
      picLink:"",
      date:"",
    }],
    'Rent':[{
      nothing:'',
    }]
  }
  morePics=[];
    // cardsInfo=[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    // private aAuth: AngularFireAuth,
    public alertCtrl: AlertController,
    public events: Events
  ) {
    // this.address = navParams.get("address")
    // console.log("address11111: ", navParams.get("address"))
    let self = this;
    this.events.subscribe('address123', (address, name, pic_link, date, morePics) => {
      console.log("there333333: ",address, "name:",name, "and pic: ", pic_link ,"&", date ,"with morePics: ", morePics);
      self.cardsData['Own'][0].address = address
      self.cardsData['Own'][0].name = name
      self.cardsData['Own'][0].picLink = pic_link
      self.cardsData['Own'][0].date = date
      self.morePics = morePics
      
      // self.cardsInfo.push(self.cardsData)
    });
    console.log("im at home page",this.cardsData['Own'][0].address)


  }

  ionViewDidEnter() {
    let elem = <HTMLElement>document.querySelector(".tabbar");
    if (elem != null) {
      elem.style.display = "flex";
    }
  }

  getItems(type:any){
    return this.cardsData[type];
  }

  addButton() {
    let currentUser = Parse.User.current();
    let currentUserId = currentUser.id
    if (currentUser) {
      console.log('current user id:' + currentUser.id)
      // for (let i in currentUser) {
      //   console.log('i:' + i)
      // }
    } else {
      console.error('No user!')
      return
    }

    let self = this;
    let query = new Parse.Query("User");
   

      let emailRequest = new Parse.Query("User");
      emailRequest.equalTo("objectId", currentUserId)
      console.log("objectId:", currentUserId)

      

      emailRequest.find({
        success: function(results) {
          console.log("Successfully retrieved " + results.length);

          for (let i = 0; i < results.length; i++) {
            var object = results[i];
            console.log(object.id + ' - ' + object.get('type'));
            var id = object.id 
            var type = object.get('type')
            var include = emailRequest.startsWith("type", type);
            self.bringOutTheObject(object.get('type'))
          }

          // self.navCtrl.push(PropertyTypePage)

          console.log("id", id)
          console.log("type", type)
          console.log("include," ,include)
          console.log("wow",emailRequest["_where"]["type"]["$regex"])
          console.log("TestManagement: ", self.getObjectFromLoop === "Management")
          console.log("TestDeveloper: ", self.getObjectFromLoop === "Developer")
          console.log("TestingOR: ", self.getObjectFromLoop === "Owner/Renter")
          // console.log("exists: ", query.exists("Management"))
          // var compare = self.getObjectFromLoop === "Management"
          // console.log("compare", compare)
          // console.log("bringOutGetObjectFromLoop: " ,self.bringOutGetObjectFromLoop(self.getObjectFromLoop))

          
          if(self.getObjectFromLoop === "Management"){
            console.log("READ MANAGEMENT")
            self.navCtrl.push(PropertyManagementPage)
          } 
            else if(self.getObjectFromLoop === "Developer"){
              console.log("READ DEVELOPER")
              self.navCtrl.push(PropertyDeveloperPage)
            } 
            else if(self.getObjectFromLoop === "Owner/Renter"){
              console.log("READ OWNER PAGE")
              self.navCtrl.push(PropertyTypePage)
            }
            else {
              console.log("No User Found")
            }
 
        },
        error: function( error) {
          console.log("error: ",error.message);
        }
      });
  }


  bringOutTheObject(object){
    return this.getObjectFromLoop = object

  }

  pushToTypeOwn(){
    this.navCtrl.push(PropertyTypeOwnPage,{
      address: this.cardsData['Own'][0].address,
      name: this.cardsData['Own'][0].name,
      pic: this.cardsData['Own'][0].picLink,
      date: this.cardsData['Own'][0].date,
      morePics: this.morePics,
    })
  }
//   bringOutGetObjectFromLoop(obj){
//     for (var prop in obj) {
//       if(obj.hasOwnProperty(prop)){
//     console.log("this.compareManagement: ",this.compareManagement = obj)
//     return this.compareManagement = obj
//     }
//   }
// }

}

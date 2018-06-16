
import { Component ,Output, EventEmitter} from "@angular/core";
import { IonicPage, NavController, NavParams, ViewController, InfiniteScroll  } from "ionic-angular";
import { Parse } from "parse";
import { error } from "util";
import { CreateManagementOrDevPage } from "../create-mgmt-dev/create-mgmt-dev";
import { AlertController } from "ionic-angular";
// import { CountryProvider } from './provider'
import { MockProvider } from '../../providers/mock/mock'
@Component({
  selector: "page-countrylist",
  templateUrl: "countrylist.html"



})
export class CountrylistPage {
  selectedItems = [];
  myStore = [];
  input: Array<any>;
  searchQuery: string = "";
  items=[];
  country: string;
 list:any;
  data:string;
  value:string;
  ev:string;


  constructor(private mockProvider: MockProvider,public navCtrl: NavController, public navParams: NavParams, private view:ViewController,public alertCtrl: AlertController) {
    // this.items = mockProvider.getData();
      // var b = [];
      // let self = this;
      // this.items = [];
      // var query = new Parse.Query("Countries");
      // query.limit(1000);
    
      // query.find({
      //   success: function(results) {
      //     for (let a of results) {
      //       var b = a["attributes"].Name;
            
      //       // console.log(a["attributes"].Name)
      //       // self.list = b;
           
      //     }
      
      //   },
      //   error: function() {
      //     console.log("query failed", error);
      //   }
      // });
   
      // console.log("bbbbb", b)
      // for (let item = 0; item < 10; item++) {
       
      //   self.items.push(self.list[item]);
       
      // }
     

   }

  //  doInfinite(infiniteScroll) {
  //   this.mockProvider.getAsyncData().then((newData) => {
  //     for (var i = 0; i < newData.length; i++) {
  //       this.items.push( newData[i] );
  //     }

  //     infiniteScroll.complete();

  //     if (this.items.length > 90) {
  //       infiniteScroll.enable(false);
  //     }
  //   });
  // }

  // ionViewDidLoad(){
  //   let self = this;
  //   this.items = [];
  //   var query = new Parse.Query("Countries");
  //   query.limit(1000);

  //   query.find({
  //     success: function(results) {
  //       for (let a of results) {
  //         let b = a["attributes"].Name;
  //         self.list = b
  //         // for (let item = 0; item < 30; item++) {
  //           self.items.push(self.list);
  //         // }
         
  //       }
  //     },
  //     error: function() {
  //       console.log("query failed", error);
  //     }
  //   });
  //  for (let i = 0; i < 10; i++) {
  //   this.items.push( this.list );
  // }
  //  console.log('list' + this.list)
  // }
  
  ngOnInit() {
    this.setItems();
    // this.items 
   
  }

  setItems() {

    let self = this;
    this.items = [];
    var query = new Parse.Query("Countries");
    query.limit(1000);

    query.find({
      success: function(results) {
        for (let a of results) {
          let b = a["attributes"].Name;
          self.list = b
          // for (let item = 0; item < 30; item++) {
            self.items.push(self.list);
          // }
         
        }
      },
      error: function() {
        console.log("query failed", error);
      }
    });
  }
 
 filterItems(ev: any) {
   let self= this;
    ev.target.value = ev.target.value.toLowerCase().replace(/\b\w/g, function(m){
      return m.toUpperCase();
    }) ;
   this.value = ev.target.value;
   let val = ev.target.value;
   this.items = [];    
    var query = new Parse.Query("Countries");
     query.startsWith("Name", val);
     query.find()
        .then(function(results) {
         for (let a of results) {
          let b = a["attributes"].Name;
          // console.log("b", b)
            self.items.push(b);
        }
        })
        .catch(function(error) {
          // There was an error.
        });
  }

  onClear(ev) {
    this.filterItems(ev);
    ev.stopPropagation();
  }

  SelectChangeHandler(event) {
    if (event) {
      let searchBox = this.myStore.push(event.target.innerText);
      console.log("bbb: ", this.myStore);
      let myStore1 = this.myStore.slice(length - 1);
      this.selectedItems = this.myStore.splice(0, 1);
      const data = this.selectedItems[0]
      this.view.dismiss(data);
      console.log(data)
    }
  }

  validate(){
    let self= this;
    const data = this.value;
    console.log('(('+ this.value)
    if (this.data == "Select Country"){
      let alert = self.alertCtrl.create({
        title:"Invalid Input",
        buttons:['OK']
      });
      alert.present();
     } 
     else if (data == ''){
      console.log(this.value)
     return false
     }
     else  {
       console.log('hi')
       this.view.dismiss(data);
      }
  }
  dismiss() {
    const data = 'Select Country'
    this.view.dismiss(data);
  }
  usethis() {
   this.validate();
  }

  // doInfinite(infiniteScroll) {
  //   console.log('Begin async operation');

  //   setTimeout(() => {
  //     for (let items = 0; items < 10; items++) {
  //       this.items.push( this.list);
  //       console.log("lst", this.list)
  //     }

  //     console.log('Async operation has ended');
  //     infiniteScroll.complete();
  //   }, 500);
  // }

  // doInfinite(infiniteScroll) {
  //   console.log('Begin async operation');

  //   setTimeout(() => {
  //     for (let i = 0; i < 10; i++) {
  //       this.items.push( this.list );
  //     }

  //     console.log('Async operation has ended');
  //     infiniteScroll.complete();
  //   }, 500);
  // }

  

}

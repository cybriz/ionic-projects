import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ModalController,ViewController } from "ionic-angular";

  import { Parse } from 'parse';
  import { error } from 'util';
  import { AlertController } from "ionic-angular";

  
  @Component({
    selector: 'page-statelist',
    templateUrl: 'statelist.html',
})
export class StatelistPage {
  items: string[];
  selectedItems=[];
  b= [];
  myStore = [];
  input:Array<any>;
  searchQuery: string = '';
  namestate:string;
  value:string;
  ev:string;
  
  constructor(public navCtrl: NavController,public navParams: NavParams,private modal: ModalController,private view:ViewController,
    public alertCtrl:AlertController ) {
   
  }
  ngOnInit() {
    this.setItems();
  }

  setItems() {
    let self=this;
    this.items = [];
    var query = new Parse.Query("States");
    query.limit(1000);

    query.find({ 
        success: function(results) {
            for(let o of results){
              let b = o["attributes"].Name;
              self.items.push(b);
              console.log('B:'+ b)
            } 
        },
        error: function() {
            console.log("query failed", error);
        }
    });
  }
  filterItems(ev: any) {
    let self = this;
    ev.target.value = ev.target.value.toLowerCase().replace(/\b\w/g, function(m){
      return m.toUpperCase();
    }) ;
   this.value = ev.target.value;
   let val = ev.target.value;
    // console.log("input_value: ", ev.target.value);
    this.items = [];    
    var query = new Parse.Query("States");
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
      const state = this.selectedItems[0]
      this.view.dismiss(state);
    }
  }

    validate(){
      let self= this;
      const data = this.value;
      if (this.value == "Select State"){
        let alert = self.alertCtrl.create({
          title:"Invalid Input",
          buttons:['OK']
        });
        alert.present();
       } 
       else if (this.value == ''){
         return false;
       }
        else  {
          this.view.dismiss(this.value);
          console.log(this.value)
        }
    }
  
  usethis() {
    this.validate();
  }
  dismiss() {
    const state = 'Select State'
    this.view.dismiss(state);
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CreateManagmentDevPage } from '../create-managment-dev/create-managment-dev';


@Component({
  selector: 'page-searchorcreate-management-dev',
  templateUrl: 'searchorcreate-management-dev.html',
})
export class SearchorCreateManagementDevPage {
orcreate:string;
search:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.orcreate = navParams.data.orcreate;
    this.search = navParams.data.search;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchorCreatePage');
  }
register(){
}

create(){
  this.changepage();
}
items: Array<string>;

  ngOnInit() {
    this.setItems();
  }

  setItems() {
    this.items = ['Orange', 'Banana', 'Pear', 'Tomato', 'Grape', 'Apple', 'Cherries', 'Cranberries', 'Raspberries', 'Strawberries', 'Watermelon'];
  }

  filterItems(ev: any) {
    this.setItems();
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      this.items = this.items.filter(function(item) {
        return item.toLowerCase().includes(val.toLowerCase());
      });
    }
  }

  changepage(){
    let self = this;
    if(this.orcreate == 'management'){
      self.navCtrl.push(CreateManagmentDevPage,{
      pagename :'Management'
      });
    }
    else if ( this.orcreate =='developer'){
      self.navCtrl.push(CreateManagmentDevPage,{
        pagename :'Developer'
        });
    }
  }
  onSelectChange(){}
}

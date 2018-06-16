import { Injectable } from '@angular/core';
import { Parse } from 'parse';
import { TwitterAuthProvider_Instance } from '@firebase/auth-types';

@Injectable()
export class MockProvider {
private _data =[];

  getData(): any[] {
    // return mock data synchronously
    let data: any[] = [];
    for (var i = 0; i < 20; i++) {
      data.push( this._getRandomData());
    }
    return data;
  }



  getAsyncData(): Promise<any[]> {
    // async receive mock data
    return new Promise(resolve => {

      setTimeout(() => {
        resolve(this.getData());
      }, 1000);

    });
  }


  

  private _getRandomData() {
    let self = this;
    var query = new Parse.Query("Countries");
    query.limit(1000);

    query.find({
      success: function(results) {
          
        for (let a of results) {
          self._data = a["attributes"].Name;
          console.log( "data:" , self._data)
     
         
          // console.log(i)
          // console.log(this._data);
          // 
          // for (let item = 0; item < 30; item++) {
            // console.log('data', this._data)
          // }
         
        }

        // let i = Math.floor( Math.random() * self._data.length );
        // console.log('data :' , self._data)
        return this._data;
      
      },
      error: function() {
        console.log("query failed");
      }
    });
    
  }


  
}
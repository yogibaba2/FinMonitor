import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { DataProvider } from '../../services/dataProvider.service';
import { PopoverController } from 'ionic-angular';

import { MyPopOverPage } from '../popOver/popOver';

@Component({
  selector: 'month',
  templateUrl: 'month.html',
  
})

export class MonthView {

	monthDetails : any ;
	year : String;
  tempDataProvider : DataProvider;
 	constructor(public navCtrl: NavController, private navParams: NavParams,public popoverCtrl: PopoverController, dataProvider: DataProvider) {

 		this.monthDetails = navParams.get('monthObj');
 		this.year = navParams.get('year')
    this.tempDataProvider = dataProvider;
  	}

  	presentPopover(spenditure,value) {
    var self = this;
    let popover = this.popoverCtrl.create(MyPopOverPage,{spenditure : spenditure,value:value});
    popover.present();

    popover.onDidDismiss(function(res){
      if(res!=null){
        switch(spenditure){
          case 'income' : {
            self.monthDetails.income=res;
            break;
          }
          case 'spend' : {
            self.monthDetails.spend=res;
            break;
          }
          case 'investment' : {
            self.monthDetails.investment=res;
            break;
          }
          case 'debt' : {
            self.monthDetails.debt=res;
            break;
          }
        }
      }
      self.monthDetails=self.tempDataProvider.calculateBalanceMonth(self.monthDetails);
    });
    
  }

  saveSpenditurs(obj){
    this.tempDataProvider.saveYear(obj);
    
  }

  

}

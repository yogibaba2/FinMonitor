import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { DataProvider } from '../../services/dataProvider.service';

import { MonthView } from '../month/month';

@Component({
  selector: 'year-view',
  templateUrl: 'year.html'
})

export class YearView {

	yearDetails : any ;

 	constructor(public navCtrl: NavController, private dataProvider: DataProvider,private navParams: NavParams) {

 		let yr = navParams.get('year');

 		this.yearDetails=dataProvider.getYearDetail(yr).then(data => this.yearDetails = data);
  	}

  	goToMonthPage(monthObj){
  		this.navCtrl.push(MonthView,{ monthObj: monthObj, year: this.yearDetails.year});
  	}
}

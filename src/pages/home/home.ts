import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { YearView } from '../year/year';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
	
	public years = ["2017","2018","2019","2020","2021","2022"];
	
 	constructor(public navCtrl: NavController) {};

 	goToYearPage(year){
 		this.navCtrl.push(YearView,{year:year});
 	}

}

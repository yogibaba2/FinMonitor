import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
@Component({
  selector: 'popOver',
  templateUrl: 'popOver.html',
  
})

export class MyPopOverPage {
	spenditure: String;
	spenditureObj;

  newObj = {
    amount: 0,
    comment: ""
  };
	

 	constructor(public viewCtrl: ViewController, private navParams: NavParams) {
 		this.spenditure = navParams.get('spenditure');
 		this.spenditureObj = navParams.get('value');
    console.log(this.spenditureObj);
  	}
  	/*sub(){
  		this.soenditureObj-=this.value;
      this.viewCtrl.dismiss(this.currentValue.toString());
  	}
  	add(){
  		this.currentValue=parseInt(this.currentValue)+parseInt(this.value.toString());
      this.viewCtrl.dismiss(this.currentValue.toString());
  	}*/
    addNew(){
      console.log(this.spenditureObj);
      this.spenditureObj.history.push(this.newObj);
      this.spenditureObj.total=parseInt(this.spenditureObj.total)+parseInt((this.newObj.amount).toString());
      this.viewCtrl.dismiss(this.spenditureObj);
    }

}

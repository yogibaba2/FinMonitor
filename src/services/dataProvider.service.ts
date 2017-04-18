import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { File }    from '@ionic-native/file';



import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


@Injectable()
export class DataProvider {

	private headers = new Headers({'Content-Type': 'application/json'});
	private baseUrl ; 

	public yearDetails : any;

	constructor(private http: Http, private file: File) {
      
  }

	getYearDetail(year): Promise<Object> {
	  var filexist= false;
    this.baseUrl=year+'.json';

    this.file.checkFile(this.file.externalDataDirectory,this.baseUrl)
    .then((flag) => {
      filexist=flag;
    })
    .catch(err => console.log('Directory doesnt exist'));

    if(!filexist){
      console.log('creating file');
      this.writeFile(this.baseUrl,JSON.stringify(this.getTemplate(year)));
    }

    return this.file.readAsText(this.file.externalDataDirectory, this.baseUrl)
    .then((response)=>{
      this.yearDetails=JSON.parse(response);
      return JSON.parse(response) as Object; 
    })
    .catch(this.handleError);

  }

  private handleError(error: any): Promise<any> {
	    console.error('An error occurred', error); // for demo purposes only
	    return Promise.reject(error.message || error);
	}


  calculateBalanceMonth(obj){
    obj.balance=obj.income.total-obj.spend.total-obj.investment.total+obj.debt.total;
    return obj;
  }
  calculateBalanceYear(obj){
    obj.balance=obj.income-obj.spend-obj.investment+obj.debt;
    return obj;
  }

  saveYear(obj){

  	var income=0;
  	var spend=0;
  	var investment=0;
  	var debt=0;
  	this.yearDetails.months.forEach((month, index)=>{
  		if(month.name===obj.name){
  			this.yearDetails.months[index]=month=obj;
  		}
  		income+=parseInt(month.income.total);
  		spend+=parseInt(month.spend.total);
  		investment+=parseInt(month.investment.total);
  		debt+=parseInt(month.debt.total);
  	});
  	this.yearDetails.income=income;
  	this.yearDetails.spend=spend;
  	this.yearDetails.investment=investment;
  	this.yearDetails.debt=debt;
  	this.yearDetails=this.calculateBalanceYear(this.yearDetails);
  	
    this.writeExistingFile(this.baseUrl,JSON.stringify(this.yearDetails));
    alert('Spenditure saved.');
  }

  getTemplate(year){
    var months = [{name:'jan'},{name:'feb'},{name:'mar'},{name:'apr'},{name:'may'},{name:'jun'},{name:'jul'},{name:'aug'},{name:'sep'},{name:'oct'},{name:'nov'},{name:'dec'}],
    tempYearObject={
      year : year,
      income:0,
      spend :0,
      investment:0,
      debt:0,
      balance:0,
      months : []
    };

    months.forEach((mon)=>{
      mon['income'] = {total:0,history : []};
      mon['spend'] = {total:0,history : []};
      mon['investment'] = {total:0,history : []};
      mon['debt'] = {total:0,history : []};
      mon['balance'] = 0;
      tempYearObject.months.push(mon);
    })

    return tempYearObject;
  }

  writeFile(path,data){
    this.file.writeFile(this.file.externalDataDirectory, path,data, true)
      .then(fileEntry => console.log('file created : '+path))
      .catch(err => console.log('error :'+err));
  }

  writeExistingFile(path, data){
    this.file.writeExistingFile(this.file.externalDataDirectory, path,data)
    .then(_ => console.log('file overridden :'+path))
    .catch(err => console.log('error :'+err));
  }

}
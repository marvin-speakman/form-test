import { Component } from '@angular/core';
import data from './data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent {

  
  
  groupList = [];
  groupItems = [];
  itemList = [];
  splitList = [];
  tempTotal = [];
  totalArr = [];
  
  ngOnInit() {

    const groups = (<any>data).groups;
    const items = (<any>data).items;

    for (let item in items) {
      this.itemList.push({name: item,  amount:  items[item]});
    }

   for (let group in groups) {
      for (let tempItem of groups[group] ){
        var result = this.itemList.filter(obj => {
          return obj.name === tempItem
        })
        this.groupItems.push({group: group, itemName: tempItem, itemAmount: result[0].amount})
        groups[group].amount = result[0].amount;
        // console.log(groups[group]);
      }
    }

    function groupBy(arr, property) {
      return arr.reduce(function(memo, x) {
        if (!memo[x[property]]) { memo[x[property]] = []; }
        memo[x[property]].push(x);
        return memo;
      }, {});
    }

    function getSum(total, num) {
      return total + num;
    }


    this.splitList = groupBy(this.groupItems, 'group'); // => {stationary:[...], food:[...]}

    for (let listTypes in this.splitList){
      console.log(listTypes);
      this.tempTotal = [];
      for (let values of this.splitList[listTypes] ){
        console.log(values.itemAmount);
        this.tempTotal.push(values.itemAmount)
      }
      let total = this.tempTotal.reduce((a, b) => a + b, 0);
      
      this.totalArr.push({listName: listTypes, totals: total})
      console.log(this.totalArr); // 6
    }

    // console.log(this.splitList);
    // console.log(this.itemList);
   
  }

  


  onBlurMethod(l, e){
   console.log(l + ' : ' + e);
   const inputValue = e.target.value;
   console.log(inputValue);
   var elms = document.getElementsByClassName(l)
    for (var i = 0; i < elms.length; i++) {
      if(i == 1){
        // elms[i].value(inputValue);
      }
      // if (elms[i].getAttribute("value") === "account"){
      // elms[i].setValue('0')
      // control => control.get(l).setValue('0');
      // control[l].setValue('0');
      // }
    }
  }


  title = 'Developer Test';
}
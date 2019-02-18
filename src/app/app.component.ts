import { Component } from '@angular/core';
import data from './data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  groupItems = [];
  itemList = [];
  splitList = [];
  tempTotal = [];
  totalArr = [];
  
  ngOnInit() {
    // get the list of groups and items from the json
    const groups = (<any>data).groups;
    const items = (<any>data).items;
    // create a formatted key : value version of the items data
    for (let item in items) {
      this.itemList.push({name: item,  amount:  items[item]});
    }
    // create a master version of the data that contains group - item - value
    for (let group in groups) {
      for (let tempItem of groups[group] ){
        var result = this.itemList.filter(obj => {
          return obj.name === tempItem
        })
        this.groupItems.push({group: group, itemName: tempItem, itemAmount: result[0].amount})
        groups[group].amount = result[0].amount;
      }
    }

    function groupBy(arr, property) {
      return arr.reduce(function(memo, x) {
        if (!memo[x[property]]) { memo[x[property]] = []; }
        memo[x[property]].push(x);
        return memo;
      }, {});
    }

    this.splitList = groupBy(this.groupItems, 'group'); // => {stationary:[...], food:[...]}

    for (let listTypes in this.splitList){
      this.tempTotal = [];
      for (let values of this.splitList[listTypes] ){
        this.tempTotal.push(values.itemAmount)
      }

      let total = this.tempTotal.reduce((a, b) => a + b, 0);
      this.totalArr.push({listName: listTypes, totals: total})
    }
  }

  // on blur of group textbox get the name of the group and find the elements with matching class name
  onBlurMethod(listTitle, event){
   console.log(listTitle + ' : ' + event);
   const inputValue = event.target.value;
   var elms = document.getElementsByClassName(listTitle);
   // Validation number between 0 - 999
    if (inputValue.length > 3){
      alert("Amount must be between 0 - 999");
    }else{
      // update all the values for that group
      for (var i = 0; i < elms.length; i++) {
        if(i == 0){
          elms[i].innerHTML = inputValue;
        }else{
          elms[i].innerHTML = '0';
        }
      }
    }
  }
}
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.sass']
})
export class SettingComponent implements OnInit {
  bsValue = new Date();
  term1: Date[];
  term2: Date[];
  maxDate = new Date();

  constructor() {    
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.term1 = [this.bsValue, this.maxDate];
    this.term2 = [this.bsValue, this.maxDate];
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { SystemInterface, System } from 'src/app/service/interface/system';
import { SystemService } from 'src/app/service/system.service';
import { AlertService } from 'src/app/service/alert.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.sass']
})
export class SettingComponent implements OnInit, SystemInterface {

  systemInfo: System;

  bsValue = new Date();
  term1: Date[];
  term2: Date[];
  maxDate = new Date();

  constructor(private service: SystemService,
    private alert: AlertService) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.term1 = [this.bsValue, this.maxDate];
    this.term2 = [this.bsValue, this.maxDate];
  }

  ngOnInit() {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.term1 = [this.bsValue, this.maxDate];
    this.term2 = [this.bsValue, this.maxDate];
  }

  onupdate(): void {
    this.service.insertSystemData({
      courseYear: 1,
      courseTerm1: "1",
      courseTerm2: "1"
    }).then((result) => {
      this.alert.notify(result.message);
      this.ngOnInit();
    }).catch((err) => {
      this.alert.notify(err.message);
    });
  }

}

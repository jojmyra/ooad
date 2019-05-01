import { Component, OnInit } from '@angular/core';
import { SystemInterface, System } from 'src/app/service/interface/system';
import { SystemService } from 'src/app/service/system.service';
import { AlertService } from 'src/app/service/alert.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.sass']
})
export class SettingComponent implements OnInit, SystemInterface {

  systemInfo: System;

  form: FormGroup

  bsValue = new Date();
  term1: Date[];
  term2: Date[];
  maxDate = new Date();

  constructor(private service: SystemService,
    private alert: AlertService,
    private builder: FormBuilder) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.term1 = [this.bsValue, this.maxDate];
    this.term2 = [this.bsValue, this.maxDate];
  }

  ngOnInit() {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.term1 = [this.bsValue, this.maxDate];
    this.term2 = [this.bsValue, this.maxDate];
  }

  onUpdate(f: NgForm): void {
    if (!f.valid) {
      return this.alert.someting_wrong();
    }
    this.service.insertSystemData(f.value).then((result) => {
      this.alert.notify(result.message);
    }).catch((err) => {
      this.alert.notify(err.message);
    });
  }

}

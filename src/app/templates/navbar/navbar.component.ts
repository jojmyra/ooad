import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthenticatorService } from 'src/app/authenticator.service';
import { SystemService } from 'src/app/service/system.service';
import { System } from 'src/app/service/interface/system';
declare let App;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  systemData: System

  constructor(private router: Router,
    private alert: AlertService,
    private authenticator: AuthenticatorService,
    private system: SystemService) {
    this.initialSystemData()
  }

  ngOnInit() {
  }

  onLogout() {
    this.alert.notify('ออกจากระบบสำเร็จ', 'info')
    this.authenticator.clearAuthenticated();
    this.router.navigate(['/'])
  }

  private initialSystemData() {
    this.systemData = this.system.systemData
    if (this.systemData) return setTimeout(() => App.initialLoadPage(), 100)
    this.system.getSystemData().then((result) => {
      this.system.setSystemData(result)
      this.systemData = this.system.systemData
    }).catch(() => {
      this.alert.notify('เรียกข้อมูลจากตั้งค่าระบบไม่ได้', 'info')
    });
  }

}

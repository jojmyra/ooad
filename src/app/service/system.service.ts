import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { AuthenticatorService } from '../authenticator.service';
import { SystemInput, System } from 'src/app/service/interface/system';
declare let $;

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  systemData: System

  setSystemData(systemData: System) {
    this.systemData = systemData
  }

  constructor(private http: HttpService,
    private authenticator: AuthenticatorService) {
  }

  insertSystemData(systemData: SystemInput) {
    return this.http.requestPut(`api/system`, systemData, this.authenticator.getAuthenticated())
    .toPromise() as Promise<any>
  }

  getSystemData() {
    return this.http.requestGet(`api/system`, this.authenticator.getAuthenticated())
    .toPromise() as Promise<System>
  }


}

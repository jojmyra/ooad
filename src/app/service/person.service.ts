import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpService) { }

  public personLoginDetail: ILoginDetail

  public setPersonLoginDetail(loginDetail: ILoginDetail) {
    this.personLoginDetail = loginDetail
  }

  onLogin(loginDetail: ILogin) {
    return this.http.requestPost('api/person/login', loginDetail)
      .toPromise() as Promise<{ accessToken: string }>;
  }

  getPersonLogin(accessToken: string) {
    return (this.http
      .requestGet('api/person/loginData', accessToken)
      .toPromise() as Promise<ILoginDetail>);
  }
}

interface ILogin {
  email: string;
  password: string;
  remember: boolean;
}

interface ILoginDetail {
  username: string;
  name: string;
  position: string;
}
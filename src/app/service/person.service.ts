import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { AuthenticatorService } from '../authenticator.service';
import { Item, ItemList, Search, ILogin, ILoginDetail } from 'src/app/service/interface/person.interface';
declare let $;

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  itemList: ItemList

  setItemList(itemList: ItemList) {
    this.itemList = itemList
  }

  nameList: {_id: any; fullname: any};
  setNameList(nameList: {_id: any; fullname: any}) {
    this.nameList = nameList
  }

  constructor(private http: HttpService,
    private authenticator: AuthenticatorService) { }

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

  getPersons(options?: Search) {
    return this.http.requestGet(`api/person?${$.param(options)}`, this.authenticator.getAuthenticated())
      .toPromise() as Promise<ItemList>
  }

  getProfessor() {
    return this.http.requestGet(`api/person/professor`, this.authenticator.getAuthenticated())
      .toPromise() as Promise<ItemList>
  }

  getObserver() {
    return this.http.requestGet(`api/person/observer`, this.authenticator.getAuthenticated())
    .toPromise() as Promise<ItemList>
  }

  addPerson(person: Item) {
    return this.http.requestPost(`api/person`, person, this.authenticator.getAuthenticated())
      .toPromise() as Promise<any>
  }
  
  addStudentList(person: any) {
    return this.http.requestPost(`api/person/student`, person, this.authenticator.getAuthenticated())
      .toPromise() as Promise<any>
  }

  editPerson(person: Item) {
    return this.http.requestPut(`api/person`, person, this.authenticator.getAuthenticated())
      .toPromise() as Promise<any>
  }

  deletePerson(_id: any) {
    return this.http.requestDelete(`api/person/${_id}`, this.authenticator.getAuthenticated())
      .toPromise() as Promise<any>
  }
}

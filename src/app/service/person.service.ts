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

  addPerson(person: Item) {
    return this.http.requestPost(`api/person`, person, this.authenticator.getAuthenticated())
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

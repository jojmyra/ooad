import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { AuthenticatorService } from '../authenticator.service';
import { Item, ItemList, Search } from 'src/app/service/interface/subject.interface';
declare let $;

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  itemList: ItemList

  setItemList(itemList: ItemList) {
    this.itemList = itemList
  }

  constructor(private http: HttpService,
    private authenticator: AuthenticatorService) {
  }

  getSubjects(options?: Search) {
    return this.http.requestGet(`api/subject?${$.param(options)}`, this.authenticator.getAuthenticated())
    .toPromise() as Promise<ItemList>
  }

  addSubject(subject: Item) {
    return this.http.requestPost(`api/subject`, subject, this.authenticator.getAuthenticated())
    .toPromise() as Promise<any>
  }

  deleteSubject(_id: any) {
    return this.http.requestDelete(`api/subject/${_id}`, this.authenticator.getAuthenticated())
    .toPromise() as Promise<any>
  }

  editSubject(subject: Item) {
    return this.http.requestPut(`api/subject`, subject, this.authenticator.getAuthenticated())
    .toPromise() as Promise<any>
  }

}

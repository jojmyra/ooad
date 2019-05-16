import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { AuthenticatorService } from '../authenticator.service';
import { Item, ItemList, Search } from 'src/app/service/interface/exam-interface';
declare let $;

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  itemList: ItemList

  setItemList(itemList: ItemList) {
    this.itemList = itemList
  }

  constructor(private http: HttpService,
    private authenticator: AuthenticatorService) {
  }

  getExams(options?: Search) {
    return this.http.requestGet(`api/exam?${$.param(options)}`, this.authenticator.getAuthenticated())
    .toPromise() as Promise<ItemList>
  }

  addExam(Exam: Item) {
    return this.http.requestPost(`api/exam`, Exam, this.authenticator.getAuthenticated())
    .toPromise() as Promise<any>
  }

  deleteExam(_id: any) {
    return this.http.requestDelete(`api/exam/${_id}`, this.authenticator.getAuthenticated())
    .toPromise() as Promise<any>
  }

  editExam(Exam: Item) {
    return this.http.requestPut(`api/exam`, Exam, this.authenticator.getAuthenticated())
    .toPromise() as Promise<any>
  }

}

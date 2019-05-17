import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { AuthenticatorService } from '../authenticator.service';
import { Item, ItemList } from 'src/app/service/interface/exam.interface';
declare let $;

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  examList: ItemList
  observerList: ItemList

  setExamList(itemList: ItemList) {
    this.examList = itemList
  }
  setObserverList(itemList: ItemList) {
    this.observerList = itemList
  }

  constructor(private http: HttpService,
    private authenticator: AuthenticatorService) {
  }

  getExams() {
    return this.http.requestGet(`api/exam`, this.authenticator.getAuthenticated())
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

  getExamSeat(option: {studentId: String}) {
    return this.http.requestGet(`api/exam/seat?${$.param(option)}`, this.authenticator.getAuthenticated())
    .toPromise() as Promise<any>
  }

  getObserver(option: {_id: String}) {
    return this.http.requestGet(`api/exam/seat?${$.param(option)}`, this.authenticator.getAuthenticated())
    .toPromise() as Promise<any>
  }

}

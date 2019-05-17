import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { AuthenticatorService } from '../authenticator.service';
import { Item, ItemList, Search } from 'src/app/service/interface/course.interface';
declare let $;
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  itemList: ItemList

  setItemList(itemList: ItemList) {
    this.itemList = itemList
  }

  constructor(private http: HttpService,
    private authenticator: AuthenticatorService) {
  }

  getCourse(_id: {_id: String}) {
    return this.http.requestGet(`api/course/detail/?${$.param(_id)}`, this.authenticator.getAuthenticated())
    .toPromise() as Promise<any>
  }

  getCourses(options?: Search) {
    return this.http.requestGet(`api/course?${$.param(options)}`, this.authenticator.getAuthenticated())
    .toPromise() as Promise<ItemList>
  }

  addCourse(Course: Item) {
    return this.http.requestPost(`api/course`, Course, this.authenticator.getAuthenticated())
    .toPromise() as Promise<any>
  }

  deleteCourse(_id: any) {
    return this.http.requestDelete(`api/course/${_id}`, this.authenticator.getAuthenticated())
    .toPromise() as Promise<any>
  }

  editCourse(Course: Item) {
    return this.http.requestPut(`api/course`, Course, this.authenticator.getAuthenticated())
    .toPromise() as Promise<any>
  }

  getAllSubject() {
    return this.http.requestGet(`api/course/subjectList`, this.authenticator.getAuthenticated())
    .toPromise() as Promise<any>
  }
}

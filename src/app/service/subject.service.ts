import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { AuthenticatorService } from '../authenticator.service';
import { Item, ItemList, Search, SearchKey } from 'src/app/service/interface/subject';
declare let $;

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpService,
    private authenticator: AuthenticatorService) {

  }

  getSubjects(options?: Search) {
    return this.http.requestGet(`api/subject?${$.param(options)}`, this.authenticator.getAuthenticated())
    .toPromise() as Promise<ItemList>
  }

  deleteSubject(_id: any) {
    return this.http.requestDelete(`api/subject/${_id}`, this.authenticator.getAuthenticated())
    .toPromise() as Promise<any>
  }

}

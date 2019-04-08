import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { AuthenticatorService } from '../authenticator.service';
import { Item, ItemList, Search } from 'src/app/service/interface/building.interface';
declare let $;
@Injectable({
  providedIn: 'root'
})
export class BuildingService {
  itemList: ItemList

  setItemList(itemList: ItemList) {
    this.itemList = itemList
  }

  constructor(private http: HttpService,
    private authenticator: AuthenticatorService) {
  }

  getBuildings(options?: Search) {
    return this.http.requestGet(`api/building?${$.param(options)}`, this.authenticator.getAuthenticated())
    .toPromise() as Promise<ItemList>
  }

  addBuilding(Building: Item) {
    return this.http.requestPost(`api/building`, Building, this.authenticator.getAuthenticated())
    .toPromise() as Promise<any>
  }

  deleteBuilding(_id: any) {
    return this.http.requestDelete(`api/building/${_id}`, this.authenticator.getAuthenticated())
    .toPromise() as Promise<any>
  }

  editBuilding(Building: Item) {
    return this.http.requestPut(`api/building`, Building, this.authenticator.getAuthenticated())
    .toPromise() as Promise<any>
  }
}

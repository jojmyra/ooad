import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { AuthenticatorService } from '../authenticator.service';
import { Item, ItemList, Search } from 'src/app/service/interface/room.interface';
declare let $;
@Injectable({
  providedIn: 'root'
})
export class RoomService {
  itemList: ItemList

  setItemList(itemList: ItemList) {
    this.itemList = itemList
  }

  constructor(private http: HttpService,
    private authenticator: AuthenticatorService) {
  }

  getRooms(options?: Search) {
    return this.http.requestGet(`api/room?${$.param(options)}`, this.authenticator.getAuthenticated())
    .toPromise() as Promise<ItemList>
  }

  getRoomsByBuildingId(buldingId: {buildingId: string}) {
    return this.http.requestGet(`api/room/building?${$.param(buldingId)}`, this.authenticator.getAuthenticated())
    .toPromise() as Promise<ItemList>
  }

  addRoom(Room: Item) {
    return this.http.requestPost(`api/room`, Room, this.authenticator.getAuthenticated())
    .toPromise() as Promise<any>
  }

  deleteRoom(_id: any) {
    return this.http.requestDelete(`api/room/${_id}`, this.authenticator.getAuthenticated())
    .toPromise() as Promise<any>
  }

  editRoom(Room: Item) {
    return this.http.requestPut(`api/room`, Room, this.authenticator.getAuthenticated())
    .toPromise() as Promise<any>
  }
}

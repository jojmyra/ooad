import { Component, OnInit } from '@angular/core';
import { buildingInterface, Item, ItemList, Search, SearchKey } from 'src/app/service/interface/building.interface';
import { AlertService } from 'src/app/service/alert.service';
import { BuildingService } from 'src/app/service/building.service';
import { PageChangedEvent } from 'ngx-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-building',
  templateUrl: './manager-building.component.html',
  styleUrls: ['./manager-building.component.sass']
})
export class ManagerBuildingComponent implements OnInit, buildingInterface {

  constructor(private service: BuildingService,
    private alert: AlertService,
    private route: Router) {
    this.loadSubjects({
      startPage: this.startPage,
      limitPage: this.limitPage
    })
    this.serachType = this.searchTypeItems[0];
  }

  ngOnInit() {
    this.loadSubjects({
      startPage: this.startPage,
      limitPage: this.limitPage
    })
  }

  items: ItemList;
  searchText: string;
  serachType: SearchKey;
  searchTypeItems: SearchKey[] = [
    { key: 'buildingId', value: 'ค้นหาจากชื่อย่อตึก' },
    { key: 'buildingName', value: 'ค้นหาจากชื่อตึก' }
  ];

  onSearchItem(): void {

  }

  startPage: number = 1;
  limitPage: number = 5;

  onPageChanged(page: PageChangedEvent) {
    throw new Error("Method not implemented.");
  }

  getRoleName(role: string): string {
    throw new Error("Method not implemented.");
  }

  onDelete(id: string) {
    this.service.deleteBuilding(id).then(() => {      
      this.loadSubjects({
        startPage: this.startPage,
        limitPage: this.limitPage
      })
      this.alert.notify('ลบข้อมูลสำเร็จ', 'info');
    }).catch((err) => {
      this.alert.notify(err.Message)
    });
  }

  onUpdate(_id: string): void {
    throw new Error("Method not implemented.");
  }

  openRoom(buldingId) {
    this.route.navigate([`/main/manager-room`, buldingId])
  }

  // ตรวจสอบและ return ค่า searchText
  private get getSearchText() {
    let responseSearchText = null;
    switch (this.serachType.key) {
      case 'role':
        responseSearchText = '';
        break;
      case 'updated':
        const searchDate: { from: Date, to: Date } = { from: this.searchText[0], to: this.searchText[1] } as any;
        searchDate.from.setHours(0);
        searchDate.from.setMinutes(0);
        searchDate.from.setSeconds(0);
        searchDate.to.setHours(23);
        searchDate.to.setMinutes(59);
        searchDate.to.setSeconds(59);
        responseSearchText = searchDate;
        break;
      default:
        responseSearchText = this.searchText;
        break;
    }
    return responseSearchText;
  }

  private loadSubjects(options?: Search) {
    this.service.getBuildings(options).then((result) => {
      this.items = result
      this.service.setItemList(result)
    }).catch((err) => {
      this.alert.notify(err.message)
    });
  }

  ngDoCheck(): void {
    this.items = this.service.itemList
  }
}

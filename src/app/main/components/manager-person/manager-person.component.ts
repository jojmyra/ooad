import { Component, OnInit } from '@angular/core';
import { PersonInterface, ItemList, Search, SearchKey } from 'src/app/service/interface/person.interface';
import { PageChangedEvent } from 'ngx-bootstrap';
import { PersonService } from 'src/app/service/person.service';
import { AlertService } from 'src/app/service/alert.service';
@Component({
  selector: 'app-manager-person',
  templateUrl: './manager-person.component.html',
  styleUrls: ['./manager-person.component.sass']
})
export class ManagerPersonComponent implements OnInit, PersonInterface {

  constructor(private person: PersonService,
    private alert: AlertService) {
    this.loadPersons({
      startPage: this.startPage,
      limitPage: this.limitPage
    })
    this.serachType = this.searchTypeItems[0];
  }

  ngOnInit() {
    this.loadPersons({
      startPage: this.startPage,
      limitPage: this.limitPage
    })
  }

  items: ItemList;
  searchText: string;
  serachType: SearchKey;
  searchTypeItems: SearchKey[] = [
    { key: 'personId', value: 'ค้นหาจากรหัสวิชา' },
    { key: 'personName', value: 'ค้นหาจากชื่อวิชา' }
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
    this.person.deletePerson(id).then((result) => {      
      this.loadPersons({
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

  private loadPersons(options?: Search) {
    this.person.getPersons(options).then((result) => {
      this.items = result
      this.person.setItemList(result)
      console.log(result);
      
    }).catch((err) => {
      this.alert.notify(err.message)
    });
  }

  ngDoCheck(): void {
    this.items = this.person.itemList
  }
}

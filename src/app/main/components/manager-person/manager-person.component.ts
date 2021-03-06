import { Component, OnInit, TemplateRef } from '@angular/core';
import { PersonInterface, ItemList, Search, SearchKey } from 'src/app/service/interface/person.interface';
import { PersonService } from 'src/app/service/person.service';
import { AlertService } from 'src/app/service/alert.service';
import { PageChangedEvent, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-manager-person',
  templateUrl: './manager-person.component.html',
  styleUrls: ['./manager-person.component.sass']
})
export class ManagerPersonComponent implements OnInit, PersonInterface {

  modalRef: BsModalRef;
  form: FormGroup

  constructor(private person: PersonService,
    private alert: AlertService,
    private modalService: BsModalService,
    private builder: FormBuilder) {
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
    this.startPage = page.page
    this.loadPersons({
      startPage: this.startPage,
      limitPage: this.limitPage
    })
  }

  getRoleName(role: string): string {
    throw new Error("Method not implemented.");
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  onDelete(id: string) {
    this.person.deletePerson(id).then((result) => {      
      this.loadPersons({
        startPage: this.startPage,
        limitPage: this.limitPage
      })
      this.alert.notify(result.message, 'info')
    }).catch((err) => {
      this.alert.notify(err.Message)
    });
    this.modalRef.hide();
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
    }).catch((err) => {
      this.alert.notify(err.message)
    });
  }

  ngDoCheck(): void {
    this.items = this.person.itemList
  }
}

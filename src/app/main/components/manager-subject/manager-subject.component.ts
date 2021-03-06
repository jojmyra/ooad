import { Component, OnInit, TemplateRef } from '@angular/core';
import { SubjectInterface, ItemList, Search, SearchKey } from 'src/app/service/interface/subject.interface';
import { SubjectService } from 'src/app/service/subject.service';
import { AlertService } from 'src/app/service/alert.service';
import { PageChangedEvent, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-manager-subject',
  templateUrl: './manager-subject.component.html',
  styleUrls: ['./manager-subject.component.sass']
})
export class ManagerSubjectComponent implements OnInit, SubjectInterface {

  modalRef: BsModalRef;
  form: FormGroup

  constructor(private subject: SubjectService,
    private alert: AlertService,
    private modalService: BsModalService,
    private builder: FormBuilder) {
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
    { key: 'subjectId', value: 'ค้นหาจากรหัสวิชา' },
    { key: 'subjectName', value: 'ค้นหาจากชื่อวิชา' }
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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  onDelete(id: string) {
    this.subject.deleteSubject(id).then((result) => {      
      this.loadSubjects({
        startPage: this.startPage,
        limitPage: this.limitPage
      })
      this.alert.notify('ลบข้อมูลสำเร็จ', 'info');
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

  private loadSubjects(options?: Search) {
    this.subject.getSubjects(options).then((result) => {
      this.items = result
      this.subject.setItemList(result)
    }).catch((err) => {
      this.alert.notify(err.message)
    });
  }

  ngDoCheck(): void {
    this.items = this.subject.itemList
  }

}

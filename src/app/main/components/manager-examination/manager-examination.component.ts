import { Component, OnInit, TemplateRef } from '@angular/core';
import { ExamInterface, ItemList, Search, SearchKey } from 'src/app/service/interface/exam-interface';
import { AlertService } from 'src/app/service/alert.service';
import { Router } from '@angular/router';
import { PageChangedEvent, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExamService } from 'src/app/service/exam.service';
@Component({
  selector: 'app-manager-examination',
  templateUrl: './manager-examination.component.html',
  styleUrls: ['./manager-examination.component.sass']
})
export class ManagerExaminationComponent implements OnInit, ExamInterface {

  modalRef: BsModalRef;
  form: FormGroup

  constructor(private service: ExamService,
    private alert: AlertService,
    private router: Router,
    private modalService: BsModalService,
    private builder: FormBuilder) {
    this.loadExams({
      startPage: this.startPage,
      limitPage: this.limitPage
    })
    this.serachType = this.searchTypeItems[0];
  }

  ngOnInit() {
    this.loadExams({
      startPage: this.startPage,
      limitPage: this.limitPage
    })
  }

  items: ItemList;
  searchText: string;
  serachType: SearchKey;
  searchTypeItems: SearchKey[] = [
    { key: 'serviceId', value: 'ค้นหาจากรหัสวิชา' },
    { key: 'serviceName', value: 'ค้นหาจากชื่อวิชา' }
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
    this.service.deleteExam(id).then((result) => {      
      this.loadExams({
        startPage: this.startPage,
        limitPage: this.limitPage
      })
      this.alert.notify(result.message, 'info')
    }).catch((err) => {
      this.alert.notify(err.Message)
    });
    this.modalRef.hide();
  }

  onUpdate(item): void {
    this.router.navigate(['/main/manager-exam/edit'], item)
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

  private loadExams(options?: Search) {
    this.service.getExams(options).then((result) => {
      this.items = result
      this.service.setItemList(result)
    }).catch((err) => {
      this.alert.notify(err.message)
    });
  }

  ngDoCheck(): void {
    this.items = this.service.itemList
  }

  openAdd() {
    this.router.navigate(['/main/manager-exam/add'])
  }
}

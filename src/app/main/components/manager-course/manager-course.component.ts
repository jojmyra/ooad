import { Component, OnInit, TemplateRef } from '@angular/core';
import { CourseInterface, ItemList, Search, SearchKey } from 'src/app/service/interface/course.interface';
import { CourseService } from 'src/app/service/course.service';
import { AlertService } from 'src/app/service/alert.service';
import { PageChangedEvent, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-manager-course',
  templateUrl: './manager-course.component.html',
  styleUrls: ['./manager-course.component.sass']
})
export class ManagerCourseComponent implements OnInit {
  constructor(private service: CourseService,
    private alert: AlertService,
    private modalService: BsModalService,
    private builder: FormBuilder) {
    this.loadCourses({
      startPage: this.startPage,
      limitPage: this.limitPage
    })
    this.serachType = this.searchTypeItems[0];
  }

  ngOnInit() {
    this.loadCourses({
      startPage: this.startPage,
      limitPage: this.limitPage
    })
  }

  items: ItemList;
  searchText: string;
  serachType: SearchKey;
  searchTypeItems: SearchKey[] = [
    { key: 'courseGroup', value: 'ค้นหาจากกลุ่มเรียน' },
    { key: 'professor', value: 'ค้นหาจากอาจารย์ผู้สอน' }
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
  
  modalRef: BsModalRef;
  form: FormGroup
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  onDelete(id: string) {
    this.service.deleteCourse(id).then((result) => {
      this.loadCourses({
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

  private loadCourses(options?: Search) {
    this.service.getCourses(options).then((result) => {
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

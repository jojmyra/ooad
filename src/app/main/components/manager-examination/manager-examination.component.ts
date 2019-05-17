import { Component, OnInit, TemplateRef } from '@angular/core';
import { ItemList } from 'src/app/service/interface/exam.interface';
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
export class ManagerExaminationComponent implements OnInit {

  modalRef: BsModalRef;
  form: FormGroup

  constructor(private service: ExamService,
    private alert: AlertService,
    private router: Router,
    private modalService: BsModalService,
    private builder: FormBuilder) {
    this.loadExams()
  }

  ngOnInit() {
    this.loadExams()
  }

  items: ItemList;



  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  onDelete(id: string) {
    this.service.deleteExam(id).then((result) => {      
      this.loadExams()
      this.alert.notify(result.message, 'info')
    }).catch((err) => {
      this.alert.notify(err.Message)
    });
    this.modalRef.hide();
  }

  onUpdate(item): void {
    this.router.navigate(['/main/manager-exam/edit'], item)
  }


  private loadExams() {
    this.service.getExams().then((result) => {
      this.items = result
    }).catch((err) => {
      this.alert.notify(err.message)
    });
  }

  ngDoCheck(): void {

  }

  openAdd() {
    this.router.navigate(['/main/manager-exam/add'])
  }
}

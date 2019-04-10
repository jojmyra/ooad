import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AlertService } from 'src/app/service/alert.service';
import { SubjectService } from 'src/app/service/subject.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.sass']
})
export class AddSubjectComponent implements OnInit {

  modalRef: BsModalRef;
  form: FormGroup

  constructor(private modalService: BsModalService,
    private alert: AlertService,
    private subject: SubjectService,
    private builder: FormBuilder) {
    this.initialForm();
  }

  ngOnInit(): void {

  }

  openModal(template: TemplateRef<any>) {
    this.initialForm();
    this.modalRef = this.modalService.show(template);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return this.alert.someting_wrong();
    }
    this.subject.addSubject(this.form.value).then((result) => {
      this.alert.notify(result.message, 'info')
      this.subject.getSubjects({
        startPage: 1,
        limitPage: 5
      }).then((subjectList) => {
        this.subject.setItemList(subjectList)
      }).catch((err) => {
        this.alert.notify(err.message)
      });
    }).catch((err) => {
      this.alert.notify(err.message)
    });
    this.initialForm();
    this.modalRef.hide();
  }

  onCancel(): void {
    this.modalRef.hide();
  }

  initialForm() {
    this.form = this.builder.group({
      subjectId: ['', [Validators.required]],
      subjectName: ['', [Validators.required]]
    })
  }

}

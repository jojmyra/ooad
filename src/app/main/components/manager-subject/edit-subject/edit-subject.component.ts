import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/service/alert.service';
import { SubjectService } from 'src/app/service/subject.service';

@Component({
  selector: 'app-edit-subject',
  templateUrl: './edit-subject.component.html',
  styleUrls: ['./edit-subject.component.sass']
})
export class EditSubjectComponent implements OnInit {
  modalRef: BsModalRef;
  form: FormGroup

  @Input() item: any;

  constructor(private modalService: BsModalService,
    private alert: AlertService,
    private service: SubjectService,
    private builder: FormBuilder) {
  }

  ngOnInit(): void {
  }

  openModal(template: TemplateRef<any>) {
    this.initialForm();
    this.form.setValue({
      subjectId: this.item.subjectId,
      subjectName: this.item.subjectName
    })
    this.modalRef = this.modalService.show(template);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return this.alert.someting_wrong();
    }
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

import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/service/alert.service';
import { CourseService } from 'src/app/service/course.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.sass']
})
export class EditCourseComponent implements OnInit {
  modalRef: BsModalRef;
  form: FormGroup

  @Input() item: any;

  constructor(private modalService: BsModalService,
    private alert: AlertService,
    private service: CourseService,
    private builder: FormBuilder) {
    this.initialForm();
  }

  ngOnInit(): void {
  }

  openModal(template: TemplateRef<any>) {
    this.initialForm();
    this.form.setValue({
      subjectId: this.item.subjectId,
      courseGroup: this.item.courseGroup,
      courseSeat: this.item.courseSeat,
      professor: this.item.professor
    })
    this.modalRef = this.modalService.show(template);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return this.alert.someting_wrong();
    }
    this.initialForm();
    this.modalRef.hide();
  }

  onCancel(): void {
    this.modalRef.hide();
  }

  initialForm() {
    this.form = this.builder.group({
      subjectId: ['', [Validators.required]],
      courseGroup: ['', [Validators.required]],
      courseSeat: ['', [Validators.required]],
      professor: ['', [Validators.required]],
    })
  }
}

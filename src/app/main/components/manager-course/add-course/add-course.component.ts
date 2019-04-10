import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/service/alert.service';
import { CourseService } from 'src/app/service/course.service';


@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.sass']
})
export class AddCourseComponent implements OnInit {
  modalRef: BsModalRef;
  form: FormGroup

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
    this.modalRef = this.modalService.show(template);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return this.alert.someting_wrong();
    }
    this.service.addCourse(this.form.value).then((result) => {
      this.alert.notify(result.message, 'info')
      this.service.getCourses({
        startPage: 1,
        limitPage: 5
      }).then((list) => {
        this.service.setItemList(list)
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
      subject: ['', [Validators.required]],
      courseId: ['', [Validators.required]],
      courseGroup: ['', [Validators.required]],
      courseSeat: ['', [Validators.required]],
      totalStudent: ['', [Validators.required]],
      student: ['', [Validators.required]],
      score: ['', [Validators.required]],
      professor: ['', [Validators.required]],
      courseYear: ['', [Validators.required]],
      courseTerm: ['', [Validators.required]]
    })
  }

}

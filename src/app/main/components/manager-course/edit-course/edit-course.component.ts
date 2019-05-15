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
  }

  ngOnInit(): void {
  }

  openModal(template: TemplateRef<any>) {
    this.initialForm();
    this.form.setValue({
      _id: this.item._id,
      subjectId: this.item.subjectId,
      courseGroup: this.item.courseGroup,
      courseSeat: this.item.courseSeat,
      professor: this.item.professor
    })
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return this.alert.someting_wrong();
    }
    this.service.editCourse(this.form.value).then((result) => {
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
    this.modalRef.hide();
  }

  onCancel(): void {
    this.modalRef.hide();
  }

  initialForm() {
    this.form = this.builder.group({
      _id: '',
      subjectId: ['', [Validators.required]],
      courseGroup: ['', [Validators.required]],
      courseSeat: ['', [Validators.required]],
      professor: ['', [Validators.required]],
    })
  }
}

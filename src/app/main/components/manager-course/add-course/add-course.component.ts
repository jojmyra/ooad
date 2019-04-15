import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService, TypeaheadMatch } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/service/alert.service';
import { CourseService } from 'src/app/service/course.service';
import { SubjectService } from 'src/app/service/subject.service';


@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.sass']
})
export class AddCourseComponent implements OnInit {
  modalRef: BsModalRef;
  form: FormGroup;
  subjectList: any[];
  subjectName: string

  constructor(private modalService: BsModalService,
    private alert: AlertService,
    private service: CourseService,
    private subject: SubjectService,
    private builder: FormBuilder) {
    this.initialForm();
  }

  ngOnInit(): void {
    
  }

  typeaheadOnSelect(e: TypeaheadMatch): void {
    this.subjectName = e.item.subjectName;
  }

  openModal(template: TemplateRef<any>) {
    this.initialForm();
    this.subjectName = null
    this.modalRef = this.modalService.show(template);
    this.modalRef.setClass('modal-lg')
    this.subject.getSubjects({
      startPage: 1,
      limitPage: 5
    }).then((result) => {
      this.subject.setItemList(result);
    }).catch((err) => {
      this.alert.notify(err)
    }).finally(() => {
      this.subjectList = this.subject.itemList.items
    })
    
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
      subjectId: ['', [Validators.required]],
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

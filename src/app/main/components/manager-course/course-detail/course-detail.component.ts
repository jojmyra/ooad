import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/service/alert.service';
import { CourseService } from 'src/app/service/course.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PersonService } from 'src/app/service/person.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.sass']
})
export class CourseDetailComponent implements OnInit {

  courseId: string;
  courseDetail: any;

  modalRef: BsModalRef;
  formStudent: FormGroup;
  formProfessor: FormGroup;

  professorList: any;
  professor: any;
  
  constructor(private service: CourseService,
    private person: PersonService,
    private route: ActivatedRoute,
    private alert: AlertService,
    private modalService: BsModalService,
    private builder: FormBuilder) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.courseId = params.get("courseId");
    });
    this.formStudent = this.builder.group({
      _id: this.courseId,
      studentId: ['', [Validators.required]]
    })
    this.formProfessor = this.builder.group({
      _id: this.courseId,
      professorId: ['', [Validators.required]]
    })
    this.loadCourseDetail()
  }

  private loadCourseDetail() {
    var _id = {
      _id: this.courseId
    }
    this.service.getCourse(_id).then((result) => {
      this.courseDetail = result
    }).catch((err) => {
      this.alert.someting_wrong()
    });
  }
  
  openModal(template: TemplateRef<any>) {
    this.loadProfessor()
    this.formProfessor.setValue({_id: this.courseId,professorId: ''})
    this.formStudent.setValue({_id: this.courseId,studentId: ''})
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  onAddStudent():void {
    if (this.formStudent.invalid) {
      return this.alert.someting_wrong();
    }
    this.service.addStudentToCourse(this.formStudent.value).then((result) => {
      this.loadCourseDetail();
      this.alert.notify(result.message, 'info');
    }).catch((err) => {
      this.alert.someting_wrong();
    });
    this.modalRef.hide();
  }

  onAddProfessor():void {
    if (this.formProfessor.invalid) {
      return this.alert.someting_wrong();
    }
    this.service.addProfessorToCourse(this.formProfessor.value).then((result) => {
      this.loadCourseDetail();
      this.alert.notify(result.message, 'info');
    }).catch((err) => {
      this.alert.someting_wrong();
    });
    this.modalRef.hide();
  }

  private loadProfessor() {
    this.person.getProfessor().then((result) => {
      this.professorList = result
    }).catch((err) => {
      this.alert.notify(err)
    })
  }

  public selected(value: any): void {
    this.formProfessor.value.professorId = value.item._id
  }

}

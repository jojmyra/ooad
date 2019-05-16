import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService, TypeaheadMatch } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertService } from 'src/app/service/alert.service';
import { CourseService } from 'src/app/service/course.service';
import { SubjectService } from 'src/app/service/subject.service';
import * as XLSX from 'xlsx';
import { SystemService } from 'src/app/service/system.service';
import { PersonService } from 'src/app/service/person.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.sass']
})
export class AddCourseComponent implements OnInit {

  modalRef: BsModalRef;
  form: FormGroup;

  subjectList: any[];
  subjectName: string;

  professor: any[] = new Array();
  professorList: any;

  constructor(private modalService: BsModalService,
    private alert: AlertService,
    private service: CourseService,
    private subject: SubjectService,
    private builder: FormBuilder,
    private person: PersonService,
    private system: SystemService) {
    this.loadProfessor();
  }

  ngOnInit(): void {

  }

  typeaheadOnSelect(e: TypeaheadMatch): void {
    this.subjectName = e.item.subjectName;
  }

  openModal(template: TemplateRef<any>) {
    this.initialForm();
    this.subjectName = null
    this.modalRef = this.modalService.show(template, { class: "modal-lg" });
    this.subject.getSubjects({
      startPage: 1,
      limitPage: 5
    }).then((result) => {
      this.subject.setItemList(result);
    }).catch((err) => {
      this.alert.notify(err)
    }).finally(() => {
      this.subjectList = this.subject.itemList.items
      console.log(this.subjectList);
      
    })
    this.loadProfessor()
  }

  private loadProfessor() {
    this.person.getProfessor().then((result) => {
      this.professorList = result
    }).catch((err) => {
      this.alert.notify(err)
    })
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return this.alert.someting_wrong();
    }
    if (!this.listStudentId) {
      console.log("listStudentId");
      return this.alert.someting_wrong();
    }
    if (!this.professor) {
      console.log("professor");
      return this.alert.someting_wrong();
    }
    this.form.value.professor = this.professor
    this.form.value.subjectName = this.subjectName
    this.form.value.year = this.system.systemData.year
    this.form.value.term = this.system.systemData.term
    this.form.value.student = this.listStudentId;
    this.form.value.totalStudent = this.listStudentId.length
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
      this.alert.someting_wrong()
    });
    this.modalRef.hide();
  }

  onCancel(): void {
    this.modalRef.hide();
  }

  initialForm() {
    this.listStudentId = null;
    this.form = this.builder.group({
      subjectId: ['', [Validators.required]],
      subjectName: [''],
      courseGroup: ['', [Validators.required]],
      courseSeat: ['', [Validators.required]],
      professor: [''],
      student: [''],
      totalStudent: [''],
      score: [''],
      year: [''],
      term: ['']
    })
  }

  arrayBuffer: any;
  file: File;
  listStudentId: any = null;

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsArrayBuffer(file)
      reader.onload = () => {
        this.arrayBuffer = reader.result
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i) {
          arr[i] = String.fromCharCode(data[i]);
        }
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, { type: "binary" });
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        var listStudent = XLSX.utils.sheet_to_json(worksheet, { raw: true, header: ["id", "studentName"] });
        listStudent.shift()
        this.listStudentId = listStudent.map(({ id }) => id)
      };
    }
  }

  public selected(value: any): void {
    this.professor.push(value)
  }

  public removed(value: any): void {
    delete this.professor[value.index]
  }

}

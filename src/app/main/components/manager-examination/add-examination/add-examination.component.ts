import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/service/course.service';
import { SubjectService } from 'src/app/service/subject.service';
import { BuildingService } from 'src/app/service/building.service';
import { RoomService } from 'src/app/service/room.service';
import { PersonService } from 'src/app/service/person.service';
import { AlertService } from 'src/app/service/alert.service';
import { TypeaheadMatch } from 'ngx-bootstrap';
@Component({
  selector: 'app-add-examination',
  templateUrl: './add-examination.component.html',
  styleUrls: ['./add-examination.component.sass']
})
export class AddExaminationComponent implements OnInit {
  subjectList: any[];
  buildingList: any[];

  subjectSelected: any;
  buildingSelected: any;

  constructor(private service: CourseService,
    private subject: SubjectService,
    private course: CourseService,
    private building: BuildingService,
    private room: RoomService,
    private person: PersonService,
    private alert: AlertService) { }

  ngOnInit() {
    this.course.getAllSubject().then((result) => {
      this.subjectList = result
    }).catch((err) => {
      this.alert.notify(err.message)
    });
    this.room.getAllBuilding().then((result) => {
      console.log(result);
      this.buildingList = result
    }).catch((err) => {
      this.alert.notify(err.message)
    });
  }

  selectSubject(e: TypeaheadMatch) {
    this.subjectSelected = e.item
    console.log(this.subjectSelected);
  }
  selectBuilding(e: TypeaheadMatch) {
    this.buildingSelected = e.item
    console.log(this.buildingSelected)
  }
}

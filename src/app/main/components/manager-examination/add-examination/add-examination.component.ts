import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/service/course.service';
import { SubjectService } from 'src/app/service/subject.service';
import { BuildingService } from 'src/app/service/building.service';
import { RoomService } from 'src/app/service/room.service';
import { PersonService } from 'src/app/service/person.service';
import { AlertService } from 'src/app/service/alert.service';
import { TypeaheadMatch } from 'ngx-bootstrap';
import * as moment from 'moment';
import { ExamService } from 'src/app/service/exam.service';
import { Router } from '@angular/router';
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

  selectCourse: any;
  selectRoom: any;

  constructor(private service: ExamService,
    private router: Router,
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

  onAdd(form) {
    if (form.form.invalid){
      return this.alert.someting_wrong();
    }
    if (!this.selectCourse) {
      return this.alert.notify('กรุณาเลือกกลุ่มเรียนที่ต้องการจัดสอบ')
    }
    if (!this.selectRoom) {
      return this.alert.notify('กรุณาเลือกห้องที่ต้องการจัดสอบ')
    }
    
      
    // Get data preparing for insert to database
    var studentWithSeat = []
    var student = this.subjectSelected.student[this.selectCourse];
    var totalStudent = this.subjectSelected.totalStudent[this.selectCourse];
    var roomSeat = this.buildingSelected.roomSeat[this.selectRoom];
    var roomSeatMax = this.buildingSelected.roomSeatMax[this.selectRoom];
    var roomSeatRow = this.buildingSelected.roomSeatRow[this.selectRoom];
    var numRow = Math.ceil(totalStudent / roomSeatRow);

    // เช็คเพื่อดูว่าที่นั่งพอจำนวนนักเรียนหรือไม่
    if (roomSeatMax < totalStudent) {
      return this.alert.notify('ที่นั่งไม่พอจำนวนนักเรียน')
    }
    
    // Loop make array of object
    var count = 0;
    for (let i = 0; i < numRow; i++) {
      for (let j = 0; j < roomSeatRow; j++) {
        studentWithSeat.push({
          studentId: student[count],
          roomSeat: roomSeat[i][j]
        })
        count++;
        if (count === totalStudent)  break;
      }
    }
    // แก้ input ของวัน และเพิ่มคอสและห้องลงในข้อมูล
    form.form.value.examDate = `${form.form.value.examDate.getMonth()}/${form.form.value.examDate.getDate()}/${form.form.value.examDate.getFullYear()}`
    form.form.value.courseGroup = this.subjectSelected.course[this.selectCourse]
    form.form.value.roomName = this.buildingSelected.room[this.selectRoom]
    form.form.value.seat = studentWithSeat

    this.service.addExam(form.form.value).then((result) => {
      this.alert.notify(result.message)
      this.router.navigate([`/main/manager-exam`])
    }).catch((err) => {
      this.alert.someting_wrong()
    });
  }
}

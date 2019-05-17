import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamService } from 'src/app/service/exam.service';
import { AlertService } from 'src/app/service/alert.service';

@Component({
  selector: 'app-exam-detail',
  templateUrl: './exam-detail.component.html',
  styleUrls: ['./exam-detail.component.sass']
})
export class ExamDetailComponent implements OnInit {

  examId: string;
  examDetail: any;

  constructor(private service: ExamService,
    private route: ActivatedRoute,
    private alert: AlertService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.examId = params.get("examId");
    });
    this.loadExam()
  }

  private loadExam() {
    var _id = {
      _id: this.examId
    }
    this.service.getExam(_id).then((result) => {
      this.examDetail = result
      console.log(this.examDetail);

    }).catch((err) => {
      this.alert.someting_wrong()
    });
  }
  
}

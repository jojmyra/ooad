import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/service/alert.service';
import { CourseService } from 'src/app/service/course.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.sass']
})
export class CourseDetailComponent implements OnInit {

  courseId: string;
  courseDetail: any;

  constructor(private service: CourseService,
    private route: ActivatedRoute,
    private alert: AlertService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.courseId = params.get("courseId");
    });
    this.loadCourseDetail()
  }

  private loadCourseDetail() {
    var _id = {
      _id: this.courseId
    }
    this.service.getCourse(_id).then((result) => {
      this.courseDetail = result
      console.log(this.courseDetail);
    }).catch((err) => {
      this.alert.someting_wrong()
    });
  }

}

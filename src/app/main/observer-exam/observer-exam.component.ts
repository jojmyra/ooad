import { Component, OnInit } from '@angular/core';
import { ExamService } from 'src/app/service/exam.service';
import { PersonService } from 'src/app/service/person.service';
import { ILoginDetail } from 'src/app/service/interface/person.interface';
import { AlertService } from 'src/app/service/alert.service';
import { ItemList } from 'src/app/service/interface/exam.interface';
import { Router } from '@angular/router';
import { AuthenticatorService } from 'src/app/authenticator.service';
declare let App;

@Component({
  selector: 'app-observer-exam',
  templateUrl: './observer-exam.component.html',
  styleUrls: ['./observer-exam.component.sass']
})
export class ObserverExamComponent implements OnInit {
  items: ItemList;
  personLoginDetail: ILoginDetail

  constructor(private service: ExamService,
    private person: PersonService,
    private alert: AlertService,
    private authenticator: AuthenticatorService,
    private router: Router) {     
      this.initial()  
    }

  ngOnInit() {
    this.initial()
  }

  private initial() {
    this.personLoginDetail = this.person.personLoginDetail
    if (this.personLoginDetail) {
      this.loadExams()
      return setTimeout(() => App.initialLoadPage(), 200)
    }
    this.person.getPersonLogin(this.authenticator.getAuthenticated())
    .then(personLogin => {
      this.person.setPersonLoginDetail(personLogin)
      this.personLoginDetail = personLogin
      this.loadExams()
      setTimeout(() => App.initialLoadPage(), 100)
    }).catch((err) => {
      this.alert.notify(err.message);
      this.authenticator.clearAuthenticated();
      this.router.navigate(['/'])
    });
  }

  private loadExams() {
    var _id = {
      _id: this.personLoginDetail._id
    }
    this.service.getObserver(_id).then((result) => {
      this.items = result
      this.service.setObserverList(result)
    }).catch((err) => {
      this.alert.someting_wrong();
    });
  }

  ngDoCheck(): void {
    this.items = this.service.observerList
  }

}

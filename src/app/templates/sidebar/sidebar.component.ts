import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/service/alert.service';
import { PersonService } from 'src/app/service/person.service';
import { AuthenticatorService } from 'src/app/authenticator.service';
declare let App;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {

  personLoginDetail

  constructor(private router: Router,
    private alert: AlertService,
    private personService: PersonService,
    private authenticator: AuthenticatorService) {
    this.initialPersonLogin()
  }

  ngOnInit() {
  }

  private initialPersonLogin() {
    this.personLoginDetail = this.personService.personLoginDetail
    if (this.personLoginDetail.username) return setTimeout(() => App.initialLoadPage(), 100)

    this.personService.getPersonLogin(this.authenticator.getAuthenticated())
      .then(personLogin => {
        this.personLoginDetail = personLogin
        setTimeout(() => App.initialLoadPage(), 100)
      }).catch((err) => {
        // console.log(err);
        // this.alert.notify(err.message);
        // this.authenticator.clearAuthenticated();
        // this.router.navigate(['/'])
      });
  }

}

interface ILoginDetail {
  username: string;
  name: string;
  position: string;
}
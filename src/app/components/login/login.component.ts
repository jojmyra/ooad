import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../service/alert.service';
import { PersonService } from '../../service/person.service';
import { AuthenticatorService } from '../../authenticator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private builder: FormBuilder,
    private alert: AlertService,
    private service: PersonService,
    private authenticator: AuthenticatorService,
    private router: Router) { 
    this.initialCreateFormData();
  }

  ngOnInit() {
  }

  onSubmit(): void{
    if (this.form.invalid) {
      return this.alert.someting_wrong();
    } else {      
      this.service.onLogin(this.form.value).then((result) => {
        this.authenticator.setAuthenticated(result.accessToken)
        this.alert.notify('เข้าสู่ระบบสำเร็จ', 'info')
        this.router.navigate(['/main'])
      }).catch((err) => {
        this.alert.notify(err.Message);
      });
    }
  }

  // สร้างฟอร์ม
  private initialCreateFormData(): void{
    this.form = this.builder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      remember: [true]
    });
  }
}

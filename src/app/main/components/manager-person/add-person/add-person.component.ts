import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/service/alert.service';
import { RoomService } from 'src/app/service/room.service';
import { ActivatedRoute } from '@angular/router';
import { PersonService } from 'src/app/service/person.service';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.sass']
})
export class AddPersonComponent implements OnInit {
  modalRef: BsModalRef;
  form: FormGroup

  constructor(private modalService: BsModalService,
    private alert: AlertService,
    private service: PersonService,
    private builder: FormBuilder, ) {
    this.initialForm();
  }

  ngOnInit(): void {

  }

  openModal(template: TemplateRef<any>) {
    this.initialForm();
    this.modalRef = this.modalService.show(template);
    this.modalRef.setClass('modal-lg')
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return this.alert.someting_wrong();
    }
    this.service.addPerson(this.form.value).then((result) => {
      this.alert.notify(result.message, 'info')
      this.service.getPersons({
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
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      status: ['', [Validators.required]]
    })
  }

}

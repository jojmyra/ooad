import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-delete-examination',
  templateUrl: './delete-examination.component.html',
  styleUrls: ['./delete-examination.component.sass']
})
export class DeleteExaminationComponent implements OnInit {

  @Input()
  modalRef: BsModalRef;
  message: string;
  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
 
  confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef.hide();
  }
 
  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }
}

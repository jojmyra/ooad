import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/service/alert.service';
import { RoomService } from 'src/app/service/room.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.sass']
})
export class AddRoomComponent implements OnInit {
  subscribeBuildingParam: string;
  modalRef: BsModalRef;
  form: FormGroup

  constructor(private modalService: BsModalService,
    private alert: AlertService,
    private service: RoomService,
    private builder: FormBuilder,
    private route: ActivatedRoute) {
    this.initialForm();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.subscribeBuildingParam = params.get("buildingId");
    });
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
    this.service.addRoom(this.form.value).then((result) => {
      this.alert.notify(result.message, 'info')
      this.service.getRooms({
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
      buildingId: ['', [Validators.required]],
      roomName: ['', [Validators.required]],
      roomType: ['', [Validators.required]],
      roomFloor: ['', [Validators.required]],
      roomSeat: ['', [Validators.required]],
      roomplan: ['', [Validators.required]]
    })
  }

  ngOnDestroy(): void {

  }
  
}

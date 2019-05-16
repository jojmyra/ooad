import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/service/alert.service';
import { RoomService } from 'src/app/service/room.service';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.sass']
})
export class EditRoomComponent implements OnInit {
  modalRef: BsModalRef;
  form: FormGroup

  @Input() item: any;
  @Input() buildingParam: any;

  constructor(private modalService: BsModalService,
    private alert: AlertService,
    private service: RoomService,
    private builder: FormBuilder) {
  }

  ngOnInit(): void {
  }

  openModal(template: TemplateRef<any>) {
    this.initialForm();
    this.form.setValue({
      _id: this.item._id,
      roomName: this.item.roomName,
      roomType: this.item.roomType,
      roomFloor: this.item.roomFloor,
      roomSeatMax: this.item.roomSeatMax,
      roomSeatRow: this.item.roomSeatRow
    })
    this.modalRef = this.modalService.show(template, {class: "modal-lg"});
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return this.alert.someting_wrong();
    }
    this.service.editRoom(this.form.value).then((result) => {
      this.alert.notify(result.message, 'info')
      this.service.getRoomsByBuildingId({
        buildingId: this.buildingParam
      }).then((list) => {
        this.service.setItemList(list)
      }).catch((err) => {
        this.alert.notify(err.message)
      });
    }).catch((err) => {
      this.alert.someting_wrong();
    });
    this.modalRef.hide();
  }

  onCancel(): void {
    this.modalRef.hide();
  }

  initialForm() {
    this.form = this.builder.group({
      _id: '',
      roomName: ['', [Validators.required]],
      roomType: ['', [Validators.required]],
      roomFloor: ['', [Validators.required]],
      roomSeatMax: ['', [Validators.required]],
      roomSeatRow: ['', [Validators.required]]
    })
  }

}

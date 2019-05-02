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
  buildingId: string;
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
      this.buildingId = params.get("buildingId");
    });
  }

  openModal(template: TemplateRef<any>) {
    this.initialForm();
    this.modalRef = this.modalService.show(template);
    this.modalRef.setClass('modal-lg')
  }

  getAlphabet(num) {
    var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return str.charAt(num)
  }

  getRoomSeat() {
    var roomSeat = []
    var roomSeatMax = this.form.value.roomSeatMax
    var roomSeatRow = this.form.value.roomSeatRow
    var numRow = Math.ceil(roomSeatMax / roomSeatRow)
    var over = roomSeatMax % roomSeatRow
    for (let index = 0; index < numRow; index++) {
      var array = []
      var alphabet = this.getAlphabet(index)
      for (let row = 0; row < roomSeatRow; row++) {
        if (index == numRow - 1 && over > 0) {
          if (row == over) break
        }
        array.push(alphabet + row)
      }
      roomSeat.push(array)
    }
    return roomSeat
  }

  onSubmit(): void {
    this.form.value.roomSeat = this.getRoomSeat()
    this.form.value.buildingId = this.buildingId
    if (this.form.invalid) {
      return this.alert.someting_wrong();
    }
    this.service.addRoom(this.form.value).then((result) => {
      this.alert.notify(result.message, 'info')
      this.service.getRoomsByBuildingId({ buildingId: this.buildingId }).then((list) => {
        this.service.setItemList(list)
      }).catch((err) => {
        this.alert.notify(err.message)
      });
    }).catch((err) => {
      this.alert.notify(err.message)
    });
    this.modalRef.hide();
  }

  onCancel(): void {
    this.modalRef.hide();
  }

  initialForm() {
    this.form = this.builder.group({
      buildingId: [],
      roomName: ['', [Validators.required]],
      roomType: ['', [Validators.required]],
      roomFloor: ['', [Validators.required]],
      roomSeat: [],
      roomSeatMax: ['', [Validators.required]],
      roomSeatRow: ['', [Validators.required]]
    })
  }

  ngOnDestroy(): void {

  }

}

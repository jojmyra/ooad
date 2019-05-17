import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RoomInterface, ItemList, Search, SearchKey } from 'src/app/service/interface/room.interface';
import { RoomService } from 'src/app/service/room.service';
import { AlertService } from 'src/app/service/alert.service';
import { PageChangedEvent, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-manager-room',
  templateUrl: './manager-room.component.html',
  styleUrls: ['./manager-room.component.sass']
})
export class ManagerRoomComponent implements OnInit {

  modalRef: BsModalRef;
  form: FormGroup
  subscribeBuildingParam: string;

  constructor(private service: RoomService,
    private alert: AlertService,
    private route: ActivatedRoute,
    private modalService: BsModalService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.subscribeBuildingParam = params.get("buildingId");
    });
    this.loadRooms({ buildingId: this.subscribeBuildingParam })
  }

  items: ItemList;


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  onDelete(id: string) {
    this.service.deleteRoom(id).then((result) => {
      this.loadRooms({ buildingId: this.subscribeBuildingParam })
      this.alert.notify('ลบข้อมูลสำเร็จ', 'info');
    }).catch((err) => {
      this.alert.notify(err.Message)
    });
    this.modalRef.hide();
  }

  onUpdate(_id: string): void {
    throw new Error("Method not implemented.");
  }


  private loadRooms(buildingId) {
    this.service.getRoomsByBuildingId(buildingId).then((result) => {
      this.items = result
      this.service.setItemList(result)
    }).catch((err) => {
      this.alert.notify(err.message)
    });
  }

  ngDoCheck(): void {
    this.items = this.service.itemList
  }

  ngOnDestroy(): void {
    this.items.items = null
    this.items.totalItems = 0
  }

}

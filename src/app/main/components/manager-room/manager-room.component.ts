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
export class ManagerRoomComponent implements OnInit, RoomInterface {

  modalRef: BsModalRef;
  form: FormGroup
  subscribeBuildingParam: string;

  constructor(private service: RoomService,
    private alert: AlertService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private builder: FormBuilder) {
    this.serachType = this.searchTypeItems[0];
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.subscribeBuildingParam = params.get("buildingId");
    });
    this.loadRooms({ buildingId: this.subscribeBuildingParam })
  }

  items: ItemList;
  searchText: string;
  serachType: SearchKey;
  searchTypeItems: SearchKey[] = [
    { key: 'roomType', value: 'ค้นหาจากประเภทตึก' },
    { key: 'roomFloor', value: 'ค้นหาจากชั้นของตึก' }
  ];

  onSearchItem(): void {

  }

  startPage: number = 1;
  limitPage: number = 5;

  onPageChanged(page: PageChangedEvent) {
    throw new Error("Method not implemented.");
  }

  getRoleName(role: string): string {
    throw new Error("Method not implemented.");
  }

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

  // ตรวจสอบและ return ค่า searchText
  private get getSearchText() {
    let responseSearchText = null;
    switch (this.serachType.key) {
      case 'role':
        responseSearchText = '';
        break;
      case 'updated':
        const searchDate: { from: Date, to: Date } = { from: this.searchText[0], to: this.searchText[1] } as any;
        searchDate.from.setHours(0);
        searchDate.from.setMinutes(0);
        searchDate.from.setSeconds(0);
        searchDate.to.setHours(23);
        searchDate.to.setMinutes(59);
        searchDate.to.setSeconds(59);
        responseSearchText = searchDate;
        break;
      default:
        responseSearchText = this.searchText;
        break;
    }
    return responseSearchText;
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

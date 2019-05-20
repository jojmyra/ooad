import { Router } from '@angular/router';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { buildingInterface, Item, ItemList, Search, SearchKey } from 'src/app/service/interface/building.interface';
import { AlertService } from 'src/app/service/alert.service';
import { BuildingService } from 'src/app/service/building.service';
import { PageChangedEvent, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-manager-building',
  templateUrl: './manager-building.component.html',
  styleUrls: ['./manager-building.component.sass']
})
export class ManagerBuildingComponent implements OnInit, buildingInterface {

  modalRef: BsModalRef;
  form: FormGroup
  
  constructor(private service: BuildingService,
    private alert: AlertService,
    private route: Router,
    private modalService: BsModalService,
    private builder: FormBuilder) {
    this.serachType = this.searchTypeItems[0];
    this.initialForm();
  }

  ngOnInit() {
    this.loadBuildings({
      startPage: this.startPage,
      limitPage: this.limitPage
    })
  }

  items: ItemList;
  searchText: string;
  serachType: SearchKey;
  searchTypeItems: SearchKey[] = [
    { key: 'buildingId', value: 'ค้นหาจากชื่อย่อตึก' },
    { key: 'buildingName', value: 'ค้นหาจากชื่อตึก' }
  ];

  onSearchItem(): void {

  }

  startPage: number = 1;
  limitPage: number = 10;

  onPageChanged(page: PageChangedEvent) {

  }

  getRoleName(role: string): string {
    throw new Error("Method not implemented.");
  }
  
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  initialForm() {
    this.form = this.builder.group({
      buildingId: ['', [Validators.required]],
      buildingName: ['', [Validators.required]]
    })
  }

  onAdd(): void {
    if (this.form.invalid) {
      return this.alert.someting_wrong();
    }
    this.service.addBuilding(this.form.value).then((result) => {
      this.alert.notify(result.message, 'info')
      this.loadBuildings({
        startPage: this.startPage,
        limitPage: this.limitPage
      })
    }).catch((err) => {
      this.alert.someting_wrong()
    });
    this.initialForm();
    this.modalRef.hide();
  }

  onDelete(id: string) {
    this.service.deleteBuilding(id).then(() => {      
      this.alert.notify('ลบข้อมูลสำเร็จ', 'info');
      this.loadBuildings({
        startPage: this.startPage,
        limitPage: this.limitPage
      })
    }).catch((err) => {
      this.alert.notify(err.Message)
    });
    this.modalRef.hide();
  }

  onUpdate(_id: string): void {
    throw new Error("Method not implemented.");
  }

  openRoom(buldingId) {
    this.route.navigate([`/main/manager-room`, buldingId])
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

  private loadBuildings(options?: Search) {
    this.service.getBuildings(options).then((result) => {
      this.items = result
      this.service.setItemList(result)
    }).catch((err) => {
      this.alert.notify(err.message)
    });
  }

  ngDoCheck(): void {
    this.items = this.service.itemList
  }
}

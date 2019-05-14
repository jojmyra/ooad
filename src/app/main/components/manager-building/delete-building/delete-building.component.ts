import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BuildingService } from 'src/app/service/building.service';
import { AlertService } from 'src/app/service/alert.service';
@Component({
  selector: 'app-delete-building',
  templateUrl: './delete-building.component.html',
  styleUrls: ['./delete-building.component.sass']
})
export class DeleteBuildingComponent implements OnInit {
  @Input()
  _id: any;

  modalRef: BsModalRef;
  message: String;
  
  constructor(private modalService: BsModalService,
    private service: BuildingService,
    private alert: AlertService) { }

  ngOnInit() {
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
 
  confirm(): void {
    this.service.deleteBuilding(this._id).then((result) => {      
      this.alert.notify(result.message, 'info')
      this.service.getBuildings({
        startPage: 1,
        limitPage: 5
      }).then((list) => {
        this.service.setItemList(list)
      }).catch((err) => {
        this.alert.notify(err.message)
      });
    }).catch((err) => {
      this.alert.notify(err.Message)
    });
    this.modalRef.hide();
  }
 
  decline(): void {
    this.modalRef.hide();
  }

}

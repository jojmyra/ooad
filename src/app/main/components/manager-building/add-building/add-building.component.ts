import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/service/alert.service';
import { BuildingService } from 'src/app/service/building.service';

@Component({
  selector: 'app-add-building',
  templateUrl: './add-building.component.html',
  styleUrls: ['./add-building.component.sass']
})
export class AddBuildingComponent implements OnInit {

  modalRef: BsModalRef;
  form: FormGroup

  constructor(private modalService: BsModalService,
    private alert: AlertService,
    private service: BuildingService,
    private builder: FormBuilder) {
    this.initialForm();
  }

  ngOnInit(): void {

  }

  openModal(template: TemplateRef<any>) {
    this.initialForm();
    this.modalRef = this.modalService.show(template);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return this.alert.someting_wrong();
    }
    this.service.addBuilding(this.form.value).then((result) => {
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
      this.alert.someting_wrong()
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
      buildingName: ['', [Validators.required]]
    })
  }
}

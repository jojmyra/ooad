import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/service/alert.service';
import { BuildingService } from 'src/app/service/building.service';

@Component({
  selector: 'app-edit-building',
  templateUrl: './edit-building.component.html',
  styleUrls: ['./edit-building.component.sass']
})
export class EditBuildingComponent implements OnInit {

  modalRef: BsModalRef;
  form: FormGroup

  @Input() item: any;

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
    this.form.setValue({
      buildingId: this.item.buildingId,
      buildingName: this.item.buildingName
    })
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
      buildingId: [''],
      buildingName: ['', [Validators.required]]
    })
  }
}

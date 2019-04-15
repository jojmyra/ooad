import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerExaminationComponent } from './manager-examination.component';

describe('ManagerExaminationComponent', () => {
  let component: ManagerExaminationComponent;
  let fixture: ComponentFixture<ManagerExaminationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerExaminationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

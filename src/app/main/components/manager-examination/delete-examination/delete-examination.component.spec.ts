import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteExaminationComponent } from './delete-examination.component';

describe('DeleteExaminationComponent', () => {
  let component: DeleteExaminationComponent;
  let fixture: ComponentFixture<DeleteExaminationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteExaminationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerSubjectComponent } from './manager-subject.component';

describe('ManagerSubjectComponent', () => {
  let component: ManagerSubjectComponent;
  let fixture: ComponentFixture<ManagerSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

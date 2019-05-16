import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObserverExamComponent } from './observer-exam.component';

describe('ObserverExamComponent', () => {
  let component: ObserverExamComponent;
  let fixture: ComponentFixture<ObserverExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObserverExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObserverExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

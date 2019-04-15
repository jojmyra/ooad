import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerPersonComponent } from './manager-person.component';

describe('ManagerPersonComponent', () => {
  let component: ManagerPersonComponent;
  let fixture: ComponentFixture<ManagerPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

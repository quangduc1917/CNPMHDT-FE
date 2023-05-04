import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerNotifyComponent } from './manager-notify.component';

describe('ManagerNotifyComponent', () => {
  let component: ManagerNotifyComponent;
  let fixture: ComponentFixture<ManagerNotifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerNotifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerNotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

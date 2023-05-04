import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerStatisticalComponent } from './manager-statistical.component';

describe('ManagerStatisticalComponent', () => {
  let component: ManagerStatisticalComponent;
  let fixture: ComponentFixture<ManagerStatisticalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerStatisticalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerStatisticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

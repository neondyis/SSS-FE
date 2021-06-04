import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairDashComponent } from './repair-dash.component';

describe('RepairDashComponent', () => {
  let component: RepairDashComponent;
  let fixture: ComponentFixture<RepairDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

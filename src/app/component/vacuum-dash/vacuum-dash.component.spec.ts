import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacuumDashComponent } from './vacuum-dash.component';

describe('VacuumDashComponent', () => {
  let component: VacuumDashComponent;
  let fixture: ComponentFixture<VacuumDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacuumDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacuumDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

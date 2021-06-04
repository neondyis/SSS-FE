import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceVacuumDialogComponent } from './service-vacuum-dialog.component';

describe('ServiceVacuumDialogComponent', () => {
  let component: ServiceVacuumDialogComponent;
  let fixture: ComponentFixture<ServiceVacuumDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceVacuumDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceVacuumDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

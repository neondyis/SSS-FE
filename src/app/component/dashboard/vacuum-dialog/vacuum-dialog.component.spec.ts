import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacuumDialogComponent } from './vacuum-dialog.component';

describe('VacuumDialogComponent', () => {
  let component: VacuumDialogComponent;
  let fixture: ComponentFixture<VacuumDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacuumDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacuumDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

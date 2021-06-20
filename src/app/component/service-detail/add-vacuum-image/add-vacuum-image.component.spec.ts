import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVacuumImageComponent } from './add-vacuum-image.component';

describe('AddVacuumImageComponent', () => {
  let component: AddVacuumImageComponent;
  let fixture: ComponentFixture<AddVacuumImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVacuumImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVacuumImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniDashCardComponent } from './mini-dash-card.component';

describe('MiniDashCardComponent', () => {
  let component: MiniDashCardComponent;
  let fixture: ComponentFixture<MiniDashCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniDashCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniDashCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

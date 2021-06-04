import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeDashComponent } from './knowledge-dash.component';

describe('KnowledgeDashComponent', () => {
  let component: KnowledgeDashComponent;
  let fixture: ComponentFixture<KnowledgeDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KnowledgeDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgeDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

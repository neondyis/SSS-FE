import { TestBed } from '@angular/core/testing';

import { RepairDashService } from './repair-dash.service';

describe('RepairDashService', () => {
  let service: RepairDashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepairDashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

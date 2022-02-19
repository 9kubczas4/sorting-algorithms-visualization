import { TestBed } from '@angular/core/testing';

import { SortingStatusService } from './sorting-status.service';

describe('SortingStatusService', () => {
  let service: SortingStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortingStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

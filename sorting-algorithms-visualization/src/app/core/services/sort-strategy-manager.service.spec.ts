import { TestBed } from '@angular/core/testing';

import { SortStrategyManagerService } from './sort-strategy-manager.service';

describe('SortStrategyManagerService', () => {
  let service: SortStrategyManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortStrategyManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

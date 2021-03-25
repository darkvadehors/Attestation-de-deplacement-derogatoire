import { TestBed } from '@angular/core/testing';

import { DayTimeGuard } from './day-time.guard';

describe('DayTimeGuard', () => {
  let guard: DayTimeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DayTimeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

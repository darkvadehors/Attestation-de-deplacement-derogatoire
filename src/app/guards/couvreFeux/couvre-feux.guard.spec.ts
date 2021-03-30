import { TestBed } from '@angular/core/testing';

import { CouvreFeuxGuard } from './couvre-feux.guard';

describe('CouvreFeuxGuard', () => {
  let guard: CouvreFeuxGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CouvreFeuxGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

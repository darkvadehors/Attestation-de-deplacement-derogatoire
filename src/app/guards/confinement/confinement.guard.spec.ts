import { TestBed } from '@angular/core/testing';

import { ConfinementGuard } from './confinement.guard';

describe('ConfinementGuard', () => {
  let guard: ConfinementGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ConfinementGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

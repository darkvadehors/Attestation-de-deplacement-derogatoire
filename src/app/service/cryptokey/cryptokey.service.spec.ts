import { TestBed } from '@angular/core/testing';

import { CryptokeyService } from './cryptokey.service';

describe('CryptokeyService', () => {
  let service: CryptokeyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptokeyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

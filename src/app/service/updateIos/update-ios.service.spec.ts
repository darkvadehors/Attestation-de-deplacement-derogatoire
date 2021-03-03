import { TestBed } from '@angular/core/testing';

import { UpdateIosService } from './update-ios.service';

describe('UpdateIosService', () => {
  let service: UpdateIosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateIosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

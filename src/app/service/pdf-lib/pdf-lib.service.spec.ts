import { TestBed } from '@angular/core/testing';

import { PdfLibService } from './pdf-lib.service';

describe('PdfLibService', () => {
  let service: PdfLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { PdfmakeService } from './demo/pdfmake.servicePDF-LIB';

describe('PdfmakeService', () => {
  let service: PdfmakeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfmakeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

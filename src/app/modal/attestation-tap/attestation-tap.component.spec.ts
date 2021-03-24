import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttestationTapComponent } from './attestation-tap.component';

describe('AttestationTapComponent', () => {
  let component: AttestationTapComponent;
  let fixture: ComponentFixture<AttestationTapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttestationTapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttestationTapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

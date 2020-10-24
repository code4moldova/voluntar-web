import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryNewComponent } from './beneficiary-new.component';

describe('BeneficiaryNewComponent', () => {
  let component: BeneficiaryNewComponent;
  let fixture: ComponentFixture<BeneficiaryNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BeneficiaryNewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiaryNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

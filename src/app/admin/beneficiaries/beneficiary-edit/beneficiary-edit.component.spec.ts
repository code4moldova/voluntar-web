import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryEditComponent } from './beneficiary-edit.component';

describe('BeneficiaryEditComponent', () => {
  let component: BeneficiaryEditComponent;
  let fixture: ComponentFixture<BeneficiaryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BeneficiaryEditComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiaryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

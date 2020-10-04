import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryDetailsComponent } from './beneficiary-details.component';

describe('BeneficiaryDetailsComponent', () => {
  let component: BeneficiaryDetailsComponent;
  let fixture: ComponentFixture<BeneficiaryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeneficiaryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiaryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

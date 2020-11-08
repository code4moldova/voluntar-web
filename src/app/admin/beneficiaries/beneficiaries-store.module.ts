import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { BeneficiariesEffects } from './beneficiaries.effects';
import { beneficiariesReducer } from './beneficiaries.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('beneficiaries', beneficiariesReducer),
    EffectsModule.forFeature([BeneficiariesEffects]),
  ],
})
export class BeneficiariesStoreModule {}

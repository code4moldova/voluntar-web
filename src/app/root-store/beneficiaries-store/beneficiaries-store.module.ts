import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { BeneficiariesEffects } from './effects';
import { reducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('beneficiaries', reducer),
    EffectsModule.forFeature([BeneficiariesEffects]),
  ],
  providers: [BeneficiariesEffects],
})
export class BeneficiariesStoreModule { }

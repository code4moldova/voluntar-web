import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RequestsEffects } from './requests.effects';
import { requestsReducer } from './requests.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('requests', requestsReducer),
    EffectsModule.forFeature([RequestsEffects]),
  ],
})
export class RequestsStoreModule {}

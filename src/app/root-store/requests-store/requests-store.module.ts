import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RequestsEffects } from './effects';
import { reducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('requests', reducer),
    EffectsModule.forFeature([RequestsEffects]),
  ],
  providers: [RequestsEffects],
})
export class RequestsStoreModule {}

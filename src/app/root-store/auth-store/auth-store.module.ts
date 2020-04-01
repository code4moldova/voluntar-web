import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects';
import { reducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', reducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  providers: [AuthEffects]
})
export class AuthStoreModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './effects';
import { reducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('user', reducer),
    EffectsModule.forFeature([UserEffects])
  ],
  providers: [UserEffects]
})
export class UserStoreModule {}

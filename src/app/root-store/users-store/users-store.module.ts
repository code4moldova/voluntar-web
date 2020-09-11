import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './effects';
import { reducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('users', reducer),
    EffectsModule.forFeature([UsersEffects]),
  ],
  providers: [UsersEffects],
})
export class UsersStoreModule {}

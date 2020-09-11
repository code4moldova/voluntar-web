import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { VolunteersEffects } from './effects';
import { reducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('volunteers', reducer),
    EffectsModule.forFeature([VolunteersEffects]),
  ],
  providers: [VolunteersEffects],
})
export class VolunteersStoreModule {}

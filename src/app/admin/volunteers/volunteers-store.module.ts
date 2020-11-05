import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { VolunteersEffects } from './volunteers.effects';
import { volunteersReducer } from './volunteers.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('volunteers', volunteersReducer),
    EffectsModule.forFeature([VolunteersEffects]),
  ],
  providers: [VolunteersEffects],
})
export class VolunteersStoreModule {}

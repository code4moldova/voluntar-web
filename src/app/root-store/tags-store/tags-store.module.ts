import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TagsEffects } from './effects';
import { reducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('tags', reducer),
    EffectsModule.forFeature([TagsEffects]),
  ],
  providers: [TagsEffects],
})
export class TagsStoreModule {}

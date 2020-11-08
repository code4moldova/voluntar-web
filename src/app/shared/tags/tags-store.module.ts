import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TagsEffects } from './tags.effects';
import { tagsReducer } from './tags.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('tags', tagsReducer),
    EffectsModule.forFeature([TagsEffects]),
  ],
})
export class TagsStoreModule {}

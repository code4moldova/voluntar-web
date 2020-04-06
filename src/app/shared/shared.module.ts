import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from 'src/app/shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { PhoneMaskDirective } from './directives/phone-mask.directive';
import { EsriMapComponent } from './esri-map/esri-map.component';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialComponentsModule,
    FlexLayoutModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialComponentsModule,
    FlexLayoutModule,
    EsriMapComponent,
    FilterComponent
  ],
  declarations: [
    EsriMapComponent,
    FilterComponent
  ]
})
export class SharedModule { }

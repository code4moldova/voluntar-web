import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from 'src/app/shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { PhoneMaskDirective } from './directives/phone-mask.directive';
import { EsriMapComponent } from './esri-map/esri-map.component';

@NgModule({
  imports: [CommonModule, MaterialComponentsModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialComponentsModule,
    FlexLayoutModule,
    EsriMapComponent
  ],
  declarations: [EsriMapComponent]
})
export class SharedModule { }

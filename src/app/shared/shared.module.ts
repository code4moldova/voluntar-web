import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EsriMapComponent } from './esri-map/esri-map.component';
import { FilterComponent } from './filter/filter.component';
import { GoBackDirective } from './directives/go-back.directive';
import { ZoneTitlePipe } from './zone-title.pipe';
import { PrettyDatePipe } from './pretty-date.pipe';
import { AppBadgeComponent } from './app-badge/app-badge.component';

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
    FilterComponent,
    GoBackDirective,
    ZoneTitlePipe,
    PrettyDatePipe,
    AppBadgeComponent,
  ],
  declarations: [
    EsriMapComponent,
    FilterComponent,
    GoBackDirective,
    PrettyDatePipe,
    ZoneTitlePipe,
    AppBadgeComponent,
  ],
})
export class SharedModule {}

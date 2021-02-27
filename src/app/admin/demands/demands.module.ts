import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandDetailsComponent } from './demand-details/demand-details.component';
import { DemandsListComponent } from './demands-list/demands-list.component';
import { MaterialComponentsModule } from '@shared/material.module';
import { SharedModule } from '@shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';
import { RouterModule } from '@angular/router';
import { demandsRoutes } from './demands.routes';
import { DemandAddressFieldComponent } from './demand-details/demand-address-field/demand-address-field.component';
import { TranslateModule } from '@ngx-translate/core';
import { DemandsMapComponent } from './shared/demands-map/demands-map.component';
import { DemandSelectionOnMapComponent } from './shared/demands-map/demand-selection/demand-selection.component';
import { VolunteerSelectionOnMapComponent } from './shared/demands-map/volunteer-selection/volunteer-selection.component';
import { FilterByNameOrFamilyPipe } from '@app/shared/pipes/filter-by-name-or-family.pipe';
import { DemandsMapPointsComponent } from '@demands/shared/demands-map-points/demands-map-points.component';

@NgModule({
  declarations: [
    DemandDetailsComponent,
    DemandsListComponent,
    DemandAddressFieldComponent,
    DemandsMapComponent,
    DemandSelectionOnMapComponent,
    VolunteerSelectionOnMapComponent,
    FilterByNameOrFamilyPipe,
    DemandsMapPointsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(demandsRoutes),
    MaterialComponentsModule,
    SharedModule,
    NgxMaskModule.forChild(),
    TranslateModule,
  ],
})
export class DemandsModule {}

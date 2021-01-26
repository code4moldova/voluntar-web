import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestDetailsComponent } from './request-details/request-details.component';
import { RequestsListComponent } from './requests-list/requests-list.component';
import { MaterialComponentsModule } from '@shared/material.module';
import { SharedModule } from '@shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';
import { RouterModule } from '@angular/router';
import { requestsRoutes } from './requests.routes';
import { RequestAddressFieldComponent } from './request-details/request-address-field/request-address-field.component';
import { TranslateModule } from '@ngx-translate/core';
import { DemandsMapComponent } from './shared/demands-map/demands-map.component';
import { DemandSelectionOnMapComponent } from './shared/demands-map/demand-selection/demand-selection.component';
import { VolunteerSelectionOnMapComponent } from './shared/demands-map/volunteer-selection/volunteer-selection.component';
import { FilterByNameOrFamilyPipe } from '@app/shared/pipes/filter-by-name-or-family.pipe';

@NgModule({
  declarations: [
    RequestDetailsComponent,
    RequestsListComponent,
    RequestAddressFieldComponent,
    DemandsMapComponent,
    DemandSelectionOnMapComponent,
    VolunteerSelectionOnMapComponent,
    FilterByNameOrFamilyPipe,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(requestsRoutes),
    MaterialComponentsModule,
    SharedModule,
    NgxMaskModule.forChild(),
    TranslateModule,
  ],
})
export class RequestsModule {}

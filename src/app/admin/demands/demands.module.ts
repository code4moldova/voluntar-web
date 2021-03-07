import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandDetailsComponent } from './demand-details/demand-details.component';
import { DemandsListComponent } from './demands-list/demands-list.component';
import { MaterialComponentsModule } from '@shared/material.module';
import { SharedModule } from '@shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';
import { RouterModule } from '@angular/router';
import { demandsRoutes } from './demands.routes';
import { TranslateModule } from '@ngx-translate/core';
import { DemandsMapComponent } from '@demands/shared/demands-map/demands-map.component';
import { DemandsMap0PointsComponent } from '@demands/shared/demands-map-0-points/demands-map-0-points.component';
import { DemandsMap1SelectedComponent } from '@demands/shared/demands-map-1-selected/demands-map-1-selected.component';
import { DemandsMap2VolunteerComponent } from '@demands/shared/demands-map-2-volunteer/demands-map-2-volunteer.component';
import { DemandsMap3CompleteComponent } from '@demands/shared/demands-map-3-complete/demands-map-3-complete.component';

@NgModule({
  declarations: [
    DemandDetailsComponent,
    DemandsListComponent,
    DemandsMapComponent,
    DemandsMap0PointsComponent,
    DemandsMap1SelectedComponent,
    DemandsMap2VolunteerComponent,
    DemandsMap3CompleteComponent,
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsComponent } from './requests.component';
import { RequestDetailsComponent } from './request-details/request-details.component';
import { RequestsListComponent } from './requests-list/requests-list.component';
import { RequestsRoutingModule } from './requests-routing.module';

@NgModule({
  declarations: [
    RequestsComponent,
    RequestDetailsComponent,
    RequestsListComponent
  ],
  imports: [CommonModule, RequestsRoutingModule]
})
export class RequestsModule {}

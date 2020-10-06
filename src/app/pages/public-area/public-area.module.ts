import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicAreaComponent } from './public-area.component';
import { PublicAreaRoutingModule } from './public-area-routing.module';

@NgModule({
  declarations: [PublicAreaComponent],
  imports: [CommonModule, PublicAreaRoutingModule],
})
export class PublicAreaModule {}

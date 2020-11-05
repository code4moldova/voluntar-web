import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicAreaComponent } from './public-area.component';
import { RouterModule } from '@angular/router';
import { publicAreaRoutes } from './public-area.routes';

@NgModule({
  declarations: [PublicAreaComponent],
  imports: [CommonModule, RouterModule.forChild(publicAreaRoutes)],
})
export class PublicAreaModule {}

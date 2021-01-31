import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClusterComponent } from '@app/cluster/cluster.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [ClusterComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: ClusterComponent,
      },
    ]),
    CommonModule,
    MatIconModule,
    TranslateModule,
    MatExpansionModule,
    MatTableModule,
    MatDividerModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
  ],
})
export class ClusterModule {}

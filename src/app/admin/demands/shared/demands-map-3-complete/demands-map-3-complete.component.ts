import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cluster } from '@demands/shared/cluster';
import { Volunteer } from '@volunteers/shared/volunteer';

@Component({
  selector: 'app-demands-map-3-complete',
  templateUrl: './demands-map-3-complete.component.html',
  styleUrls: ['./demands-map-3-complete.component.scss'],
})
export class DemandsMap3CompleteComponent {
  @Output() nextClick = new EventEmitter<MouseEvent>();
  @Input() cluster: Cluster | null = null;
  @Input() volunteer: Volunteer | null = null;

  getClusterUrl(cluster: Cluster): string {
    return `${window.location.origin}/cluster/${cluster._id}`;
  }
}

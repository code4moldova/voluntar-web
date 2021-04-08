import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Demand } from '@demands/shared/demand';
import { Volunteer } from '@volunteers/shared/volunteer';
import { Beneficiary } from '@beneficiaries/shared/beneficiary';

@Component({
  selector: 'app-demands-history',
  templateUrl: './demands-history.component.html',
  styleUrls: ['./demands-history.component.scss'],
})
export class DemandsHistoryComponent {
  @Input()
  demands: Demand[];
  @Input()
  show: 'beneficiary' | 'volunteer';
  @Output()
  page: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  entity(demand: Demand): Volunteer | Beneficiary {
    return this.show === 'volunteer' ? demand.volunteer : demand.beneficiary;
  }
}

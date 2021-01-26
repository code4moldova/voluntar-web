import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Demand } from '@app/shared/models/demand';

@Component({
  selector: 'app-demand-selection',
  templateUrl: './demand-selection.component.html',
  styleUrls: ['./demand-selection.component.scss'],
})
export class DemandSelectionOnMapComponent implements OnInit {
  @Input() selectedDemands: Demand[] = [];
  @Input() selectedCityZone = '';
  @Input() selectionStep = 1;
  constructor(private cdr: ChangeDetectorRef) {}

  public ngOnInit(): void {}
}

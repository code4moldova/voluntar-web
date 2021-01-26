import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Demand, DemandType } from '@app/shared/models/demand';
import { from } from 'rxjs';

@Component({
  selector: 'app-demand-selection',
  templateUrl: './demand-selection.component.html',
  styleUrls: ['./demand-selection.component.scss'],
})
export class DemandSelectionOnMapComponent implements OnInit, OnChanges {
  @Input() selectedDemands: Demand[] = [];
  @Input() selectedCityZone = '';
  @Input() selectionStep = 1;
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(
    //   'changed',
    //   this.selectedCityZone,
    //   'step=',
    //   this.selectionStep,
    //   'selReq=',
    //   this.selectedRequests
    // );
    // this.cdr.detectChanges();
  }

  public ngOnInit(): void {
    console.log('demand-selection.ts', this.selectedDemands);
  }
}

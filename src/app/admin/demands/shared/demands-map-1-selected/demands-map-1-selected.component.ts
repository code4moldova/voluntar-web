import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Zone, zones } from '@app/shared/zone';
import { DemandType, demandTypes } from '../demand-type';
import { Demand } from '@demands/shared/demand';

export type Filter = {
  zone?: Zone;
  type?: DemandType;
};

@Component({
  selector: 'app-demands-map-1-selected',
  templateUrl: './demands-map-1-selected.component.html',
  styleUrls: ['./demands-map-1-selected.component.scss'],
})
export class DemandsMap1SelectedComponent {
  @Output() nextClick = new EventEmitter<MouseEvent>();
  @Output() filterChange = new EventEmitter<Filter>();
  @Output() demandClick = new EventEmitter<Demand>();
  @Input() selectedDemands: Demand[] = [];

  zones = zones;
  demandTypes = demandTypes;
  zone = new FormControl(null);
  type = new FormControl(null);

  filterChanged(): void {
    const noneValues = ['all', null];
    this.filterChange.emit({
      zone: noneValues.includes(this.zone.value) ? undefined : this.zone.value,
      type: noneValues.includes(this.type.value) ? undefined : this.type.value,
    });
  }
}

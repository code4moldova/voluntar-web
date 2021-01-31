import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EsriMapComponent } from '@app/shared/esri-map/esri-map.component';
import { first } from 'rxjs/operators';

export interface coordinates {
  latitude: number;
  longitude: number;
  address: string;
  valid: boolean;
}

@Component({
  selector: 'app-demand-address-field',
  templateUrl: './demand-address-field.component.html',
  styleUrls: ['./demand-address-field.component.scss'],
})
export class DemandAddressFieldComponent implements OnInit {
  @Output() gotCoordinates = new EventEmitter<coordinates>();
  @Input() selectedAddress: string;

  constructor(private matDialog: MatDialog) {}

  ngOnInit(): void {}

  // TODO: Map component not showing addresses
  showMapDialog() {
    this.matDialog
      .open<
        EsriMapComponent,
        { coors: number[]; address: string },
        coordinates
      >(EsriMapComponent, {
        data: {
          coors: [47.02486150651041, 28.832740004203416],
          address: 'Arcul de Triumf',
        },
        panelClass: 'cdk-overlay-pane-no-padding',
        width: '80%',
        height: '80%',
        maxWidth: '100%',
        maxHeight: '100%',
      })
      .afterClosed()
      .pipe(first())
      .subscribe((coors) => {
        if (coors) {
          coors.valid = coors.address.length >= 0;
          this.gotCoordinates.emit(coors);
          this.selectedAddress = coors.address || '';
        }
      });
  }

  // TODO: Check if the input address exists on map
  selectAddress(ev: Event) {
    this.selectedAddress = (ev.target as HTMLInputElement).value;
    const coors = {
      latitude: null,
      longitude: null,
      address: this.selectedAddress,
      valid: false,
    };
    if (this.selectedAddress.length > 1 || this.selectedAddress.length === 0)
      coors.valid = true;
    this.gotCoordinates.emit(coors);
  }
}

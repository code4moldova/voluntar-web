import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  selector: 'app-request-address-field',
  templateUrl: './request-address-field.component.html',
  styleUrls: ['./request-address-field.component.scss'],
})
export class RequestAddressFieldComponent implements OnInit {
  @Output() gotCoordinates = new EventEmitter<coordinates>();
  selectedAddress = '';
  constructor(private matDialog: MatDialog) {}

  ngOnInit(): void {}

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
        panelClass: 'esri-map',
        width: '80%',
        height: '80%',
        maxWidth: '100%',
        maxHeight: '100%',
      })
      .afterClosed()
      .pipe(first())
      .subscribe(
        (coors) => {
          if (coors !== undefined) {
            if (coors.address.length > 1 || coors.address.length == 0)
              coors.valid = true;
            else coors.valid = false;
            this.gotCoordinates.emit(coors);
            this.selectedAddress = coors.address || '';
          }
        },
        (err) => console.log('Coordonates missed!', err)
      );
  }

  selectAddress(ev) {
    this.selectedAddress = ev.target.value;
    let coors = {
      latitude: null,
      longitude: null,
      address: this.selectedAddress,
      valid: false,
    };
    if (this.selectedAddress.length > 1 || this.selectedAddress.length == 0)
      coors.valid = true;
    this.gotCoordinates.emit(coors);
  }
}

import { Component, ViewChild, ElementRef, OnDestroy, Inject, AfterViewInit } from '@angular/core';
import { loadModules } from 'esri-loader';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.scss']
})
export class EsriMapComponent implements OnDestroy, AfterViewInit {
  @ViewChild('map', { static: true }) private mapViewEl: ElementRef<HTMLMapElement>;
  @ViewChild('submitButton', { static: true }) private submitButton: ElementRef<HTMLButtonElement>;
  private view: any;
  private search: any;

  constructor(
    private dialogRef: MatDialogRef<EsriMapComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { coors: number[], address: string }
  ) { }

  ngAfterViewInit() {
    this.initializeMap();
  }

  async initializeMap() {
    try {
      const [
        Map, MapView, Search, BasemapToggle
      ] = await loadModules([
        'esri/Map', 'esri/views/MapView', 'esri/widgets/Search', 'esri/widgets/BasemapToggle',
      ]);
      const [latitude, longitude] = this.data.coors;
      const map = new Map({ basemap: 'streets' });

      this.view = new MapView({
        container: this.mapViewEl.nativeElement,
        center: [latitude || 28.825140232956283, longitude || 47.01266177894471],
        zoom: 8,
        map,
      });

      this.search = new Search({ view: this.view });

      this.view.ui.add(this.search, 'top-right');
      this.view.ui.add(new BasemapToggle({ view: this.view, nextBasemap: 'satellite' }), 'bottom-left');
      this.view.ui.add(this.submitButton.nativeElement, 'bottom-right');

      if (this.data.address) {
        await this.search.search(this.data.address);
      }

      // this.view.watch('stationary', () => this.showCoordinates(this.view.center));
      return this.view;
    } catch (error) {
      console.error(error);
    }
  }

  submitCoors() {
    const { latitude, longitude } = this.view.center;
    this.dialogRef.close({ latitude, longitude, address: this.search.searchTerm });
  }

  ngOnDestroy() {
    if (this.view) {
      // destroy the map view
      this.view.destroy();
    }
  }

}

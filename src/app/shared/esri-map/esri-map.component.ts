import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Inject, Renderer2, AfterViewInit } from '@angular/core';
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
    // private renderer2: Renderer2,
    private dialogRef: MatDialogRef<EsriMapComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { coors: number[], address: string } = {
      coors: [28.825140232956283, 47.01266177894471], // - Chisinau Longitude and Latitide
      address: ''
    }
  ) { }

  ngAfterViewInit() {
    this.initializeMap();
  }

  async initializeMap() {
    try {
      const [
        Map, MapView, Search, BasemapToggle
      ] = await loadModules([
        'esri/Map',
        'esri/views/MapView',
        'esri/widgets/Search',
        'esri/widgets/BasemapToggle',
      ]);
      const map = new Map({ basemap: 'streets' });
      this.view = new MapView({
        container: this.mapViewEl.nativeElement,
        center: this.data.coors.reverse(), // I don't know why, but it works only if array is reversed
        zoom: 8,
        map,
      });
      this.search = new Search({ view: this.view });
      const basemapToggle = new BasemapToggle({ view: this.view, nextBasemap: 'satellite' });

      // const submitCoorsButton = this.renderer2.createElement('button');
      // submitCoorsButton.type = 'button';
      // submitCoorsButton.innerText = 'Submit Coors';
      // submitCoorsButton.onClick = this.submitCoors.bind(this);

      this.view.ui.add(this.search, 'top-right');
      this.view.ui.add(basemapToggle, 'bottom-left');
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

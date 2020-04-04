import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Inject, Renderer2 } from '@angular/core';
import { loadModules } from 'esri-loader';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.scss']
})
export class EsriMapComponent implements OnInit, OnDestroy {
  @ViewChild('map', { static: true }) private mapViewEl: ElementRef<HTMLMapElement>;
  @ViewChild('submitButton', { static: true }) private submitButton: ElementRef<HTMLButtonElement>;
  private view: any;

  // [28.907089, 47.003670] - Chisinau Longitude and Latitide
  constructor(
    // private renderer2: Renderer2,
    private dialogRef: MatDialogRef<EsriMapComponent>,
    @Inject(MAT_DIALOG_DATA) private coors: number[] = [28.825140232956283, 47.01266177894471]
  ) { }

  ngOnInit() {
    this.initializeMap();
  }

  async initializeMap() {
    try {
      const [
        Map, MapView, Search, BasemapToggle
      ] = await loadModules(['esri/Map', 'esri/views/MapView', 'esri/widgets/Search', 'esri/widgets/BasemapToggle']);
      const map = new Map({ basemap: 'streets' });
      const mapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: this.coors.reverse(), // I don't know why, but it works only if array is reversed
        zoom: 8,
        map
      };
      this.view = new MapView(mapViewProperties);
      const searchWidget = new Search({ view: this.view });
      const basemapToggle = new BasemapToggle({ view: this.view, nextBasemap: 'satellite' });

      // const submitCoorsButton = this.renderer2.createElement('button');
      // submitCoorsButton.type = 'button';
      // submitCoorsButton.innerText = 'Submit Coors';
      // submitCoorsButton.onClick = this.submitCoors.bind(this);

      this.view.ui.add(searchWidget, 'top-right');
      this.view.ui.add(basemapToggle, 'bottom-left');
      this.view.ui.add(this.submitButton.nativeElement, 'bottom-right');

      // this.view.watch('stationary', () => this.showCoordinates(this.view.center));

      return this.view;
    } catch (error) {
      console.error(error);
    }
  }

  submitCoors() {
    console.log(this.view.center);
    const { latitude, longitude } = this.view.center;
    console.log([latitude, longitude]);
    this.dialogRef.close({ latitude, longitude });
  }

  ngOnDestroy() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  }

}

import {
  Component,
  ViewChild,
  ElementRef,
  OnDestroy,
  Inject,
  AfterViewInit,
} from '@angular/core';
import { loadModules } from 'esri-loader';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.scss'],
})
export class EsriMapComponent implements OnDestroy, AfterViewInit {
  @ViewChild('map', { static: true }) private mapViewEl: ElementRef<
    HTMLMapElement
  >;
  // @ViewChild('submitButton', { static: true }) private submitButton: ElementRef<
  //   HTMLButtonElement
  // >;
  private view: any;
  private search: any;

  mapIsLoaded$ = new Subject<boolean>();

  constructor(
    private dialogRef: MatDialogRef<EsriMapComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { coors: number[]; address: string }
  ) {}

  ngAfterViewInit() {
    this.initializeMap();
  }

  async initializeMap() {
    try {
      const [
        Map,
        Graphic,
        SimpleMarkerSymbol,
        SimpleLineSymbol,
        Color,
        MapView,
        Search,
        BasemapToggle,
      ] = await loadModules([
        'esri/Map',
        'esri/Graphic',
        'esri/symbols/SimpleMarkerSymbol',
        'esri/symbols/SimpleLineSymbol',
        'esri/Color',
        'esri/views/MapView',
        'esri/widgets/Search',
        'esri/widgets/BasemapToggle',
      ]);

      const map = new Map({ basemap: 'satellite' });

      this.view = new MapView({
        container: this.mapViewEl.nativeElement,
        center: [],
        zoom: 10,
        slider: false,
        map,
      });

      this.search = new Search({ view: this.view });
      this.view.ui.add(this.search, 'top-right');
      this.view.ui.add(
        new BasemapToggle({ view: this.view, nextBasemap: 'streets' }),
        'bottom-left'
      );
      // this.view.ui.add(this.submitButton.nativeElement, 'bottom-right');

      this.view.when(
        async () => {
          const [latitude, longitude] = this.data.coors;
          await this.view.goTo(
            [
              latitude || 47.01266177894471,
              longitude || 28.825140232956283,
            ].reverse()
          );
          if (this.data.address) {
            await this.search.search(this.data.address);
          }
          this.mapIsLoaded$.next(true);
        },
        (error: any) => {
          throw new Error(error);
        }
      );

      const symbol = new SimpleMarkerSymbol(
        SimpleMarkerSymbol.STYLE_CIRCLE,
        12,
        new SimpleLineSymbol(
          SimpleLineSymbol.STYLE_NULL,
          new Color([247, 34, 101, 0.9]),
          1
        ),
        new Color([207, 34, 171, 0.5])
      );

      this.view.on('click', async (evt: any) => {
        this.view.graphics.removeAll();
        this.view.graphics.add(new Graphic(evt.mapPoint, symbol));

        this.search.clear();
        this.view.popup.clear();
        if (this.search.activeSource) {
          const resp = await this.search.activeSource.locator.locationToAddress(
            {
              location: evt.mapPoint,
            }
          );

          // resp.attributes = {
          //   Match_addr: "Strada Constitutiei, 2051, Chisinau"
          //   LongLabel: "Strada Constitutiei, 2051, Chisinau, MDA"
          //   ShortLabel: "Strada Constitutiei"
          //   Addr_type: "StreetName"
          //   Type: ""
          //   PlaceName: ""
          //   AddNum: ""
          //   Address: "Strada Constitutiei"
          //   Block: ""
          //   Sector: ""
          //   Neighborhood: "Chisinau"
          //   District: ""
          //   City: "Chisinau"
          //   MetroArea: ""
          //   Subregion: ""
          //   Region: "Chisinau"
          //   Territory: ""
          //   Postal: "2051"
          //   PostalExt: ""
          //   CountryCode: "MDA"
          // }

          const { address = 'No address found.' } = resp;
          this.view.popup.open({
            // title: + Math.round(evt.mapPoint.longitude * 100000) / 100000 + ',' + Math.round(evt.mapPoint.latitude * 100000) / 100000,
            title: address,
            fetchFeatures: true,
            // content: address,
            // location: evt.mapPoint
          });

          this.search.searchTerm = address;
          await this.view.goTo(
            [evt.mapPoint.latitude, evt.mapPoint.longitude].reverse()
          );
        }
      });

      // this.view.watch('stationary', () => this.showCoordinates(this.view.center));
      return this.view;
    } catch (error) {
      console.error(error);
    }
  }

  submitCoors() {
    const { latitude, longitude } = this.view.center;
    this.dialogRef.close({
      latitude,
      longitude,
      address: this.search.searchTerm,
    });
  }

  ngOnDestroy() {
    if (this.view) {
      // destroy the map view
      this.view.destroy();
    }
  }
}

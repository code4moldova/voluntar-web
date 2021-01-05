import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { loadModules } from 'esri-loader';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import type Map from 'esri/Map';
import type Graphic from 'esri/Graphic';
import type SimpleMarkerSymbol from 'esri/symbols/SimpleMarkerSymbol';
import type Color from 'esri/Color';
import type MapView from 'esri/views/MapView';
import type Search from 'esri/widgets/Search';
import type BasemapToggle from 'esri/widgets/BasemapToggle';
import type LayerSearchSource from 'esri/widgets/Search/LayerSearchSource';
import type LocatorSearchSource from 'esri/widgets/Search/LocatorSearchSource';

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.scss'],
})
export class EsriMapComponent implements OnDestroy, AfterViewInit {
  @ViewChild('map')
  private mapViewEl: ElementRef;
  private view: MapView;
  private search: Search;

  mapIsLoaded$ = new Subject<boolean>();

  constructor(
    private dialogRef: MatDialogRef<EsriMapComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { coors: number[]; address: string }
  ) {}

  ngAfterViewInit() {
    void this.initializeMap();
  }

  async initializeMap() {
    try {
      type Modules = [
        typeof Map,
        typeof Graphic,
        typeof SimpleMarkerSymbol,
        typeof Color,
        typeof MapView,
        typeof Search,
        typeof BasemapToggle
      ];

      const loadedModules = await loadModules<Modules>([
        'esri/Map',
        'esri/Graphic',
        'esri/symbols/SimpleMarkerSymbol',
        'esri/Color',
        'esri/views/MapView',
        'esri/widgets/Search',
        'esri/widgets/BasemapToggle',
      ]);

      const [
        MapConstructor,
        GraphicConstructor,
        SimpleMarkerSymbolConstructor,
        ColorConstructor,
        MapViewConstructor,
        SearchConstructor,
        BasemapToggleConstructor,
      ] = loadedModules;

      const map = new MapConstructor({ basemap: 'satellite' });

      this.view = new MapViewConstructor({
        container: this.mapViewEl.nativeElement,
        center: [],
        zoom: 10,
        map,
      });

      this.search = new SearchConstructor({ view: this.view });
      this.view.ui.add(this.search, 'top-right');
      this.view.ui.add(
        new BasemapToggleConstructor({
          view: this.view,
          nextBasemap: 'streets',
        }),
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

      const symbol = new SimpleMarkerSymbolConstructor({
        size: 12,
        style: 'circle',
        color: new ColorConstructor([207, 34, 171, 0.5]),
        outline: {
          style: 'none',
          color: new ColorConstructor([247, 34, 101, 0.9]),
          width: 1,
        },
      });

      this.view.on('click', async (evt) => {
        this.view.graphics.removeAll();
        this.view.graphics.add(
          new GraphicConstructor({ geometry: evt.mapPoint, symbol })
        );

        this.search.clear();
        this.view.popup.clear();

        if (isLocatorSearchSource(this.search.activeSource)) {
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

function isLocatorSearchSource(
  searchSource: LayerSearchSource | LocatorSearchSource
): searchSource is LocatorSearchSource {
  return (
    searchSource.declaredClass === 'esri.tasks.Locator' &&
    !!(searchSource as LocatorSearchSource).locator
  );
}

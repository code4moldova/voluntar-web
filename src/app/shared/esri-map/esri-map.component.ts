import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import Map from '@arcgis/core/Map';
import Graphic from '@arcgis/core/Graphic';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import Color from '@arcgis/core/Color';
import MapView from '@arcgis/core/views/MapView';
import Search from '@arcgis/core/widgets/Search';
import BasemapToggle from '@arcgis/core/widgets/BasemapToggle';
import LayerSearchSource from '@arcgis/core/widgets/Search/LayerSearchSource';
import LocatorSearchSource from '@arcgis/core/widgets/Search/LocatorSearchSource';

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
    @Inject(MAT_DIALOG_DATA) private data: { coors: number[]; address: string },
  ) {}

  ngAfterViewInit() {
    void this.initializeMap();
  }

  async initializeMap() {
    try {
      const map = new Map({ basemap: 'satellite' });

      this.view = new MapView({
        container: this.mapViewEl.nativeElement,
        center: [],
        zoom: 10,
        map,
      });

      this.search = new Search({ view: this.view });
      this.view.ui.add(this.search, 'top-right');
      this.view.ui.add(
        new BasemapToggle({
          view: this.view,
          nextBasemap: 'streets',
        }),
        'bottom-left',
      );

      this.view.when(
        async () => {
          const [latitude, longitude] = this.data.coors;
          await this.view.goTo(
            [
              latitude || 47.01266177894471,
              longitude || 28.825140232956283,
            ].reverse(),
          );
          if (this.data.address) {
            await this.search.search(this.data.address);
          }
          this.mapIsLoaded$.next(true);
        },
        (error: any) => {
          throw new Error(error);
        },
      );

      const symbol = new SimpleMarkerSymbol({
        size: 12,
        style: 'circle',
        color: new Color([207, 34, 171, 0.5]),
        outline: {
          style: 'none',
          color: new Color([247, 34, 101, 0.9]),
          width: 1,
        },
      });

      this.view.on('click', async (evt) => {
        this.view.graphics.removeAll();
        this.view.graphics.add(new Graphic({ geometry: evt.mapPoint, symbol }));

        this.search.clear();
        this.view.popup.clear();

        if (isLocatorSearchSource(this.search.activeSource)) {
          const resp = await this.search.activeSource.locator.locationToAddress(
            {
              location: evt.mapPoint,
            },
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
            [evt.mapPoint.latitude, evt.mapPoint.longitude].reverse(),
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
  searchSource: LayerSearchSource | LocatorSearchSource,
): searchSource is LocatorSearchSource {
  return (
    searchSource.declaredClass === 'esri.tasks.Locator' &&
    !!(searchSource as LocatorSearchSource).locator
  );
}

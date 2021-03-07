import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Map from '@arcgis/core/Map';
import Graphic from '@arcgis/core/Graphic';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import Color from '@arcgis/core/Color';
import MapView from '@arcgis/core/views/MapView';
import Search from '@arcgis/core/widgets/Search';
import BasemapToggle from '@arcgis/core/widgets/BasemapToggle';
import LayerSearchSource from '@arcgis/core/widgets/Search/LayerSearchSource';
import LocatorSearchSource from '@arcgis/core/widgets/Search/LocatorSearchSource';
import { centerCoordinate } from '@shared/zone';
import Point from '@arcgis/core/geometry/Point';
import MapViewClickEventHandler = __esri.MapViewClickEventHandler;

@Component({
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.scss'],
})
export class EsriMapComponent implements OnDestroy, AfterViewInit {
  @ViewChild('map') private mapViewEl: ElementRef;
  private mapView: MapView;
  private search: Search;

  constructor(
    private dialogRef: MatDialogRef<EsriMapComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data?: { coors: [number, number]; address: string },
  ) {}

  ngAfterViewInit() {
    const center = this.data?.coors ?? new Point(centerCoordinate);
    const searchTerm = this.data?.address ?? 'Arcul de triumf';
    this.mapView = new MapView({
      container: this.mapViewEl.nativeElement,
      center,
      zoom: 15,
      map: new Map({ basemap: 'streets-navigation-vector' }),
    });

    this.search = new Search({
      view: this.mapView,
      searchTerm,
    });
    this.mapView.ui.add(this.search, 'top-right');
    this.mapView.ui.add(
      new BasemapToggle({
        view: this.mapView,
        nextBasemap: 'satellite',
      }),
      'bottom-left',
    );

    void this.mapView.goTo(center);
    void this.search.search(searchTerm);
    this.mapView.on('click', this.onMapClick);
  }

  onMapClick: MapViewClickEventHandler = async (evt) => {
    if (!isLocatorSearchSource(this.search.activeSource)) return;

    this.mapView.graphics.removeAll();
    this.mapView.graphics.add(
      new Graphic({
        geometry: evt.mapPoint,
        symbol: new SimpleMarkerSymbol({
          size: 12,
          style: 'circle',
          color: new Color([207, 34, 171, 0.5]),
          outline: {
            style: 'none',
            color: new Color([247, 34, 101, 0.9]),
            width: 1,
          },
        }),
      }),
    );

    this.search.clear();
    this.mapView.popup.clear();

    const response = await this.search.activeSource.locator.locationToAddress({
      location: evt.mapPoint,
    });

    const { address = 'No address found.' } = response;

    this.mapView.popup.open({
      title: 'Exact location',
      content: address,
      location: evt.mapPoint,
    });

    this.search.searchTerm = address;
    await this.mapView.goTo(evt.mapPoint);
  };

  submitCoordinates() {
    const { latitude, longitude } = this.mapView.center;
    this.dialogRef.close({
      latitude,
      longitude,
      address: this.search.searchTerm,
    });
  }

  ngOnDestroy() {
    this.mapView.destroy();
  }
}

function isLocatorSearchSource(
  searchSource: LayerSearchSource | LocatorSearchSource,
): searchSource is LocatorSearchSource {
  return (
    searchSource.declaredClass === 'esri.widgets.Search.LocatorSearchSource' &&
    !!(searchSource as LocatorSearchSource).locator
  );
}

import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Demand } from '@demands/shared/demand';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import config from '@arcgis/core/config';
import { Coordinate } from '@shared/zone';
import difference from 'lodash.difference';
import Graphic from '@arcgis/core/Graphic';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import MapViewClickEventHandler = __esri.MapViewClickEventHandler;
import MapViewClickEvent = __esri.MapViewClickEvent;
import { Observable, Subscription } from 'rxjs';

config.assetsPath = '/assets';

// The Triumphal Arch
export const centerCoordinate: Coordinate = {
  latitude: 47.024758255143986,
  longitude: 28.83263462925968,
};

const notSelectedSymbol = new SimpleMarkerSymbol({
  color: '#FFFFFF',
  style: 'circle',
  size: 10,
  outline: {
    color: '#605E5C',
    width: 1,
  },
});

@Component({
  selector: 'app-demands-map-0-points',
  template: '',
  styleUrls: ['./demands-map-0-points.component.scss'],
})
export class DemandsMap0PointsComponent
  implements OnInit, OnChanges, OnDestroy {
  private subscriptions = new Subscription();
  @Input() demands: Demand[];
  @Input() centerZone: Observable<Coordinate>;
  @Output() demandClick = new EventEmitter<Demand>();

  graphicsLayer = new GraphicsLayer();
  map = new Map({
    // https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap
    basemap: 'streets-navigation-vector',
    layers: [this.graphicsLayer],
  });
  mapView = new MapView({
    center: centerCoordinate,
    container: this.elementRef.nativeElement,
    zoom: 12,
    map: this.map,
  });

  constructor(private elementRef: ElementRef, private cdr: ChangeDetectorRef) {
    this.mapView.on('click', this.onMapClick);
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.centerZone.subscribe((coordinate) => {
        // TODO: cdr this does not work, wtf, even with cdr
        void this.mapView.goTo(coordinate, { animate: true });
      }),
    );
  }

  onMapClick: MapViewClickEventHandler = (ev: MapViewClickEvent) => {
    this.mapView.hitTest(ev).then((hitResult) => {
      // Find a hit that has demand attribute
      const result = hitResult.results.find((r) => r.graphic.attributes.demand);
      if (result) {
        // TODO: Do we need to navigate?
        // TODO: disable for the moment, it's annoying
        // void this.mapView.goTo(ev.mapPoint, { animate: true });
        this.demandClick.emit(result.graphic.attributes.demand);
      }
    });
  };

  ngOnChanges(changes: SimpleChanges) {
    const previous: Demand[] = changes.demands.previousValue ?? [];
    // TODO: Check if beneficiary has coordinates?
    const current: Demand[] = changes.demands.currentValue ?? [];

    // A XOR can be used to create symmetric difference,
    // for removed and added, but will be more complicated
    // When a demand is selected/unselected, a new instance ref is created
    // and `difference` will compare by reference
    // So the previous one is removed, and a new one with updated symbol is created
    const removed = difference(previous, current);
    const added = difference(current, previous);

    this.graphicsLayer.graphics.removeMany(
      this.graphicsLayer.graphics.filter((item) =>
        removed.includes(item.attributes.demand),
      ),
    );

    this.graphicsLayer.graphics.addMany(
      added.map((demand) => getNewGraphic(demand)),
    );

    // TODO: cdr no rerender when changing map even with cdr
    // this.cdr.detectChanges(),
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    // From the docs, this should destroy everything, it's a cascade destroy
    // MapView, Map, GraphicsLayer, Graphic
    this.mapView.destroy();
  }
}

function getNewGraphic(demand: Demand) {
  return new Graphic({
    // Keep in mind, demand is a field in attributes, it's like a flag
    attributes: { demand },
    // `demand.beneficiary` has latitude and longitude
    geometry: new Point(demand.beneficiary),
    symbol: notSelectedSymbol.clone(),
  });
}

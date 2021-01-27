import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { from } from 'rxjs';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Search from '@arcgis/core/widgets/Search';
import BasemapToggle from '@arcgis/core/widgets/BasemapToggle';

@Component({
  selector: 'app-requests-map',
  templateUrl: './requests-map.component.html',
  styleUrls: ['./requests-map.component.scss'],
})
export class RequestsMapComponent implements OnDestroy, OnInit {
  @Input() coors: [number, number] = [47.01266177894471, 28.825140232956283];
  @Output() mapLoadedEvent = new EventEmitter<boolean>();

  @ViewChild('map', { static: true }) private mapViewEl: ElementRef;

  private loaded: boolean;
  private search: Search;
  private view: MapView = null;

  constructor() {}

  ngOnInit() {
    // Initialize MapView and return an instance of MapView
    from(this.initializeMap()).subscribe(() => {
      // The map has been initialized
      this.loaded = this.view.ready;
      this.mapLoadedEvent.emit(true);
    });
  }

  async initializeMap() {
    try {
      const map = new Map({ basemap: 'streets-navigation-vector' });
      this.view = new MapView({
        container: this.mapViewEl.nativeElement,
        zoom: 12,
        map,
      });

      this.search = new Search();
      this.view.ui.add([this.search], 'top-right');
      this.view.ui.add(
        new BasemapToggle({
          view: this.view,
          nextBasemap: 'hybrid',
        }),
        'bottom-left'
      );

      this.view.when(
        async () => {
          const [latitude, longitude] = this.coors;
          await this.view.goTo(
            [
              latitude || 47.01266177894471,
              longitude || 28.825140232956283,
            ].reverse()
          );
        },
        (error: any) => {
          throw new Error(error);
        }
      );

      return this.view;
    } catch (error) {
      console.error(error);
    }
  }

  ngOnDestroy() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  }
}

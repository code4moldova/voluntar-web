import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { from, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import Map from '@arcgis/core/Map';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import MapView from '@arcgis/core/views/MapView';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import config from '@arcgis/core/config.js';

import { RequestsFacade } from '../../requests.facade';
import { KIV_ZONES } from '@app/shared/constants';
import { RequestsService } from '../../requests.service';
import { Demand, DemandType } from '@app/shared/models/demand';
import { DemandsMapService } from './demands-map.services';
import { IVolunteer } from '@app/shared/models/volunteers';

export interface coordinates {
  latitude: number;
  longitude: number;
  _id: any;
}

@Component({
  selector: 'app-demands-map',
  templateUrl: './demands-map.component.html',
  styleUrls: ['./demands-map.component.scss'],
})
export class DemandsMapComponent implements OnDestroy, OnInit {
  @Input() coordinates: [number, number] = [
    28.825140232956283,
    47.01266177894471,
  ];
  @Output() mapLoadedEvent = new EventEmitter<boolean>();
  @Output() mapClickedEvent = new EventEmitter<boolean>();
  @ViewChild('map', { static: true }) private mapViewEl: ElementRef;
  @ViewChild('headerSelectionZone', { static: true })
  private headerSelection: ElementRef;
  private map: Map = null;
  private mapView: MapView = null;
  private graphicsLayer: GraphicsLayer = null;
  public requests: Demand[] = [];
  private subRequests$: Subscription;
  public zones = KIV_ZONES;
  public demand: DemandType;
  demandTypesFilter = Object.entries(DemandType).map(([key, _]) => key);
  form: FormGroup;
  public stepOnSelectionZone = 1;
  buttonSelectorTextOnMap = 'Următor';
  public dateDemandRequested: Date = null;

  public selectedDemands: Demand[] = [];
  public selectedVolunteer: IVolunteer = null;
  public selectedCityZone = '';
  public selectedDemandTypeFilter = '';
  public anyDemand = 'any';
  private simpleMarkerSymbol = {
    type: 'simple-marker',
    color: [255, 255, 255, 0.3],
    style: 'circle', //'circle', 'cross', 'diamond', 'path', 'square', 'triangle', 'x'
    outline: {
      color: [226, 119, 40], // orange
      width: 2,
    },
  };
  private changedMarkerSymbol = {
    type: 'simple-marker',
    color: [60, 210, 120, 0.7], // green
    outline: {
      color: [0, 0, 0, 0.7],
      width: 1,
    },
  };

  constructor(
    public requestsFacade: RequestsFacade,
    public requestsService: RequestsService,
    private cdr: ChangeDetectorRef,
    private demandsMapService: DemandsMapService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): any {
    this.stepOnSelectionZone = 1;

    this.form = new FormGroup({
      city_sector: new FormControl(''),
      needs: new FormControl(''),
    });

    // Initialize MapView
    config.assetsPath = '/assets';
    this.initializeMap().then(() => {
      // The map has been initialized and prefilled
    });
  }

  async initializeMap() {
    try {
      //Geographic data stored temporarily in memory.
      //Displaying individual geographic features as graphics, visual aids or text on the map.
      this.graphicsLayer = new GraphicsLayer();
      this.initializeRequestsOnTheMap('init');

      this.map = await new Map({
        basemap: 'streets-navigation-vector', // possible: topo-vector
        layers: [this.graphicsLayer],
      });

      this.mapView = new MapView({
        center: this.coordinates,
        container: this.mapViewEl.nativeElement,
        zoom: 12,
        map: this.map,
      });

      this.mapView.on('click', (ev) => {
        this.mapView.hitTest(ev.screenPoint).then((res) => {
          if (res.results[0].graphic.attributes?.requestId === undefined)
            return;

          const gr: Graphic = res.results[0].graphic;
          if (gr) {
            const exist = this.selectedDemands.find(
              (r) => r._id === gr.attributes.requestId
            );
            if (exist === undefined) {
              //in case of missed - add demand to the selected demands and make it green on map
              this.selectedDemands.push(
                this.requests.find((r) => r._id === gr.attributes.requestId)
              );
              this.selectedDemands = [...this.selectedDemands];
              gr.symbol.set('color', [60, 210, 120, 0.7]);
            } else {
              //in case of exist - remove demand from selected and make it white on map
              this.selectedDemands = this.selectedDemands.filter(
                (r) => r !== exist
              );
              gr.symbol.set('color', [255, 255, 255, 0.3]);
            }
            this.graphicsLayer.add(gr.clone());
            this.graphicsLayer.remove(gr);

            //next row needs to throw detectChanges by Angular
            this.cdr.detectChanges();
          }
        });
        //center map view to selected point
        this.mapView.goTo({ center: ev.mapPoint });
      });

      this.mapView.when(
        () => {},
        (error) => {
          // Use the errback function to handle when the view doesn't load properly
          console.log('The view~s resources failed to load: ', error);
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
      this.cdr.detectChanges();
    }
  }

  initializeRequestsOnTheMap(
    status: 'init' | 'filter',
    filters: any = {}
  ): void {
    if (status === 'init') {
      this.selectedDemands = [];
    } else {
      console.log('aici 248 rind');

      this.graphicsLayer.removeAll();
      this.selectedDemands.forEach((el) =>
        this.addDemandToMap(el, this.changedMarkerSymbol)
      );
    }
    from(
      this.requestsService.getDemand(
        {
          pageIndex: 1,
          pageSize: 20000,
        },
        {
          //TODO - temp for tests disabled
          status: 'confirmed',
          ...filters,
        }
      )
    ).subscribe(
      (res) => {
        this.requests = res.list;
        this.requests.forEach((el) => {
          //TODO - testing purpose, set status to confirmed to have demands on the map
          // from(this.demandsMapService.tempSetStatusToConfirmed(el)).subscribe((res) =>
          //   console.log('res', res)
          // );
          this.addDemandToMap(el, this.simpleMarkerSymbol);
        });
      },
      (err) => console.log('Error getting requests from server! ', err)
    );
  }

  addDemandToMap(req: Demand, sym: any): void {
    const pointToMap = new Point({
      latitude:
        req.beneficiary.latitude || 47.01820503506154 + Math.random() * 0.01,
      longitude:
        req.beneficiary.longitude || 28.812844986831664 + Math.random() * 0.01,
    });
    this.graphicsLayer.add(
      new Graphic({
        geometry: pointToMap,
        symbol: sym,
        attributes: {
          requestId: req._id,
          zone: req.beneficiary.zone || 'toate',
        },
      })
    );
  }

  filterChanged(): void {
    let selectedZone;
    let currentFilter = {};

    this.selectedCityZone = `${this.form.get('city_sector').value}`;
    this.selectedDemandTypeFilter = `${this.form.get('needs').value}`;

    if (
      this.selectedCityZone &&
      'toate'.normalize() !== this.selectedCityZone.normalize()
    ) {
      selectedZone = this.zones.find(
        (zone) =>
          zone.value.toLowerCase() === this.selectedCityZone.toLowerCase()
      );
      this.mapView.center = new Point(selectedZone.mapCoordonates);
      currentFilter = { ...currentFilter, zone: selectedZone.value };
    }
    if (
      this.selectedDemandTypeFilter &&
      this.selectedDemandTypeFilter.normalize() !== this.anyDemand.normalize()
    ) {
      currentFilter = {
        ...currentFilter,
        type: this.selectedDemandTypeFilter,
      };
    }
    this.initializeRequestsOnTheMap('filter', currentFilter);
  }

  selectedVolunteerProvided(ev) {
    this.selectedVolunteer = ev;
  }

  nextFormStep(): void {
    if (this.stepOnSelectionZone === 3) {
      this.stepOnSelectionZone = 1;
      this.initializeRequestsOnTheMap('init');
    } else {
      this.stepOnSelectionZone++;
    }
    switch (this.stepOnSelectionZone) {
      case 1:
        this.buttonSelectorTextOnMap = 'Următor';
        this.headerSelection.nativeElement.innerHTML = 'Selectare Beneficiari';
        break;
      case 2:
        if (this.selectedDemands.length === 0) {
          this.stepOnSelectionZone--;
          this.snackMessage('Please select some demands');
          break;
        }
        this.buttonSelectorTextOnMap = 'Alocă';
        this.headerSelection.nativeElement.innerHTML = 'Selectare Voluntari';
        break;
      case 3:
        this.alocareaVoluntarului();
        this.buttonSelectorTextOnMap = 'Sarcină Nouă';
        this.headerSelection.nativeElement.innerHTML = 'FINISH!';
        break;
      default:
        this.buttonSelectorTextOnMap = 'ERROR !!!';
    }
  }
  onSubmit(ev): void {
    ev.preventDefault();
    //for future possible actions
  }

  alocareaVoluntarului() {
    console.log('volunteerId=', this.selectedVolunteer);
    from(
      this.demandsMapService.assignDemandsToVolunteer(
        this.selectedVolunteer._id,
        this.selectedDemands
      )
    ).subscribe(
      (res) => {
        console.log(' resp received', res);
        this.stepOnSelectionZone = 3;
      },
      (err) => {
        console.log('error', err.error);
      }
    );
  }

  snackMessage(msg: string) {
    this.snackBar.open(msg, '', {
      duration: 3000,
      panelClass: '', //additional CSS
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  ngOnDestroy() {
    console.log('🚀 RequestsMapComponent ~ ngOnDestroy ~ ngOnDestroy');
    this.subRequests$.unsubscribe();
    this.mapView.on('click', null);
    this.mapView.on('pointer-move', null);

    if (this.mapView) {
      this.mapView.destroy();
    }
    if (this.graphicsLayer) this.graphicsLayer = null;
  }
}

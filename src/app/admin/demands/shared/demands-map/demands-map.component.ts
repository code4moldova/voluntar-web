import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Demand } from '../demand';
import { DemandsService } from '../../demands.service';
import { Subject, Subscription } from 'rxjs';
import { Filter } from '@demands/shared/demands-map-1-selected/demands-map-1-selected.component';
import { Volunteer } from '@volunteers/shared/volunteer';
import { VolunteersService } from '@volunteers/volunteers.service';
import { Cluster } from '@demands/shared/cluster';
import { TranslateService } from '@ngx-translate/core';
import { weekDays } from '@shared/week-day';
import { Coordinate, zonesCoordinates } from '@shared/zone';

enum DemandAssignStep {
  selectDemands = 'select-demands',
  selectVolunteer = 'select-volunteer',
  complete = 'complete',
}

@Component({
  selector: 'app-demands-map',
  templateUrl: './demands-map.component.html',
  styleUrls: ['./demands-map.component.scss'],
})
export class DemandsMapComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  DemandAssignStep = DemandAssignStep;
  currentStep: DemandAssignStep = DemandAssignStep.selectDemands;
  mapDemands: Demand[] = [];
  selectedDemands: Demand[] = [];
  volunteers: Volunteer[] = [];
  filteredVolunteers: Volunteer[] = [];
  selectedVolunteer: Volunteer | null = null;
  cluster: Cluster | null = null;
  centerZone = new Subject<Coordinate>();
  centerZoneObservable = this.centerZone.asObservable();

  constructor(
    private demandsService: DemandsService,
    private volunteersService: VolunteersService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.getDemands();

    this.subscriptions.add(
      this.volunteersService
        .getVolunteers({
          pageIndex: 1,
          pageSize: Number.MAX_SAFE_INTEGER,
        })
        .subscribe((response) => {
          this.volunteers = response.list;
          this.filteredVolunteers = response.list;
        }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getDemands(filters: Filter = {}) {
    this.subscriptions.add(
      this.demandsService
        .getDemands(
          {
            pageIndex: 1,
            pageSize: Number.MAX_SAFE_INTEGER,
          },
          {
            ...filters,
            status: 'confirmed',
          },
        )
        .subscribe((response) => {
          const selectedHasDemand = (d: Demand) =>
            this.selectedDemands.some((sd) => d._id === sd._id);

          // Filter demands that are already selected
          this.mapDemands = response.list.filter(
            (demand) => !selectedHasDemand(demand),
          );
        }),
    );
  }

  /** removes from map adds to selected */
  mapDemandClick(demand: Demand) {
    this.mapDemands = this.mapDemands.filter((d) => d._id !== demand._id);
    this.selectedDemands = [...this.selectedDemands, demand];
  }

  /** removes from selected adds to map */
  selectedDemandClick(demand: Demand) {
    this.mapDemands = [...this.mapDemands, demand];
    this.selectedDemands = this.selectedDemands.filter(
      (d) => d._id !== demand._id,
    );
  }

  demandFilterChange(filter: Filter) {
    this.getDemands(filter);
    if (filter.zone) {
      const coordinates = zonesCoordinates[filter.zone];
      this.centerZone.next(coordinates);
    }
  }

  volunteerClick(volunteer: Volunteer) {
    this.selectedVolunteer = volunteer;
  }

  restartAssignment() {
    this.currentStep = DemandAssignStep.selectDemands;
    this.selectedVolunteer = null;
    this.selectedDemands = [];
    this.cluster = null;
  }

  assignVolunteer() {
    if (!this.selectedVolunteer) return;

    this.subscriptions.add(
      this.demandsService
        .assignToVolunteer(
          this.selectedDemands,
          this.selectedVolunteer._id as string,
        )
        .subscribe((response) => {
          this.cluster = response.cluster;
          this.currentStep = DemandAssignStep.complete;
          // TODO: cdr investigate why no rerender after this
          this.cdr.detectChanges();
        }),
    );
  }

  volunteerSearchChange($event: string) {
    this.selectedVolunteer = null;
    if ($event.trim() === '') {
      this.filteredVolunteers = this.volunteers;
      return;
    }

    const lowerSearch = $event.toLocaleLowerCase();
    this.filteredVolunteers = this.volunteers.filter((volunteer) => {
      const searches = [
        volunteer.first_name,
        volunteer.last_name,
        volunteer.phone,
        volunteer.role.map((r) => this.translate.instant(r)).join(', '),
      ];
      return searches
        .filter(Boolean)
        .map((s) => s.toLocaleLowerCase())
        .some((s) => s.includes(lowerSearch));
    });
  }

  volunteerDateChange($event: Date | null) {
    this.selectedVolunteer = null;
    if (!$event) {
      this.filteredVolunteers = this.volunteers;
      return;
    }

    this.filteredVolunteers = this.volunteers.filter((volunteer) => {
      const dayOfWeek = $event.getDay();
      const enumDayOfWeek = weekDays[dayOfWeek];
      return (volunteer.availability_days ?? []).includes(enumDayOfWeek);
    });
  }
}

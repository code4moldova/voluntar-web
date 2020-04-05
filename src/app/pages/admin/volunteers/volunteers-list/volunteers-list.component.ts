import { Component, OnInit, ViewChild } from '@angular/core';
import { VolunteersFacadeService } from '@services/volunteers/volunteers-facade.service';
import { map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { IVolunteer } from '@models/volunteers';
import { TagsFacadeService } from '@services/tags/tags-facade.service';
import { IOfferTag } from '@models/tags';
import { GeolocationService } from '@services/geolocation/geolocation.service';
import { FilterInputColumns, FilterSelectColumns, FilterObservableSelectColumns } from '@models/filter';
import { ZoneI } from '@models/geolocation';

@Component({
  selector: 'app-volunteers-list',
  templateUrl: './volunteers-list.component.html',
  styleUrls: ['./volunteers-list.component.scss']
})
export class VolunteersListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'email', 'status', 'availableHours'];
  dataSource$: Observable<MatTableDataSource<IVolunteer>>;
  isLoading$ = this.volunteersFacade.isLoading$;
  public inputColumns: FilterInputColumns[];
  public observableSelectColumns: FilterObservableSelectColumns<IOfferTag | ZoneI>[];
  public selectColumns: FilterSelectColumns<{ label: string; _id: boolean | string }>[];
  private isActive = [
    {
      label: 'Yes',
      _id: true,
    },
    {
      label: 'No',
      _id: false,
    },
  ];
  private newVolunteer = [
    {
      label: 'Yes',
      _id: true,
    },
    {
      label: 'No',
      _id: false,
    },
  ];
  constructor(
    private volunteersFacade: VolunteersFacadeService,
    private tagsFacadeService: TagsFacadeService,
    private geolocationService: GeolocationService
  ) { }

  ngOnInit() {
    this.volunteersFacade.getVolunteers();
    this.dataSource$ = this.volunteersFacade.volunteers$.pipe(
      map(data => {
        const dataSource = new MatTableDataSource(data);
        dataSource.paginator = this.paginator;
        return dataSource;
      })
    );

    this.inputColumns = [
      { name: 'First Name', value: 'first_name' },
      { name: 'Last Name', value: 'last_name' },
      { name: 'Phone', value: 'phone', icon: 'phone' },
    ];

    this.observableSelectColumns = [
      { name: 'Offer', value: 'offer', array: this.tagsFacadeService.offersTags$ },
      { name: 'Zone address', value: 'zone_address', array: this.geolocationService.getZonesFromFilter() },
    ];

    this.selectColumns = [
      { name: 'Is Active', value: 'is_active', array: this.isActive },
      { name: 'New volunteer', value: 'new_volunteer', array: this.newVolunteer },
    ];

  }
  queryResult(event: { query: string }) {
    this.volunteersFacade.getVolunteersByFilter(event.query);
  }

  resetForm($event: { result: boolean }) {
    if ($event.result) {
      this.volunteersFacade.getVolunteers();
    }
  }


}

import { Component, OnInit, ViewChild } from '@angular/core';
import { VolunteersFacadeService } from '@services/volunteers/volunteers-facade.service';
import { map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { IVolunteer } from '@models/volunteers';
import { FormBuilder, FormControl } from '@angular/forms';
import { TagsFacadeService } from '@services/tags/tags-facade.service';
import { IOfferTag } from '@models/tags';
import { GeolocationService } from '@services/geolocation/geolocation.service';

@Component({
  selector: 'app-volunteers-list',
  templateUrl: './volunteers-list.component.html',
  styleUrls: ['./volunteers-list.component.scss']
})
export class VolunteersListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'status', 'availableHours'];
  dataSource$: Observable<MatTableDataSource<IVolunteer>>;
  isLoading$ = this.volunteersFacade.isLoading$;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public zones: Observable<{ list: any[] }>;
  public offers: Observable<IOfferTag[]>;


  form = this.fb.group({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    phone: new FormControl(''),
    status: new FormControl(''),
    offer: new FormControl(''),
    zone_address: new FormControl(''),
  });

  constructor(
    private volunteersFacade: VolunteersFacadeService,
    private fb: FormBuilder,
    private tagsFacadeService: TagsFacadeService,
    private geolocationService: GeolocationService
  ) { }

  ngOnInit() {
    this.volunteersFacade.getVolunteers();
    this.offers = this.tagsFacadeService.offersTags$;
    this.zones = this.geolocationService.getZones();
    this.dataSource$ = this.volunteersFacade.volunteers$.pipe(
      map(data => {
        const dataSource = new MatTableDataSource(data);
        dataSource.paginator = this.paginator;
        return dataSource;
      })
    );
  }

  search(filters: any) {
    const query = Object.keys(filters).reduce((acc, cv) => (acc = acc + ((filters[cv] === '' || filters[cv] === null) ? '' : `&${cv}=${filters[cv]}`)), '');
    this.volunteersFacade.getVolunteerByFilter(query);
  }

  reset() {
    this.form.reset({ first_name: '', last_name: '', phone: '', status: '', fixer: '', zone_address: '' });
    this.form.markAsUntouched();
    this.volunteersFacade.getVolunteers();
  }

}

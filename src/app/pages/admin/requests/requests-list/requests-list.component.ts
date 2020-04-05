import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IRequest } from '@models/requests';
import { IUser } from '@models/user';
import { RequestsFacadeService } from '@services/requests/requests-facade.service';
import { UsersFacadeService } from '@services/users/users-facade.service';
import { GeolocationService } from '@services/geolocation/geolocation.service';
import { ZoneI } from '@models/geolocation';
import { FormBuilder, FormControl } from '@angular/forms';

interface FilterAttributes {
  first_name: string;
  last_name: string;
  phone: number;
  status: string;
  userId: string;
  zoneId: string;
}

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.scss'],
})
export class RequestsListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'phone', 'hasMoney', 'city', 'status'];
  dataSource$: Observable<MatTableDataSource<IRequest>>;
  isLoading$ = this.requestsFacade.isLoading$;
  newRequest$ = this.requestsFacade.newRequests;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public users: Observable<IUser[]>;
  public zones: Observable<{ list: ZoneI[] }>;

  form = this.fb.group({
    first_name: new FormControl(null),
    last_name: new FormControl(null),
    phone: new FormControl(null),
    status: new FormControl(null),
    fixer: new FormControl(null),
    zone_address: new FormControl(null),
  });

  constructor(
    private requestsFacade: RequestsFacadeService,
    private usersFacadeService: UsersFacadeService,
    private geolocationService: GeolocationService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.fetchRequests();
    this.dataSource$ = this.requestsFacade.requests$.pipe(
      map((data) => {
        const dataSource = new MatTableDataSource(data);
        dataSource.paginator = this.paginator;
        return dataSource;
      })
    );
    this.usersFacadeService.getUsers();
    this.users = this.usersFacadeService.users$;
    this.zones = this.geolocationService.getZones();
  }

  fetchRequests() {
    this.requestsFacade.getRequests();
    this.requestsFacade.resetNewRequests();
  }

  search(filters: FilterAttributes) {
    // const query = Object.keys(filters).reduce(
    //   (acc, cv) =>
    //     (acc =
    //       acc +
    //       (filters[cv] === '' || filters[cv] === null
    //         ? ''
    //         : `&${cv}=${filters[cv]}`)),
    //   ''
    // );
    this.requestsFacade.getBeneficiaresByFilter(filters);
  }

  onFiltersSubmit() {
    this.search(this.form.value);
  }

  reset() {
    this.form.reset({
      first_name: '',
      last_name: '',
      phone: '',
      status: '',
      fixer: '',
      zone_address: '',
    });
    this.form.markAsUntouched();
    this.requestsFacade.getRequests();
  }
}

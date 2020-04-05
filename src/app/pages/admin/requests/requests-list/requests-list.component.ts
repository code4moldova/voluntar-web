import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { Observable, fromEvent, Subscription } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { IRequest, BeneficiaryField } from '@models/requests';
import { IUser } from '@models/user';
import { RequestsFacadeService } from '@services/requests/requests-facade.service';
import { UsersFacadeService } from '@services/users/users-facade.service';
import { GeolocationService } from '@services/geolocation/geolocation.service';
import { ZoneI } from '@models/geolocation';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.scss']
})
export class RequestsListComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['name', 'phone', 'hasMoney', 'city', 'status'];
  dataSource$: Observable<MatTableDataSource<IRequest>>;
  isLoading$ = this.requestsFacade.isLoading$;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('search') search: ElementRef;
  public criteriaFields = BeneficiaryField;
  public criteriaField: BeneficiaryField;
  public selectedId: string;
  public selectedArray: Observable<IUser[] | { list: ZoneI[] }> = null;
  private tempCriteria: BeneficiaryField;
  private users: Observable<IUser[]>;
  private zones: Observable<{ list: ZoneI[] }>;
  private subscription: Subscription;

  constructor(
    private requestsFacade: RequestsFacadeService,
    private usersFacadeService: UsersFacadeService,
    private geolocationService: GeolocationService,
  ) { }

  ngOnInit() {
    this.requestsFacade.getRequests();
    this.dataSource$ = this.requestsFacade.requests$.pipe(
      map(data => {
        const dataSource = new MatTableDataSource(data);
        dataSource.paginator = this.paginator;
        return dataSource;
      })
    );
    this.usersFacadeService.getUsers();
    this.users = this.usersFacadeService.users$;
    this.zones = this.geolocationService.getZones();
  }

  ngAfterViewInit(): void {
    const stream$ = fromEvent(this.search.nativeElement, 'keyup').pipe(
      map((event: Event) => (event.target as HTMLInputElement).value),
      debounceTime(1000),
      distinctUntilChanged(),
    );
    this.subscription = stream$.subscribe((value) => {
      if ((value || '').trim()) {
        this.requestsFacade.getBeneficiaresByFilter({ field: this.criteriaField, value });
      } else {
        this.requestsFacade.getRequests();
      }
    });
  }

  openedChange(opened: boolean) {
    if (!opened) {

      if (this.criteriaField) {
        this.selectedArray = BeneficiaryField['Zone Address'] === this.criteriaField ?
          this.zones : BeneficiaryField.Fixer === this.criteriaField ? this.users : null;
        if (this.tempCriteria !== this.criteriaField) {
          this.resetInput();
        }
        this.tempCriteria = this.criteriaField;
      }

      if (this.criteriaField === BeneficiaryField.None) {
        this.selectedArray = null;
        this.resetInput();
      }

    }

  }

  private resetInput() {
    if (this.search.nativeElement.value) {
      this.search.nativeElement.value = null;
      this.selectedId = null;
      this.search.nativeElement.dispatchEvent(new Event('keyup'));
    }
    else {
      this.selectedId = null;
      this.requestsFacade.getRequests();
    }
  }

  openedChangeSelected(opened: boolean) {
    if (!opened && this.selectedId) {
      this.requestsFacade.getBeneficiaresByFilter({ field: this.criteriaField, value: this.selectedId });
    }

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

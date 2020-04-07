import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RequestsFacadeService } from '@services/requests/requests-facade.service';
import {
  map,
  takeUntil,
  switchMap,
  tap,
  filter,
  debounceTime,
  distinctUntilChanged,
  finalize,
  exhaustMap,
  first,
} from 'rxjs/operators';
import { Subject, of, EMPTY, concat, Observable, combineLatest } from 'rxjs';
import { IRequestDetails } from '@models/requests';
// import { MatCheckboxChange } from '@angular/material/checkbox';
import { TagsFacadeService } from '@services/tags/tags-facade.service';
import { GeolocationService } from '@services/geolocation/geolocation.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ISectorTag } from '@models/tags';
import { VolunteersService } from '@services/volunteers/volunteers.service';
import { IVolunteer } from '@models/volunteers';
import { MatDialog } from '@angular/material/dialog';
import { VolunteerModalInfoComponent } from '../../volunteers/volunteer-modal-info/volunteer-modal-info.component';
import { EsriMapComponent } from '@shared/esri-map/esri-map.component';
import { UsersFacadeService } from '@services/users/users-facade.service';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss'],
})
export class RequestDetailsComponent implements OnInit, OnDestroy {
  statusOptions = [
    {
      label: 'New',
      value: 'new',
    },
    {
      label: 'Done',
      value: 'done',
    },
    {
      label: 'On Progress',
      value: 'onprogress',
    },
    {
      label: 'Review',
      value: 'review',
    },
  ];

  public cities = [
    { name: 'Chisinau', value: 'chisinau' },
    { name: 'Balti', value: 'balti' },
  ];

  currentRequestId: string;

  activityTypes$ = this.tagsFacade.activityTypesTags$;
  offers$ = this.tagsFacade.offersTags$.pipe(
    // Don't like this option, but it's good for now
    map(offers => offers.filter(offer => ['Livrarea', 'Transport'].includes(offer.ro)))
  );
  operators$ = this.usersFacade.users$;
  isLoading$ = concat(
    this.requestsFacade.isLoading$,
    this.tagsFacade.isLoading$
  );
  error$ = concat(this.requestsFacade.error$, this.tagsFacade.error$);

  fakeAddressControl = this.fb.control(null);

  form = this.fb.group({
    _id: [null],
    first_name: [null, Validators.required],
    last_name: [null, Validators.required],
    // email: [null, [Validators.required, Validators.email]],
    // password: [{ value: 'random', disabled: true }, Validators.required],
    phone: [null, Validators.required],
    is_active: [false, Validators.required],
    offer: [null, Validators.required],
    city: [null],
    address: [null, Validators.required],
    latitude: [null, Validators.required],
    longitude: [null, Validators.required],
    zone_address: [null, Validators.required],
    age: [null, [Validators.required, Validators.max(120)]],
    // activity_types: [[], Validators.required],
    have_money: [false, Validators.required],
    has_symptoms: [false, Validators.required],
    curator: [false, Validators.required],
    comments: [null, Validators.required],
    questions: [null, Validators.required],
    status: [{ value: 'new', disabled: true }, Validators.required],
    secret: [null, Validators.required],
    fixer: [null, Validators.required],
    volunteer: [null],
    availability_volunteer: [
      123,
      [Validators.required, Validators.min(0), Validators.max(23)],
    ],
  });

  volunteersNearbyIsLoading$ = new Subject();
  volunteersNearby$ = combineLatest([
    this.form.get('_id').valueChanges,
    this.form.get('is_active').valueChanges,
    this.requestsFacade.isLoading$.pipe(filter((status) => !status)),
  ]).pipe(
    exhaustMap(([id, isActive]) => {
      if (id && isActive) {
        this.volunteersNearbyIsLoading$.next(true);
        return this.volunteersService.getVolunteersNearbyRequest(id).pipe(
          map(({ list }) =>
            list.sort((v1, v2) => (v1.distance < v2.distance ? -1 : 1))
          ),
          map((volunteers) => (volunteers.length ? volunteers : null)),
          finalize(() => this.volunteersNearbyIsLoading$.next(false))
        );
      }
      return of(null);
    })
  );

  addressIsLoading$ = new Subject();
  addresses$ = this.fakeAddressControl.valueChanges.pipe(
    debounceTime(350),
    distinctUntilChanged(),
    filter((address) => address && address.length > 0),
    switchMap((address) => {
      this.addressIsLoading$.next(true);
      return this.geolocationService.getLocation(null, address).pipe(
        map((resp) => resp.candidates),
        finalize(() => {
          this.addressIsLoading$.next(false);
        })
      );
    })
  );

  zones$ = this.requestsFacade.zones$;
  private zones: ISectorTag[];

  componentDestroyed$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private requestsFacade: RequestsFacadeService,
    private tagsFacade: TagsFacadeService,
    private usersFacade: UsersFacadeService,
    private volunteersService: VolunteersService,
    private geolocationService: GeolocationService,
    private matDialog: MatDialog
  ) {
    this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        tap((id) => (this.currentRequestId = id)),
        tap((id) => {
          if (id) {
            this.form.get('password').disable();
            this.form.get('status').enable();
          } else {
            this.form.get('password').enable();
            this.form.get('status').disable();
          }
        }),
        tap((id) => id && this.requestsFacade.getRequestById(id)),
        switchMap((id) => {
          if (id) {
            return this.requestsFacade.requestDetails$;
          }
          return of({} as IRequestDetails);
        }),
        switchMap((request) => (request ? of(request) : EMPTY)),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe((request) => {
        this.form.patchValue(request);
        if (request.address) {
          this.fakeAddressControl.patchValue({ address: request.address });
        }
      });

    this.zones$.pipe(takeUntil(this.componentDestroyed$)).subscribe((z) => {
      this.zones = z;
    });
  }

  // activityChange({ checked, source }: MatCheckboxChange) {
  //   const activityTypesValue = this.form.get('activity_types').value;
  //   if (checked) {
  //     this.form
  //       .get('activity_types')
  //       .patchValue([...activityTypesValue, source.value]);
  //   } else {
  //     const filteredActivities = activityTypesValue.filter(
  //       (id: string) => id !== source.value
  //     );
  //     this.form.get('activity_types').patchValue(filteredActivities);
  //   }
  // }

  // isActivitySelected(activityId: string) {
  //   return this.form.get('activity_types').value?.includes(activityId);
  // }

  showVolunteerInfoModal(volunteer: IVolunteer) {
    this.matDialog.open(VolunteerModalInfoComponent, {
      data: volunteer,
      width: '450px',
      maxWidth: '100%',
    });
  }

  getThemeColor(volunteer: IVolunteer) {
    if (volunteer.accepted_offer) {
      return 'primary';
    } else if (!volunteer.telegram_chat_id) {
      return 'warn';
    }
    return 'accent';
  }

  getTooltip(volunteer: IVolunteer) {
    if (volunteer.accepted_offer) {
      return 'Offer Accepted';
    } else if (!volunteer.telegram_chat_id) {
      return 'Doesn\'t have Telegram';
    }
    return 'Volunteer Info';
  }

  showMapDialog() {
    this.matDialog
      .open<
        EsriMapComponent,
        { coors: number[]; address: string },
        { latitude: number; longitude: number; address: string }
      >(EsriMapComponent, {
        data: {
          coors: [
            this.form.get('latitude').value,
            this.form.get('longitude').value,
          ],
          address: this.fakeAddressControl.value?.address,
        },
        panelClass: 'esri-map',
        width: '80%',
        height: '80%',
        maxWidth: '100%',
        maxHeight: '100%',
      })
      .afterClosed()
      .pipe(first())
      .subscribe((coors) => {
        if (coors) {
          this.form.get('latitude').patchValue(coors.latitude);
          this.form.get('longitude').patchValue(coors.longitude);
          this.form.get('address').patchValue(coors.address);
          this.fakeAddressControl.patchValue({ address: coors.address });
        }
      });
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  onSubmit() {
    if (this.form.valid) {
      let data = this.form.getRawValue();
      const sector = data.zone_address;
      if (typeof sector === 'object') {
        data = {
          ...data,
          zone_address: sector._id,
        };
      }
      this.requestsFacade.saveRequest(data);
    } else {
      console.log('Invalid form', this.form);
    }
  }

  displayFn(value: any) {
    if (value) {
      return value.address;
    }
  }

  showZoneLabel(value: any) {
    if (value) {
      // Hacky way to get Sector name
      if (typeof value === 'string') {
        const zone = this.zones
          ? this.zones.find((z) => z._id === value)
          : null;
        return zone ? zone.ro : value;
      }
      return typeof value === 'string' ? value : value.ro;
    }
    return '';
  }

  patchZoneControl(event: MatAutocompleteSelectedEvent) {
    const value = event.option.value;
    if (value) {
      this.form.get('zone_address').patchValue(value._id);
    }
  }

  onAddressSelected(event: MatAutocompleteSelectedEvent) {
    const value = event.option.value;
    if (value) {
      // const [street, city] = value.address.split(', ');
      // const geo = value.location
      //   ? `${value.location.y}, ${value.location.x}`
      //   : null;
      this.form.get('address').patchValue(value.address);
      this.form.get('latitude').patchValue(value.location.y);
      this.form.get('longitude').patchValue(value.location.x);
    }
  }
}

import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RequestsFacadeService } from '@services/requests/requests-facade.service';
import {
  map,
  takeUntil,
  switchMap,
  tap,
  filter,
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';
import { Subject, of, EMPTY, concat, fromEvent, Observable } from 'rxjs';
import { IRequestDetails } from '@models/requests';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { TagsFacadeService } from '@services/tags/tags-facade.service';
import { GeolocationService } from '@services/geolocation/geolocation.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss']
})
export class RequestDetailsComponent implements OnInit, OnDestroy {
  statusOptions = [
    {
      label: 'New',
      value: 'new'
    },
    {
      label: 'Done',
      value: 'done'
    },
    {
      label: 'On Progress',
      value: 'onprogress'
    },
    {
      label: 'Review',
      value: 'review'
    }
  ];

  fakeAddressControl = this.fb.control(null);

  form = this.fb.group({
    _id: [null],
    first_name: [null, Validators.required],
    last_name: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    password: [{ value: 'random', disabled: true }, Validators.required],
    phone: [null, Validators.required],
    is_active: [false, Validators.required],
    // city: [null, Validators.required],
    address: [null, Validators.required],
    // geo: [null, Validators.required],
    latitude: [null, Validators.required],
    longitude: [null, Validators.required],
    zone_address: [null, Validators.required],
    age: [null, [Validators.required, Validators.max(120)]],
    activity_types: [[], Validators.required],
    have_money: [false, Validators.required],
    comments: [null, Validators.required],
    questions: [null, Validators.required],
    status: [{ value: 'new', disabled: true }, Validators.required],
    secret: [null, Validators.required],
    availability_volunteer: [
      null,
      [Validators.required, Validators.min(0), Validators.max(23)]
    ]
  });
  currentRequestId: string;

  activityTypes$ = this.tagsFacade.activityTypesTags$;
  isLoading$ = concat(
    this.requestsFacade.isLoading$,
    this.tagsFacade.isLoading$
  );
  error$ = concat(this.requestsFacade.error$, this.tagsFacade.error$);

  componentDestroyed$ = new Subject();
  addresses$: Observable<any[]>;
  addressIsLoading$ = new Subject();
  zones$ = this.requestsFacade.zones$;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private requestsFacade: RequestsFacadeService,
    private tagsFacade: TagsFacadeService,
    private geolocationService: GeolocationService
  ) {
    this.route.paramMap
      .pipe(
        map(params => params.get('id')),
        tap(id => (this.currentRequestId = id)),
        tap(id => {
          if (id) {
            this.form.get('password').disable();
            this.form.get('status').enable();
          } else {
            this.form.get('password').enable();
            this.form.get('status').disable();
          }
        }),
        tap(id => id && this.requestsFacade.getRequestById(id)),
        switchMap(id => {
          if (id) {
            return this.requestsFacade.requestDetails$;
          }
          return of({} as IRequestDetails);
        }),
        switchMap(request => (request ? of(request) : EMPTY)),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(request => {
        this.form.patchValue(request);
      });
  }

  activityChange({ checked, source }: MatCheckboxChange) {
    const activityTypesValue = this.form.get('activity_types').value;
    if (checked) {
      this.form
        .get('activity_types')
        .setValue([...activityTypesValue, source.value]);
    } else {
      const filteredActivities = activityTypesValue.filter(
        (id: string) => id !== source.value
      );
      this.form.get('activity_types').setValue(filteredActivities);
    }
  }

  isActivitySelected(activityId: string) {
    return this.form.get('activity_types').value.includes(activityId);
  }

  ngOnInit() {
    this.tagsFacade.getActivityTypesTags();

    this.addresses$ = this.fakeAddressControl.valueChanges.pipe(
      debounceTime(350),
      distinctUntilChanged(),
      filter(address => address && address.length > 0),
      switchMap(address => {
        return this.onAddressChange(address);
      })
    );
  }

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
          zone_address: sector._id
        };
      }
      this.requestsFacade.saveRequest(data);
    } else {
      console.log('Invalid form', this.form);
    }
  }

  onAddressChange(address: string) {
    this.addressIsLoading$.next(true);
    return this.geolocationService.getLocation(null, address).pipe(
      map(resp => resp.candidates),
      tap(() => {
        this.addressIsLoading$.next(false);
      })
    );
  }

  displayFn(value: any) {
    if (value) {
      return value.address;
    }
  }

  showZoneLabel(value: any) {
    if (value) {
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
      const [street, city] = value.address.split(', ');
      const geo = value.location
        ? `${value.location.y}, ${value.location.x}`
        : null;
      this.form.get('address').patchValue(street);
      // this.form.get('city').patchValue(city);
      // this.form.get('geo').patchValue(geo);
      this.form.get('latitude').patchValue(value.location.y);
      this.form.get('longitude').patchValue(value.location.x);
    }
  }

  updateAddress(address) {
    this.form.patchValue({
      address: address.address,
      geo: address.location.y + ',' + address.location.x
    });
  }
}

import {
  Component,
  OnInit,
  ElementRef,
  OnDestroy,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  ViewEncapsulation,
  SimpleChanges,
} from '@angular/core';
import {
  Validators,
  FormBuilder,
  AbstractControl,
  FormArray,
} from '@angular/forms';
import {
  map,
  finalize,
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  takeUntil,
  first,
  startWith,
  catchError,
  exhaustMap,
  tap,
} from 'rxjs/operators';
import {
  Subject,
  Observable,
  EMPTY,
  of,
  combineLatest,
  concat,
  BehaviorSubject,
} from 'rxjs';
import { IVolunteer } from '@models/volunteers';
import { ISectorTag } from '@models/tags';
import { IRequest, IRequestDetails } from '@models/requests';
import { RequestsFacadeService } from '@services/requests/requests-facade.service';
import { TagsFacadeService } from '@services/tags/tags-facade.service';
import { UsersFacadeService } from '@services/users/users-facade.service';
import { GeolocationService } from '@services/geolocation/geolocation.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VolunteerModalInfoComponent } from '../../volunteers/volunteer-modal-info/volunteer-modal-info.component';
import { EsriMapComponent } from '@shared/esri-map/esri-map.component';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { VolunteersService } from '@services/volunteers/volunteers.service';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // encapsulation: ViewEncapsulation.None
})
export class RequestFormComponent implements OnInit, OnDestroy, OnChanges {
  @Input() request: IRequestDetails;
  @Input() mode: 'new' | 'edit';

  public statusOptions = this.tagsFacade.getStatusOptions();

  public cities = [
    { name: 'Chisinau', value: 'chisinau' },
    { name: 'Balti', value: 'balti' },
  ];

  public objectKeys = Object.keys;

  // activityTypes$ = this.tagsFacade.activityTypesTags$;
  offers$ = this.tagsFacade.offersTags$.pipe(
    // Don't like this option, but it's good for now
    map((offers) =>
      offers.filter((offer) => ['Livrarea', 'Transport'].includes(offer.ro))
    )
  );

  operators$ = this.usersFacade.users$;
  isLoading$ = concat(
    this.requestsFacade.isLoading$,
    this.tagsFacade.isLoading$
  );
  error$ = concat(this.requestsFacade.error$, this.tagsFacade.error$);

  fakeAddressControl = this.fb.control(null);
  formSubmitted = false;
  public autoImport = null;

  form = this.fb.group({
    _id: [null],
    first_name: [null, Validators.required],
    last_name: [null, Validators.required],
    phone: [
      null,
      [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
    ],
    is_active: [false, Validators.required],
    urgent: [false, Validators.required],
    offer: [null, Validators.required],
    city: [null],
    address: [null, Validators.required],
    latitude: [null, Validators.required],
    longitude: [null, Validators.required],
    zone_address: [null, Validators.required],
    age: [null, [Validators.required, Validators.max(120)]],
    have_money: [false, Validators.required],
    has_symptoms: [false, Validators.required],
    curator: [false, Validators.required],
    has_disabilities: [false, Validators.required],
    black_list: [false, Validators.required],

    comments: [null, Validators.required],
    fixer_comment: [null, Validators.required],
    questions: [null, Validators.required],
    additional_info: this.fb.array([]),
    status: [{ value: 'new', disabled: true }, Validators.required],
    secret: [null, Validators.required],
    fixer: [null, Validators.required],
    volunteer: [null],
  });

  additionalInfoForm = this.fb.group({
    paying_by_card: false,
    warm_lunch: false,
    grocery: false,
    medicine: false,
  });

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
  beneficiar$: Observable<IRequest[]>;

  volunteersNearbyIsLoading$ = new Subject();
  volunteersNearby$ = combineLatest([
    this.form.get('_id').valueChanges,
    this.form.get('is_active').valueChanges,
    // this.requestsFacade.isLoading$.pipe(filter((status) => !status)),
  ]).pipe(
    exhaustMap(([id, isActive]) => {
      if (id && isActive) {
        this.volunteersNearbyIsLoading$.next(true);
        return this.volunteersService.getVolunteersNearbyRequest(id).pipe(
          map(({ list }) =>
            list.length
              ? [
                  list
                    .filter((v) => v.count < 2)
                    .sort((v1, v2) => (v1.distance < v2.distance ? -1 : 1)),
                  list
                    .filter((v) => v.count >= 2)
                    .sort((v1, v2) => (v1.distance < v2.distance ? -1 : 1)),
                ]
              : null
          ),
          finalize(() => this.volunteersNearbyIsLoading$.next(false))
        );
      }
      return of(null as IVolunteer[][]);
    })
  );

  isSearchingByPhone$ = new BehaviorSubject(false);

  constructor(
    private fb: FormBuilder,
    private requestsFacade: RequestsFacadeService,
    private volunteersService: VolunteersService,
    private tagsFacade: TagsFacadeService,
    private usersFacade: UsersFacadeService,
    private geolocationService: GeolocationService,
    private matDialog: MatDialog,
    private elementRef: ElementRef,
    private snackBar: MatSnackBar
  ) {
    this.zones$.pipe(takeUntil(this.componentDestroyed$)).subscribe((z) => {
      this.zones = z;
    });

    this.additionalInfoForm.valueChanges.subscribe((infoValues) => {
      const additionalInfoArray = this.form.get('additional_info') as FormArray;
      additionalInfoArray.clear();
      Object.keys(infoValues).forEach((key) => {
        if (infoValues[key]) {
          additionalInfoArray.push(this.fb.control(key));
        }
      });
    });
  }

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

  get phone(): AbstractControl {
    return this.form.get('phone');
  }
  get first_name(): AbstractControl {
    return this.form.get('first_name');
  }
  get last_name(): AbstractControl {
    return this.form.get('last_name');
  }

  ngOnInit() {
    // this.beneficiar$ = this.requestsFacade.requests$;
    const search$ = this.phone.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      catchError(() => EMPTY)
    );

    this.beneficiar$ = search$.pipe(
      takeUntil(this.componentDestroyed$),
      filter(() => this.mode === 'new'),
      filter((phone) => phone && phone.length > 0),
      tap(() => {
        this.isSearchingByPhone$.next(true);
      }),
      switchMap((phone) =>
        this.requestsFacade
          .getRequestByPhone(phone)
          .pipe(catchError((e) => of({ list: [] })))
      ),
      tap(() => {
        this.isSearchingByPhone$.next(false);
      }),
      map((res) => res.list)
    );
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
    // this.subscription.unsubscribe();
    this.form.reset();
    this.form.markAsUntouched();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.request) {
      this.updateAdditionalInfoForm();
      this.form.patchValue(this.request);
      this.form.get('status').enable();
      if (!this.request.volunteer) {
        this.form.get('volunteer').reset();
      }
      if (this.request.address) {
        this.fakeAddressControl.patchValue({ address: this.request.address });
      }
    } else {
      // this.form.reset();
      this.form.markAsUntouched();
      if (this.mode === 'new') {
        this.tagsFacade
          .getRandomWord()
          .pipe(first())
          .subscribe((secret) => {
            this.form.get('secret').setValue(secret);
          });
      }
    }
  }

  updateAdditionalInfoForm() {
    const { additional_info } = this.request;
    if (additional_info && additional_info.length > 0) {
      this.additionalInfoForm.reset();
      additional_info.forEach((info) => {
        // (this.form.get('additional_info') as FormArray).push(this.fb.control(info));
        this.additionalInfoForm.get(info).patchValue(true);
      });
    }
  }

  onSubmit() {
    this.formSubmitted = true;
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
      this.formSubmitted = false;
      // combineLatest([
      //   this.requestsFacade.isLoading$,
      //   this.requestsFacade.error$,
      // ]).pipe(filter(([status, error]) => !status && !error), first()).subscribe(() => {
      //   this.router.navigateByUrl('/admin/requests/list');
      // });
    } else {
      this.getInvalidControls();
      this.snackBar.open('Update required fields', '', {
        duration: 5000,
        panelClass: 'info',
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      const element = this.elementRef.nativeElement.querySelector(
        '.ng-invalid:not(form)'
      );
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  getInvalidControls() {
    const controls = this.form.controls;
    Object.keys(controls).forEach((key) => {
      const control = controls[key];
      if (control.invalid) {
        console.log(key, control);
      }
    });
  }

  get addressIsInvalid() {
    const city = this.form.get('city');
    const address = this.form.get('address');
    const lat = this.form.get('latitude');
    const lng = this.form.get('longitude');
    return city.invalid || address.invalid || lat.invalid || lng.invalid;
  }

  displayFn(value: any) {
    if (value) {
      return value.address;
    }
  }

  insertAuto(bnf: MatAutocompleteSelectedEvent) {
    const requestData: IRequestDetails = bnf.option.value;
    const personRelatedProps = [
      'address',
      'city',
      'age',
      'black_list',
      'email',
      'first_name',
      'has_disabilities',
      'has_symptoms',
      'last_name',
      'latitude',
      'longitude',
      'phone',
      'zone_address',
    ];
    Object.keys(this.form.controls).forEach((key) => {
      if (personRelatedProps.includes(key)) {
        this.form
          .get(key)
          .patchValue(requestData[key], { emitEvent: false, onlySelf: true });
      }
    });
    if (requestData.address) {
      this.fakeAddressControl.patchValue({ address: requestData.address });
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
      //   ? `${ value.location.y }, ${ value.location.x } `
      //   : null;
      this.form.get('address').patchValue(value.address);
      this.form.get('latitude').patchValue(value.location.y);
      this.form.get('longitude').patchValue(value.location.x);
    }
  }

  queryResult(criteria: { [keys: string]: string }) {
    this.requestsFacade.getRequests({ pageSize: 1000, pageIndex: 1 }, criteria);
  }
}

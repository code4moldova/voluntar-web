import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { VolunteersFacadeService } from '@services/volunteers/volunteers-facade.service';
import {
  map,
  takeUntil,
  filter,
  tap,
  switchMap,
  skipWhile,
  debounceTime,
  distinctUntilChanged,
  finalize,
  first,
} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Subject, of, EMPTY } from 'rxjs';
import { IVolunteer } from '@models/volunteers';
import { TagsFacadeService } from '@services/tags/tags-facade.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { GeolocationService } from '@services/geolocation/geolocation.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { EsriMapComponent } from '@shared/esri-map/esri-map.component';

const minTemp = 36;
const maxTemp = 41;

@Component({
  selector: 'app-volunteers-details',
  templateUrl: './volunteers-details.component.html',
  styleUrls: ['./volunteers-details.component.scss'],
})
export class VolunteersDetailsComponent implements OnInit, OnDestroy {
  public tempStep = '0.1';
  zones = [
    {
      label: 'Centru',
      value: 'centru',
    },
  ];
  public cities = [
    { name: 'Chisinau', value: 'chisinau' },
    { name: 'Balti', value: 'balti' },
  ];

  fakeAddressControl = this.fb.control(null);

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

  form = this.fb.group({
    _id: [null],
    first_name: [null, Validators.required],
    last_name: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    phone: [
      null,
      [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
    ],
    telegram_id: [null],
    // gender: ['male', Validators.required],
    address: [null, Validators.required],
    latitude: [null, Validators.required],
    longitude: [null, Validators.required],
    zone_address: [null, Validators.required],
    is_active: [false, Validators.required],
    facebook_profile: [null, Validators.required],
    age: [null, Validators.required],
    availability: [null, Validators.required],
    activity_types: [[], Validators.required],
    password: [{ value: 'random', disabled: true }, Validators.required],
    created_by: [null, [Validators.maxLength(500)]],
    team: [null, [Validators.maxLength(500)]],
    profession: [null, [Validators.maxLength(500)]],
    comments: [null, [Validators.maxLength(500)]],
    last_temperature: [minTemp, [Validators.required, ValidateTemperature]],
    need_sim_unite: [null, Validators.required],
    new_volunteer: [true, Validators.required],
    black_list: [null, Validators.required],
    received_cards: [null, Validators.required],
    sent_photo: [null, Validators.required],
    offer: [null],
    received_contract: [null],
    aggreed_terms: [true],
    city: ['chisinau'],
  });
  currentVolunteeerId: string;
  componentDestroyed$ = new Subject();
  isLoading$ = this.volunteerFacade.isLoading$;
  error$ = this.volunteerFacade.error$;

  ages$ = this.tagsFacade.agesTags$;
  availabilities$ = this.tagsFacade.availabilitiesTags$;
  teams$ = this.tagsFacade.teamsTags$;
  offers$ = this.tagsFacade.offersTags$;

  activityTypes$ = this.tagsFacade.activityTypesTags$;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private volunteerFacade: VolunteersFacadeService,
    private tagsFacade: TagsFacadeService,
    private geolocationService: GeolocationService,
    private matDialog: MatDialog
  ) {
    this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        tap((id) => (this.currentVolunteeerId = id)),
        takeUntil(this.componentDestroyed$)
      )
      // .subscribe(volunteer => {
      .subscribe((id) => {
        this.currentVolunteeerId = id;
        if (id) {
          this.volunteerFacade.getVolunteerById(id);
          this.form.get('password').disable();
        } else {
          this.form.get('password').enable();
        }
      });
  }

  ngOnInit() {
    this.volunteerFacade.volunteerDetails$
      .pipe(
        filter((volunteer) => !!volunteer),
        // Fix issue switching between 'new' and 'details' page
        map((volunteer) => (this.currentVolunteeerId ? volunteer : {})),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe((volunteer) => {
        this.form.patchValue(volunteer);
      });
  }

  activityChange({ checked, source }: MatCheckboxChange) {
    const activityTypesValue = this.activity_types.value;
    if (checked) {
      this.activity_types.patchValue([...activityTypesValue, source.value]);
    } else {
      const filteredActivities = activityTypesValue.filter(
        (id: string) => id !== source.value
      );
      this.activity_types.patchValue(filteredActivities);
    }
  }

  isActivitySelected(activityId: string) {
    return this.activity_types.value.includes(activityId);
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  onSubmit() {
    if (this.form.valid) {
      this.volunteerFacade.saveVolunteer(this.form.getRawValue());
    } else {
      console.log('invalid form', this.form);
    }
  }

  displayFn(value: any) {
    if (value) {
      return value.address;
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

  get created_by() {
    return this.form.get('created_by');
  }
  get team() {
    return this.form.get('team');
  }
  get profesia() {
    return this.form.get('profesia');
  }
  get profession() {
    return this.form.get('profession');
  }
  get comments() {
    return this.form.get('comments');
  }
  get last_temperature() {
    return this.form.get('last_temperature');
  }
  get need_sim_unite() {
    return this.form.get('need_sim_unite');
  }
  get new_volunteer() {
    return this.form.get('new_volunteer');
  }
  get black_list() {
    return this.form.get('black_list');
  }
  get received_cards() {
    return this.form.get('received_cards');
  }
  get sent_photo() {
    return this.form.get('sent_photo');
  }
  get received_contract() {
    return this.form.get('received_contract');
  }
  get aggreed_terms() {
    return this.form.get('aggreed_terms');
  }
  get activity_types() {
    return this.form.get('activity_types');
  }
}

export function ValidateTemperature(control: AbstractControl) {
  if (control.value && (isNaN(control.value) || control.value < minTemp)) {
    return { minlength: { requiredLength: minTemp } };
  }
  if (control.value && (isNaN(control.value) || control.value > maxTemp)) {
    return { maxlength: { requiredLength: maxTemp } };
  }
  return null;
}

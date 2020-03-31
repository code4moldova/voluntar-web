import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { VolunteersFacadeService } from '@services/volunteers/volunteers-facade.service';
import {
  map,
  takeUntil,
  filter,
  tap,
  switchMap,
  skipWhile
} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Subject, of, EMPTY } from 'rxjs';
import { IVolunteer } from '@models/volunteers';

@Component({
  selector: 'app-volunteers-details',
  templateUrl: './volunteers-details.component.html',
  styleUrls: ['./volunteers-details.component.scss']
})
export class VolunteersDetailsComponent implements OnInit, OnDestroy {
  zones = [
    {
      label: 'Centru',
      value: 'centru'
    }
  ];
  form = this.fb.group({
    _id: [null],
    first_name: [null, Validators.required],
    last_name: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    phone: [null, Validators.required],
    telegram_id: [null],
    // gender: ['male', Validators.required],
    address: [null, Validators.required],
    zone_address: [null, Validators.required],
    is_active: [false, Validators.required],
    facebook_profile: [null, Validators.required],
    age: [null, Validators.required],
    availability: [null, Validators.required],
    activity_types: [null, Validators.required],
    password: [{ value: 'random', disabled: true }, Validators.required]
  });
  currentVolunteeerId: string;
  componentDestroyed$ = new Subject();
  isLoading$ = this.volunteerFacade.isLoading$;
  error$ = this.volunteerFacade.error$;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private volunteerFacade: VolunteersFacadeService
  ) {
    this.route.paramMap
      .pipe(
        map(params => params.get('id')),
        tap(id => (this.currentVolunteeerId = id)),
        takeUntil(this.componentDestroyed$)
      )
      // .subscribe(volunteer => {
      .subscribe(id => {
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
        filter(volunteer => !!volunteer),
        // Fix issue switching between 'new' and 'details' page
        map(volunteer => (this.currentVolunteeerId ? volunteer : {})),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(volunteer => {
        console.log(volunteer);
        this.form.patchValue(volunteer);
      });
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
}

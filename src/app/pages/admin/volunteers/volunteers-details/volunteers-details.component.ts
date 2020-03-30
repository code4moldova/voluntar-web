import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { VolunteersFacadeService } from '@services/volunteers/volunteers-facade.service';
import { map, takeUntil, filter, tap, switchMap, skipWhile } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Subject, of, EMPTY } from 'rxjs';
import { IVolunteer } from '@models/volunteers';

@Component({
  selector: 'app-volunteers-details',
  templateUrl: './volunteers-details.component.html',
  styleUrls: ['./volunteers-details.component.scss']
})
export class VolunteersDetailsComponent implements OnInit, OnDestroy {
  form = this.fb.group({
    id: [null],
    first_name: [null, Validators.required],
    last_name: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    gender: ['male', Validators.required],
    // address: [null, Validators.required],
    status: [false, Validators.required],
    // zone: [null, Validators.required],
    // date: [null, Validators.required], // Im not sure if it needs to be here
    social_profile: [null, Validators.required],
    age: [null, Validators.required],
    available_hours: [null, Validators.required],
    activity_type: [null, Validators.required] // Not sure what's this
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
        tap(id => id && this.volunteerFacade.getVolunteerById(+id)),
        switchMap(id => {
          if (id) {
            return this.volunteerFacade.volunteerDetails$;
          }
          return of({} as IVolunteer);
        }),
        switchMap(volunteer => volunteer ? of(volunteer) : EMPTY),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(volunteer => {
        this.form.patchValue(volunteer);
      });
  }

  ngOnInit() {
    // this.volunteerFacade.volunteerDetails$
    //   .pipe(
    //     filter(volunteer => !!volunteer),
    //     // Fix issue switching between 'new' and 'details' page
    //     map(volunteer => this.currentVolunteeerId ? volunteer : {}),
    //     takeUntil(this.componentDestroyed$)
    //   )
    //   .subscribe(volunteer => {
    //     this.form.patchValue(volunteer);
    //   });
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  onSubmit() {
    if (this.form.valid) {
      this.volunteerFacade.saveVolunteer(this.form.value);
    }
  }
}

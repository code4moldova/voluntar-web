import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RequestsFacadeService } from '@services/requests/requests-facade.service';
import { map, takeUntil, switchMap, tap, filter } from 'rxjs/operators';
import { Subject, of, EMPTY } from 'rxjs';
import { IRequestDetails } from '@models/requests';
import { MatCheckboxChange } from '@angular/material/checkbox';

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

  form = this.fb.group({
    _id: [null],
    first_name: [null, Validators.required],
    last_name: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    password: [{ value: 'random', disabled: true }, Validators.required],
    phone: [null, [Validators.required, Validators.min(10000000), Validators.max(99999999)]],
    is_active: [false, Validators.required],
    address: [null, Validators.required],
    zone_address: [null, Validators.required],
    age: [null, [Validators.required, Validators.max(120)]],
    activity_types: [['5e84d98882bb3583f0ad3c62']],
    have_money: [false, Validators.required],
    comments: [null, Validators.required],
    questions: [null, Validators.required],
    status: [{ value: 'new', disabled: true }, Validators.required],
    secret: [null, Validators.required],
    availability_volunteer: [null, [Validators.required, Validators.min(0), Validators.max(23)]],
  });

  // TODO: Get from API
  activityTypes$ = of([
    {
      _id: '5e84d98882bb3583f0ad3c62',
      created_by: 'test@test.com',
      en: 'text in en',
      is_active: true,
      ro: 'Serviciu de preluare a apelurilor la linia verde a Direcției Generale Asistența Socială',
      ru: 'Прием звонков зеленой линии Главного Управления Социальной Защиты',
    },
    {
      _id: '5e84d96282bb3583f0ad3c61',
      created_by: 'test@test.com',
      en: 'text in en',
      is_active: true,
      ro: 'Aprovizionarea cu produse alimentare/medicamente',
      ru: 'Снабжение продовольствием/медикаментани нуждающихся',
      select: 'activity_types'
    }
  ]);

  currentRequestId: string;
  isLoading$ = this.requestsFacade.isLoading$;
  error$ = this.requestsFacade.error$;

  componentDestroyed$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private requestsFacade: RequestsFacadeService
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
        switchMap(request => request ? of(request) : EMPTY),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(request => {
        this.form.patchValue(request);
      });
  }

  activityChange(event: MatCheckboxChange) {
    const activityTypesValue = this.form.get('activity_types').value;
    if (event.checked) {
      this.form.get('activity_types').setValue([...activityTypesValue, event.source.value]);
    } else {
      const index = activityTypesValue.indexOf(event.source.value);
      this.form.get('activity_types').setValue(activityTypesValue.filter((id: string) => id !== event.source.value));
    }
  }

  isActivitySelected(activityId: string) {
    return this.form.get('activity_types').value.includes(activityId);
  }

  ngOnInit() {
    // this.requestsFacade.requestDetails$
    //   .pipe(
    //     filter(request => !!request),
    //     map(request => (this.currentRequestId ? request : {})),
    //     takeUntil(this.componentDestroyed$)
    //   )
    //   .subscribe(request => {
    //     this.form.patchValue(request);
    //   });
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  onSubmit() {
    if (this.form.valid) {
      this.requestsFacade.saveRequest(this.form.getRawValue());
    } else {
      console.log('Invalid form', this.form);
    }
  }
}

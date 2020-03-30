import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RequestsFacadeService } from '@services/requests/requests-facade.service';
import { map, takeUntil, switchMap, skipWhile, tap } from 'rxjs/operators';
import { Subject, of, EMPTY } from 'rxjs';
import { IRequest } from '@models/requests';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss']
})
export class RequestDetailsComponent implements OnInit, OnDestroy {
  form = this.fb.group({
    id: [null],
    first_name: [null, Validators.required],
    last_name: [null, Validators.required],
    address: [null, Validators.required],
    city: [null, Validators.required],
    geo: [null, Validators.required],
    date: [null, Validators.required],
    status: [false, Validators.required],
    phone: [null, Validators.required],
    apartment_nr: [null, Validators.required],
    request: [null, Validators.required],
    has_money: [false, Validators.required],
    curator: [false, Validators.required]
    // comments: [null, Validators.required],
  });

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
        tap(id => id && this.requestsFacade.getRequestById(+id)),
        switchMap(id => {
          if (id) {
            return this.requestsFacade.requestDetails$;
          }
          return of({} as IRequest);
        }),
        switchMap(request => request ? of(request) : EMPTY),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(request => {
        this.form.patchValue(request);
      });
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
    console.log(this.form.valid);
    if (this.form.valid) {
      this.requestsFacade.saveRequest(this.form.value);
    }
  }
}

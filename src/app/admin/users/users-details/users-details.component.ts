import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, takeUntil, tap, filter } from 'rxjs/operators';
import { UsersFacade } from '../users.facade';
import { Subject } from 'rxjs';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  templateUrl: './users-details.component.html',
})
export class UsersDetailsComponent implements OnInit, OnDestroy {
  componentDestroyed$ = new Subject();
  isLoading$ = this.usersFacade.isLoading$;
  id: string;
  form: FormGroup = this.fb.group(
    {
      _id: [null],
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: [
        null,
        [Validators.required, Validators.maxLength(8), Validators.minLength(8)],
      ],
      is_active: [true, Validators.required],
      password: [{ value: 'random', disabled: true }, Validators.required],
      repeatPassword: [{ value: null, disabled: true }, Validators.required],
      roles: [null],
    },
    {
      validators: this.passwordMatch,
    }
  );
  availableRoles = ['admin', 'fixer', 'operator'];
  matcher = new MyErrorStateMatcher();
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private usersFacade: UsersFacade
  ) {
    this.route.paramMap
      .pipe(map((params) => params.get('id')))
      .subscribe((id) => {
        this.id = id;
        if (id) {
          this.usersFacade.getUserById(id);
          this.form.get('password').disable();
          this.form.get('repeatPassword').disable();
        } else {
          this.form.get('password').enable();
          this.form.get('repeatPassword').enable();
        }
      });
  }

  ngOnInit(): void {
    this.usersFacade.userDetails$
      .pipe(
        filter((volunteer) => !!volunteer),
        // Fix issue switching between 'new' and 'details' page
        map((volunteer) => (this.id ? volunteer : {})),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe((volunteer) => {
        this.form.patchValue(volunteer);
      });
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  onSubmit() {
    if (this.form.valid) {
      this.form.get('repeatPassword').disable();
      this.usersFacade.saveUser(this.form.value);
    }
  }

  passwordMatch(form: AbstractControl) {
    const pass = form.get('password');
    const repeatPass = form.get('repeatPassword');
    if (pass.disabled || repeatPass.disabled) {
      return null;
    }
    return pass.value === repeatPass.value
      ? null
      : {
          notMatch: true,
        };
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const passwordCtrl = control.parent && control.parent.get('password');
    const invalidCtrl = !!(
      control &&
      (form.submitted || control.dirty) &&
      passwordCtrl.dirty &&
      passwordCtrl.value !== control.value
    );
    const invalidParent = !!(form && form.invalid && form.dirty);

    return invalidCtrl && invalidParent;
  }
}

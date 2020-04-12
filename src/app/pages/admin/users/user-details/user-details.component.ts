import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, takeUntil, tap, filter } from 'rxjs/operators';
import { UsersFacadeService } from '@services/users/users-facade.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  componentDestroyed$ = new Subject();
  isLoading$ = this.usersFacade.isLoading$;
  id: string;
  form: FormGroup;
  availableRoles = ['admin', 'fixer', 'operator'];
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private usersFacade: UsersFacadeService
  ) {
    this.form = this.fb.group({
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
      roles: [null],
    });

    this.route.paramMap
      .pipe(map((params) => params.get('id')))
      .subscribe((id) => {
        this.id = id;
        if (id) {
          this.usersFacade.getUserById(id);
          this.form.get('password').disable();
        } else {
          this.form.get('password').enable();
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
        this.form.setValue(volunteer);
      });
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  onSubmit() {
    if (this.form.valid) {
      this.usersFacade.saveUser(this.form.value);
    } else {
      console.log('invalid form', this.form);
    }
  }
}

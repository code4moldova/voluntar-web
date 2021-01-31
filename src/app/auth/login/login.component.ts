import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DemandsFacade } from '@demands/demands.facade';
import { environment } from 'src/environments/environment';
import { AuthFacade } from '../auth.facade';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form = this.fb.group({
    login: [null, Validators.required],
    password: [null, Validators.required],
  });
  isLoading$ = this.authFacade.isLoading$;
  isTestEnvironment = !environment.production;

  constructor(
    private fb: FormBuilder,
    private authFacade: AuthFacade,
    private demandsFacade: DemandsFacade,
  ) {}

  ngOnInit() {
    this.demandsFacade.toggleNewRequestsPolling(false);
  }

  onSubmit() {
    this.authFacade.loginUser(this.form.value);
  }
}

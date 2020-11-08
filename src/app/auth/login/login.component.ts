import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RequestsFacade } from '@requests/requests.facade';
import { environment } from 'src/environments/environment';
import { AuthFacade } from '../auth.facade';

@Component({
  selector: 'app-login',
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
    private requestsFacade: RequestsFacade
  ) {}

  ngOnInit() {
    this.requestsFacade.toggleNewRequestsPolling(false);
  }

  onSubmit() {
    if (this.form.valid) {
      this.authFacade.loginUser(this.form.value);
    }
  }
}

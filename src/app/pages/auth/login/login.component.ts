import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserFacadeService } from 'src/app/services/auth/user-facade.service';
import { RequestsFacade } from '../../admin/requests/requests.facade';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isLoading$ = this.userFacade.isLoading$;
  isTestEnvironment = !environment.production;
  constructor(
    private fb: FormBuilder,
    private userFacade: UserFacadeService,
    private requestsFacade: RequestsFacade
  ) {
    this.form = this.fb.group({
      login: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.requestsFacade.toggleNewRequestsPolling(false);
  }

  onSubmit() {
    if (this.form.valid) {
      this.userFacade.loginUser(this.form.value);
    }
  }
}

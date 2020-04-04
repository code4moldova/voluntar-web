import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserFacadeService } from 'src/app/services/auth/user-facade.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isLoading$ = this.userFacade.isLoading$;
  constructor(private fb: FormBuilder, private userFacade: UserFacadeService) {
    this.form = this.fb.group({
      login: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.form.valid) {
      this.userFacade.loginUser(this.form.value);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { KIV_ZONES, VOLUNTEER_ROLES } from '@app/shared/constants';
import { of } from 'rxjs';
import { VolunteersService } from '../../volunteers.service';

export interface NewRegistrationFormFields {
  header: string;
  controlName: string;
  type?: string;
  pattern?: string;
  errorMessage?: string;
}

@Component({
  templateUrl: './newvolunteer-register-form.component.html',
  styleUrls: ['./newvolunteer-register-form.component.scss'],
})
export class NewVolunteerRegisterFormComponent implements OnInit {
  form: FormGroup;
  formFields: Array<NewRegistrationFormFields> = [
    {
      header: 'Nume (Familie)',
      controlName: 'family',
      errorMessage: 'atenție, eroare!',
    },
    { header: 'Prenume', controlName: 'name' },
    {
      header: 'Număr Telefon',
      controlName: 'phone',
      errorMessage: '8 cifre vă rugăm',
    },
    {
      header: 'Email',
      controlName: 'email',
      errorMessage: 'respectați formatul email',
    },
    { header: 'Sector', controlName: 'zone' },
    { header: 'Adresa', controlName: 'address' },
    {
      header: 'Vîrsta',
      controlName: 'age',
      errorMessage: ' Doar cifrele cu valorile > 18 sunt acceptate',
    },
    {
      header: 'Profil Rețea Socializare',
      controlName: 'soc_media',
      errorMessage: 'atenție, eroare!',
    },
  ];

  roles = VOLUNTEER_ROLES;
  sectors = KIV_ZONES;

  constructor(private volunteersService: VolunteersService) {}
  onSubmit() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      family: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([0-9]){8}$/),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      zone: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      age: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([0-9]){2}$/),
      ]),
      soc_media: new FormControl('', [Validators.required]),
      role: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      availability_days: new FormControl(null, [Validators.required]),
      availability_hours: new FormControl(null, [Validators.required]),
    });
  }

  closeDialog() {}
}

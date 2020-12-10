import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'
import { DAYS_OF_WEEK, VOLUNTEER_ROLES, VOLUNTEER_ROLES_ICONS, ZONES } from '@app/shared/constants'
import { IVolunteer } from '@app/shared/models'
import { Subscription } from 'rxjs'
import { VolunteersService } from '../../volunteers.service'

export interface NewRegistrationFormFields {
  header: string
  controlName: string
  type?: string
  pattern?: string
  errorMessage?: string
}

export interface AvailabilityHours {
  start: number
  end: number
}

@Component({
  templateUrl: './newvolunteer-register-form.component.html',
  styleUrls: ['./newvolunteer-register-form.component.scss']
})
export class NewVolunteerRegisterFormComponent implements OnInit {
  form: FormGroup
  formFields: Array<NewRegistrationFormFields> = [
    {
      header: 'Nume (Familie)',
      controlName: 'first_name',
      errorMessage: 'atenție, eroare!'
    },
    { header: 'Prenume', controlName: 'last_name' },
    {
      header: 'Număr Telefon',
      controlName: 'phone',
      errorMessage: '8 cifre vă rugăm'
    },
    {
      header: 'Email',
      controlName: 'email',
      errorMessage: 'respectați formatul email'
    },
    { header: 'Sector', controlName: 'zone' },
    { header: 'Adresa', controlName: 'address' },
    {
      header: 'Vîrsta',
      controlName: 'age',
      errorMessage: ' Doar vîrsta cu valorile intre  16 și 50 este acceptata'
    },
    {
      header: 'Profil Rețea Socializare',
      controlName: 'facebook_profile',
      errorMessage: 'atenție, eroare!'
    }
  ]

  stdErrMessage = 'atenție, eroare - cîmp obligatoriu!'
  roles = VOLUNTEER_ROLES
  volunteerRolesIncons = VOLUNTEER_ROLES_ICONS
  zones: Array<string> = Object.keys(ZONES).filter((key) => isNaN(+key))
  daysOfWeek = DAYS_OF_WEEK
  hours = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00'
  ]

  sub$: Subscription

  constructor(private volunteersService: VolunteersService, private dialogRef: MatDialogRef<any>) {}

  onSubmit() {
    let newVolunteer: IVolunteer = this.form.value
    let endH = this.form.get('availability_hours_end').value.split(':', 1)[0]
    let startH = this.form.get('availability_hours_start').value.split(':', 1)[0]

    newVolunteer = Object.assign({ ...newVolunteer, availability_hours_start: startH, availability_hours_end: endH })
    delete newVolunteer['availability_hours']

    // to avoid memory leaks - must unsubscribe at destroy!
    this.sub$ = this.volunteersService.saveVolunteer(newVolunteer).subscribe(
      (res) => {
        console.log('🚀 Server SUCCESS response at new Volunteer registration = ', res)
        this.closeDialog()
      },
      (err) => {
        console.log('Error returned from server at new Volunteer registration!')
      }
    )
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^([0-9]){8}$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      zone: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      address: new FormControl('', [Validators.required]),
      age: new FormControl('', [
        Validators.required,
        Validators.min(16),
        Validators.max(50),
        Validators.pattern(/^([0-9]){2}$/)
      ]),
      facebook_profile: new FormControl(''),
      role: new FormControl([], [Validators.required, Validators.minLength(1)]),
      availability_days: new FormControl([], [Validators.required, Validators.minLength(1)]),
      availability_hours_start: new FormControl(null, Validators.required),
      availability_hours_end: new FormControl(null, Validators.required)
    })
  }

  closeDialog() {
    this.dialogRef.close()
  }

  enumUnsorted() {}

  ngOnDestroy() {
    this.sub$.unsubscribe()
  }
}

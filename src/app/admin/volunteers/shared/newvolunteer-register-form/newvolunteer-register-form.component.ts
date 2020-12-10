import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
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
      errorMessage: ' Doar cifrele cu valorile > 18 sunt acceptate'
    },
    {
      header: 'Profil Rețea Socializare',
      controlName: 'facebook_profile',
      errorMessage: 'atenție, eroare!'
    }
  ]

  roles = VOLUNTEER_ROLES
  volunteerRolesIncons = VOLUNTEER_ROLES_ICONS
  zones: Array<string> = Object.keys(ZONES).filter((key) => isNaN(+key))
  daysOfWeek = DAYS_OF_WEEK

  sub$: Subscription

  constructor(private volunteersService: VolunteersService) {}
  onSubmit() {
    let newVolunteer: IVolunteer = this.form.value
    newVolunteer = Object.assign({ availability_hours_start: 10, availability_hours_end: 18, ...newVolunteer })
    delete newVolunteer['availability_hours']
    console.log(
      '🚀 ~ file: newvolunteer-register-form.component.ts ~ line 80 ~ NewVolunteerRegisterFormComponent ~ onSubmit ~ newVolunteer',
      this.form
    )

    //to avoid memory leaks - must unsubscribe at destroy!
    // this.sub$=this.volunteersService.saveVolunteer(newVolunteer).subscribe
    // (res=>{
    // console.log("🚀 ~ file: newvolunteer-register-form.component.ts ~ line 69 ~ NewVolunteerRegisterFormComponent ~ onSubmit ~ res", res)
    // console.log('onSubmit pressed', newVolunteer)
    // })
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      first_name: new FormControl('Test', [Validators.required]),
      last_name: new FormControl('Testter', [Validators.required]),
      phone: new FormControl('12345678', [Validators.required, Validators.pattern(/^([0-9]){8}$/)]),
      email: new FormControl('a@test.xyz', [Validators.required, Validators.email]),
      zone: new FormControl('Centru', [Validators.required]),
      address: new FormControl('Test addr casa 4 ap43 ', [Validators.required]),
      age: new FormControl('33', [
        Validators.required,
        Validators.min(16),
        Validators.max(50),
        Validators.pattern(/^([0-9]){2}$/)
      ]),
      facebook_profile: new FormControl('no'),
      //TODO - check -  maybe it take sense to provide TYPE of role form as VOLUNTEER_ROLES ???
      role: new FormControl([VOLUNTEER_ROLES.delivery], [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      availability_days: new FormControl([], [Validators.required, Validators.minLength(1)]),
      availability_hours: new FormControl(
        {}
        // [Validators.required]
      )
    })
  }

  closeDialog() {}

  enumUnsorted() {}

  ngOnDestroy() {
    this.sub$.unsubscribe()
  }
}

import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { DAYS_OF_WEEK, VOLUNTEER_ROLES, VOLUNTEER_ROLES_ICONS, ZONES } from '@app/shared/constants'
import { IVolunteer } from '@app/shared/models'
import { Subscription } from 'rxjs'
import { VolunteersFacade } from '../../volunteers.facade'
import { FormHoursSelectorComponent } from '../form-hours-selector/form-hours-selector.component'

export interface NewRegistrationFormFields {
  header: string
  controlName: string
  type?: string
  pattern?: string
  errorMessage?: string
}

@Component({
  templateUrl: './newvolunteer-register-form.component.html',
  styleUrls: ['./newvolunteer-register-form.component.scss']
})
export class NewVolunteerRegisterFormComponent implements OnInit, OnDestroy {
  @ViewChild('availabilityHoursLine') availabilityHoursLine: ElementRef
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
      errorMessage: '8 cifre vă rugăm, fără 0 la început.'
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
  startHour = ''
  endHour = ''
  roles = VOLUNTEER_ROLES
  volunteerRolesIncons = VOLUNTEER_ROLES_ICONS
  zones: Array<string> = Object.keys(ZONES).filter((key) => isNaN(+key))
  daysOfWeek = DAYS_OF_WEEK
  sub$: Subscription

  constructor(private volunteersService: VolunteersFacade, public dialog: MatDialog) {}

  onSubmit(ev) {
    let newVolunteer: IVolunteer = this.form.value
    let endH = this.form.get('availability_hours_end').value.split(':', 1)[0]
    let startH = this.form.get('availability_hours_start').value.split(':', 1)[0]

    newVolunteer = Object.assign({ ...newVolunteer, availability_hours_start: startH, availability_hours_end: endH })
    this.volunteersService.saveVolunteer(newVolunteer)
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^[^0]([0-9]){7}$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      zone: new FormControl('', [Validators.required, Validators.minLength(3)]),
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
      availability_hours_start: new FormControl('08:00', [Validators.required, Validators.minLength(5)]),
      availability_hours_end: new FormControl('08:00', [Validators.required, Validators.minLength(5)])
    })
  }

  enumUnsorted() {}

  openHoursSelectDialog() {
    const dialogRef = this.dialog.open(FormHoursSelectorComponent, {
      data: this.form,
      width: '235px',
      height: '125px',
      panelClass: 'custom-modalbox'
    })
    this.sub$ = dialogRef.afterClosed().subscribe((result) => {
      dialogRef.close()
      this.availabilityHoursLine.nativeElement.innerHTML =
        this.form.value.availability_hours_start + ' - ' + this.form.value.availability_hours_end
    })
  }

  ngOnDestroy(): void {
    // this.sub$.unsubscribe()
  }

  get formAll() {
    return this.form
  }
}

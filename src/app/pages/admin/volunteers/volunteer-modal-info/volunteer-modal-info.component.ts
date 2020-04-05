import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IVolunteer } from '@models/volunteers';
import { TagsFacadeService } from '@services/tags/tags-facade.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-volunteer-modal-info',
  templateUrl: './volunteer-modal-info.component.html',
  styleUrls: ['./volunteer-modal-info.component.scss']
})
export class VolunteerModalInfoComponent implements OnInit {
  activityTypes$ = this.tagsFacade.activityTypesTags$.pipe(
    map(types => types.filter(({ _id }) => this.volunteer.activity_types.includes(_id)))
  );

  constructor(
    private tagsFacade: TagsFacadeService,
    private dialogRef: MatDialogRef<VolunteerModalInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public volunteer: IVolunteer & { distance: number },
  ) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

}

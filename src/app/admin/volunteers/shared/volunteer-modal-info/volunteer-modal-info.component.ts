import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IVolunteer } from '@shared/models';
import { TagsFacade } from '@shared/tags/tags.facade';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './volunteer-modal-info.component.html',
  styleUrls: ['./volunteer-modal-info.component.scss'],
})
export class VolunteerModalInfoComponent {
  activityTypes$ = this.tagsFacade.activityTypesTags$.pipe(
    map((types) =>
      types.filter(({ _id }) => this.volunteer.activity_types.includes(_id))
    )
  );

  constructor(
    private tagsFacade: TagsFacade,
    private dialogRef: MatDialogRef<VolunteerModalInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public volunteer: IVolunteer & { distance: number }
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }
}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IVolunteer } from '@shared/models';
import { TagsFacade } from '@shared/tags/tags.facade';
import { map } from 'rxjs/operators';
import { getActivityTypesTagsAction } from '@shared/tags/tags.actions';
import { Store } from '@ngrx/store';
import { AppState } from '@app/app.state';

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
    @Inject(MAT_DIALOG_DATA)
    public volunteer: IVolunteer & { distance: number },
    store: Store<AppState>
  ) {
    store.dispatch(getActivityTypesTagsAction());
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

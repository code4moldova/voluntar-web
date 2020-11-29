import { IActivityTypeTag, IAvailabilityTag, IOfferTag } from '@shared/models';

export interface TagsState {
  activityTypes: IActivityTypeTag[];
  availabilities: IAvailabilityTag[];
  offers: IOfferTag[];
  // sectors: ISectorTag[];
  isLoading: boolean;
  error: string;
}

export const initialState: TagsState = {
  activityTypes: [],
  availabilities: [],
  offers: [],
  // sectors: [],
  isLoading: false,
  error: null,
};

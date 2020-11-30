import { IActivityTypeTag, IAvailabilityTag, IOfferTag } from '@shared/models';

export interface TagsState {
  activityTypes: IActivityTypeTag[];
  availabilities: IAvailabilityTag[];
  offers: IOfferTag[];
  isLoading: boolean;
  error: string;
}

export const initialState: TagsState = {
  activityTypes: [],
  availabilities: [],
  offers: [],
  isLoading: false,
  error: null,
};

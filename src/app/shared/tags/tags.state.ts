import {
  IActivityTypeTag,
  IAgeTag,
  IAvailabilityTag,
  IOfferTag,
} from '@shared/models';

export interface TagsState {
  activityTypes: IActivityTypeTag[];
  ages: IAgeTag[];
  availabilities: IAvailabilityTag[];
  offers: IOfferTag[];
  // sectors: ISectorTag[];
  isLoading: boolean;
  error: string;
}

export const initialState: TagsState = {
  activityTypes: [],
  ages: [],
  availabilities: [],
  offers: [],
  // sectors: [],
  isLoading: false,
  error: null,
};

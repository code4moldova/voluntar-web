import { IActivityTypeTag, ISectorTag } from '@models/tags';

export interface TagsState {
  activityTypes: IActivityTypeTag[];
  // sectors: ISectorTag[];
  isLoading: boolean;
  error: string;
}

export const initialState: TagsState = {
  activityTypes: [],
  // sectors: [],
  isLoading: false,
  error: null
};

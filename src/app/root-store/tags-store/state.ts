import { IActivityTypeTag } from '@models/tags';

export interface TagsState {
  activityTypes: IActivityTypeTag[];
  isLoading: boolean;
  error: string;
}

export const initialState: TagsState = {
  activityTypes: [],
  isLoading: false,
  error: null
};

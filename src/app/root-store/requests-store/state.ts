import { IRequestDetails } from '@models/requests';
import { ISectorTag } from '@models/tags';

export interface RequestsState {
  data: IRequestDetails[];
  count: number;
  details: IRequestDetails;
  isLoading: boolean;
  error: string;
  zones: ISectorTag[];
}

export const initialState: RequestsState = {
  data: [],
  count: null,
  details: null,
  isLoading: false,
  error: null,
  zones: [],
};

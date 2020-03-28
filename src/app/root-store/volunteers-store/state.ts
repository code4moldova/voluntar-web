export interface VolunteersState {
  data: any[];
  details: any;
  isLoading: boolean;
  error: string;
}

export const initialState: VolunteersState = {
  data: [],
  details: null,
  isLoading: false,
  error: null
};

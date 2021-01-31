import { DemandType } from '@demands/shared/demand-type';
import { DemandStatus } from '@demands/shared/demand-status';

// TODO: Do we need this?
export interface DemandBackEnd {
  _id?: string;
  // user: string;
  type: DemandType;
  status: DemandStatus;
  number: number;
  secret: string;
  urgent: boolean;
  comments: string;
  has_symptoms: boolean;
  // created_at: string;
  // volunteer: IVolunteer;
}

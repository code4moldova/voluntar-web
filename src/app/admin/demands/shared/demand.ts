import { Beneficiary } from '@shared/models/beneficiary';
import { IVolunteer } from '@shared/models/volunteers';
import { User } from '@users/shared/user';
import { DemandType } from '@demands/shared/demand-type';
import { DemandStatus } from '@demands/shared/demand-status';

export interface Demand {
  _id?: string;
  beneficiary: Beneficiary;
  user: User;
  type: DemandType;
  status: DemandStatus;
  number: number;
  secret: string;
  urgent: boolean;
  comments: string;
  has_symptoms: boolean;
  created_at: string;
  volunteer: IVolunteer;
}

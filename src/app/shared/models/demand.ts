import { Beneficiary } from './beneficiary';
import { IVolunteer } from './volunteers';

export enum DemandType {
  warm_lunch = 'warm_lunch',
  grocery = 'grocery',
  medicine = 'medicine',
  invoices = 'invoices',
  transport = 'transport',
}

export const demandTypes = Object.values(DemandType);

export enum DemandStatus {
  new = 'new',
  confirmed = 'confirmed',
  in_process = 'in_process',
  canceled = 'canceled',
  solved = 'solved',
  archived = 'archived',
}

export interface Demand {
  _id?: string;
  beneficiary: Beneficiary;
  user: any;
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

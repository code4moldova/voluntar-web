export interface IActivityTypeTag {
  _id: string;
  created_by: string;
  en: string;
  is_active: true;
  ro: string;
  ru: string;
  select: string;
}

export interface ISectorTag {
  _id: string;
  created_by: string;
  en: string;
  is_active: boolean;
  ro: string;
  ru: string;
  select: string;
}

export interface IOfferTag {
  _id: string;
  en: string;
  is_active: boolean;
  ro: string;
  ru: string;
  select: string;
}

export interface IAvailabilityTag {
  _id: string;
  en: string;
  is_active: boolean;
  ro: string;
  ru: string;
  select: string;
}

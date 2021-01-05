export interface IAddresses {
  spatialReference: SpatialReference;
  candidates: Candidate[];
}

interface Candidate {
  address: string;
  location: Location;
  score: number;
  attributes: Record<string, unknown>;
  extent: Extent;
}

interface Extent {
  xmin: number;
  ymin: number;
  xmax: number;
  ymax: number;
}

interface Location {
  x: number;
  y: number;
}

interface SpatialReference {
  wkid: number;
  latestWkid: number;
}
export interface ZoneI {
  _id: string;
  created_by: string;
  en: string;
  is_active: boolean;
  ro: string;
  ru: string;
  select: string;
}

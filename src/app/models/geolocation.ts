export interface IAddresses {
  spatialReference: SpatialReference;
  candidates: Candidate[];
}

interface Candidate {
  address: string;
  location: Location;
  score: number;
  attributes: {};
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

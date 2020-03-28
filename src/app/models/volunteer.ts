export interface Volunteer {
  id?: number;
  name: string;
  email: string;
  address: string;
  active: boolean; // Not sure
  zone: string;
  date?: string | Date | number; // What type we'll use?
  fbProfile: string;
  age: number;
  hoursPerDay: number;
  activitiesType: string[]; // Not sure
  requestId?: number;
}

import { DAYS_OF_WEEK, VOLUNTEER_ROLES, VOLUNTEER_STATUS, ZONES } from '../constants'

export interface IVolunteer {
  _id?: string
  //Familia ca first_name
  first_name: string
  last_name: string
  phone: number
  email: string
  // its Sectorul CHisinau
  zone: ZONES
  address: string
  age: number
  //TODO - to check -FACEBOOK miissed in class description - present in backed - missed in new Volunteer form
  facebook_profile?: string
  role: [VOLUNTEER_ROLES]
  availability_hours_start: number
  availability_hours_end: number
  availability_days: [DAYS_OF_WEEK]
  status?: [VOLUNTEER_STATUS]
  created_at?: string
  created_by?: string

  //TODO - delete after finishing
  activity_types?: string[]
  availability?: number
  is_active?: boolean
  latitude?: number
  longitude?: number
  distance?: number
  accepted_offer?: boolean
  availability_day?: string
  telegram_chat_id?: string
  count?: number
}

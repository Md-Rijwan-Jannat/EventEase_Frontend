import { TUser } from "./auth.type";
import { DateValue } from "@internationalized/date";
export interface TEvent {
  _id: string;
  name: string;
  date: string;
  location: string;
  maxAttendees: number;
  attendees: string[];
  createdBy: TUser;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface EventData {
  name: string;
  date: DateValue | null;
  location: string;
  maxAttendees: number;
}

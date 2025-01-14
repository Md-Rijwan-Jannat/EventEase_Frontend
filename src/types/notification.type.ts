export interface TNotification {
  _id: string;
  userId: string;
  eventId: string;
  message: string;
  type: "event_update" | "new_attendee" | "withdraw" | "event_full";
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

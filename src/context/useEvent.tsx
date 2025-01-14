import React, { createContext, useContext, useState, useEffect } from "react";
import { axiosInstance } from "../lib/axiosInstance";
import { toast } from "sonner";
import { TEvent, TNotification } from "../types";
import { FieldValues } from "react-hook-form";
import { useRouter } from "next/navigation";

interface EventContextType {
  myEvents: TEvent[];
  allOtherEvents: TEvent[];
  isLoading: boolean;
  addEventFn: (data: FieldValues) => Promise<void>;
  registerForEvent: (eventId: string) => Promise<void>;
  withdrawFromEvent: (eventId: string) => Promise<void>;
  myNotifications: TNotification[];
  fetchMyNotifications: () => Promise<void>;
  markNotificationAsRead: (id: string) => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  updateEvent: (eventId: string, data: FieldValues) => Promise<void>;
  deleteEvent: (eventId: string) => Promise<void>;
  fetchAllMyEvents: () => Promise<void>;
  fetchEventById: (id: string) => Promise<TEvent | null>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [myEvents, setMyEvents] = useState<TEvent[]>([]);
  const [allOtherEvents, setAllOtherEvents] = useState<TEvent[]>([]);
  const [myNotifications, setMyNotifications] = useState<TNotification[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  // Fetch notifications
  const fetchMyNotifications = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("/notifications");
      setMyNotifications(res.data.data);
    } catch (error: any) {
      console.error("Error fetching notifications:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch notifications"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Mark a notification as read
  const markNotificationAsRead = async (id: string) => {
    try {
      const res = await axiosInstance.patch(`/notifications/${id}/read`);
      console.log(res);
      setMyNotifications((prev) =>
        prev.map((notification: TNotification) =>
          notification._id === id
            ? { ...notification, isRead: true }
            : notification
        )
      );
      toast.success("Notification marked as read");
    } catch (error: any) {
      console.error("Error marking notification as read:", error);
      toast.error(
        error.response?.data?.message || "Failed to mark notification as read"
      );
    }
  };

  // Delete a notification
  const deleteNotification = async (id: string) => {
    try {
      await axiosInstance.delete(`/notifications/${id}`);
      setMyNotifications((prev) =>
        prev.filter((notification) => notification._id !== id)
      );
      toast.success("Notification deleted successfully");
    } catch (error: any) {
      console.error("Error deleting notification:", error);
      toast.error(
        error.response?.data?.message || "Failed to delete notification"
      );
    }
  };

  const fetchAllMyEvents = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("/events");
      setMyEvents(res.data.data);
    } catch (error: any) {
      console.error("Error fetching events:", error);
      toast.error(error.response?.data?.message || "Failed to fetch events");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllOtherEvents = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("/events/others");
      setAllOtherEvents(res.data.data);
    } catch (error: any) {
      console.error("Error fetching events:", error);
      toast.error(error.response?.data?.message || "Failed to fetch events");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEventById = async (id: string): Promise<TEvent | null> => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get(`/events/${id}`);
      return res.data.data;
    } catch (error: any) {
      console.error("Error fetching event:", error);
      toast.error(error.response?.data?.message || "Failed to fetch event");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const addEventFn = async (data: FieldValues) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/events", data);
      setMyEvents((prev) => [...prev, res.data.data]);
      toast.success("Event created successfully");
    } catch (error: any) {
      console.error("Error creating event:", error);
      toast.error(error.response?.data?.message || "Failed to create event");
    } finally {
      setIsLoading(false);
    }
  };

  const registerForEvent = async (eventId: string) => {
    try {
      await axiosInstance.post(`/events/${eventId}/register`);
      toast.success("Registered for the event successfully");
      fetchAllMyEvents();
      fetchAllOtherEvents();
    } catch (error: any) {
      console.error("Error registering for event:", error);
      toast.error(error.response?.data?.message || "Failed to register");
    }
  };

  const withdrawFromEvent = async (eventId: string) => {
    try {
      await axiosInstance.post(`/events/${eventId}/withdraw`);
      toast.success("Withdrawn from the event successfully");
      fetchAllMyEvents();
      fetchAllOtherEvents();
    } catch (error: any) {
      console.error("Error withdrawing from event:", error);
      toast.error(error.response?.data?.message || "Failed to withdraw");
    }
  };

  const updateEvent = async (eventId: string, data: FieldValues) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.patch(`/events/${eventId}`, data);
      setMyEvents((prev) =>
        prev.map((event) => (event._id === eventId ? res.data.data : event))
      );
      toast.success("Event updated successfully");
    } catch (error: any) {
      console.error("Error updating event:", error);
      toast.error(error.response?.data?.message || "Failed to update event");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteEvent = async (eventId: string) => {
    setIsLoading(true);
    try {
      await axiosInstance.delete(`/events/${eventId}`);
      setMyEvents((prev) => prev.filter((event) => event._id !== eventId));
      toast.success("Event deleted successfully");
    } catch (error: any) {
      console.error("Error deleting event:", error);
      toast.error(error.response?.data?.message || "Failed to delete event");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllMyEvents();
    fetchAllOtherEvents();
    fetchMyNotifications();
  }, []);

  return (
    <EventContext.Provider
      value={{
        myEvents,
        allOtherEvents,
        isLoading,
        fetchMyNotifications,
        myNotifications,
        markNotificationAsRead,
        deleteNotification,
        addEventFn,
        registerForEvent,
        withdrawFromEvent,
        updateEvent,
        deleteEvent,
        fetchAllMyEvents,
        fetchEventById,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error("useEvent must be used within an EventProvider");
  }
  return context;
};

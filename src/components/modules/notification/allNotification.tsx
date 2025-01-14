"use client";

import { useEvent } from "@/src/context/useEvent";
import { TNotification } from "@/src/types";
import React from "react";
import NotificationCardSkeleton from "../../ui/skeleton/notificationCardSkeleton";
import EmptyState from "../../ui/emptyState";
import NotificationCardWithDelete from "../../ui/cards/notificationCardWithDelete";

const EmptyNotifications = () => (
  <div className="text-center text-default-500 py-6">
    <EmptyState />
  </div>
);

export default function AllNotification() {
  const { myNotifications, isLoading } = useEvent();

  return (
    <div>
      <h1 className="text-lg font-bold my-6">All Notifications</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {isLoading && (
          <>
            {Array.from({ length: 6 }).map((_, index) => (
              <NotificationCardSkeleton key={index} />
            ))}
          </>
        )}

        {!isLoading && myNotifications.length === 0 && <EmptyNotifications />}

        {!isLoading &&
          myNotifications.map((notification: TNotification) => (
            <NotificationCardWithDelete
              key={notification._id}
              notification={notification}
            />
          ))}
      </div>
    </div>
  );
}

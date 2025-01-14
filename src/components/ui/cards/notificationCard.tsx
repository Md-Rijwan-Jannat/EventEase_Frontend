"use client";

import React from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Chip } from "@nextui-org/chip";
import { RefreshCw, UserPlus, UserMinus, Users } from "lucide-react";
import { TNotification } from "@/src/types";
import { useEvent } from "@/src/context/useEvent";

interface NotificationCardProps {
  notification: TNotification;
}

const NotificationCard: React.FC<NotificationCardProps> = React.memo(
  ({ notification }) => {
    const { markNotificationAsRead } = useEvent();

    const getIcon = (type: TNotification["type"]) => {
      switch (type) {
        case "event_update":
          return <RefreshCw className="w-5 h-5 text-blue-500" />;
        case "new_attendee":
          return <UserPlus className="w-5 h-5 text-green-500" />;
        case "withdraw":
          return <UserMinus className="w-5 h-5 text-red-500" />;
        case "event_full":
          return <Users className="w-5 h-5 text-yellow-500" />;
      }
    };

    const getChipColor = (
      type: TNotification["type"]
    ): "primary" | "success" | "danger" | "warning" => {
      switch (type) {
        case "event_update":
          return "primary";
        case "new_attendee":
          return "success";
        case "withdraw":
          return "danger";
        case "event_full":
          return "warning";
      }
    };

    return (
      <Card
        className={`w-full ${
          notification.isRead ? "bg-default-100" : "bg-default-50"
        }`}
      >
        <CardBody
          onClick={() => markNotificationAsRead(notification._id)}
          className="flex flex-row items-center gap-4 p-4"
        >
          <Avatar
            icon={getIcon(notification.type)}
            classNames={{
              base: "bg-default-200",
              icon: "text-default-500",
            }}
          />
          <div className="flex-grow">
            <p className="text-sm font-medium text-default-700">
              {notification.message}
            </p>
            <p className="text-xs text-default-400 mt-1">
              {new Date(notification.createdAt).toLocaleString()}
            </p>
          </div>
          <Chip
            size="sm"
            variant="flat"
            color={
              notification.isRead ? "default" : getChipColor(notification.type)
            }
          >
            {notification.isRead ? "Read" : "New"}
          </Chip>
        </CardBody>
      </Card>
    );
  }
);

NotificationCard.displayName = "NotificationCard";

export default NotificationCard;

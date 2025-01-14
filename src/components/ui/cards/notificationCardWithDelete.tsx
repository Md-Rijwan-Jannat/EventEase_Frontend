"use client";

import React from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Chip } from "@nextui-org/chip";
import { Button } from "@nextui-org/button";
import { RefreshCw, UserPlus, UserMinus, Users, Trash2 } from "lucide-react";
import { TNotification } from "@/src/types";
import { useEvent } from "@/src/context/useEvent";

interface NotificationCardProps {
  notification: TNotification;
}

const NotificationCardWithDelete: React.FC<NotificationCardProps> = React.memo(
  ({ notification }) => {
    const { markNotificationAsRead, deleteNotification } = useEvent();

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

    const handleDelete = () => {
      deleteNotification(notification._id);
    };

    return (
      <Card
        className={`w-full ${
          notification.isRead ? "bg-default-100" : "bg-default-50"
        }`}
      >
        <CardBody
          onClick={() => markNotificationAsRead(notification._id)}
          className="flex flex-row items-center gap-4 p-4 cursor-pointer"
        >
          <div className="w-[60px]">
            <Avatar
              icon={getIcon(notification.type)}
              classNames={{
                base: "bg-default-200",
                icon: "text-default-500",
              }}
            />
          </div>
          <div className="flex-grow">
            <p className="text-sm font-medium text-default-700">
              {notification.message}
            </p>
            <p className="text-xs text-default-400 mt-1">
              {new Date(notification.createdAt).toLocaleString()}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Chip
              size="sm"
              variant="flat"
              color={
                notification.isRead
                  ? "default"
                  : getChipColor(notification.type)
              }
            >
              {notification.isRead ? "Read" : "New"}
            </Chip>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => handleDelete()}
              className="text-danger hover:bg-danger-100"
            >
              <Trash2 size={18} />
            </Button>
          </div>
        </CardBody>
      </Card>
    );
  }
);

NotificationCardWithDelete.displayName = "NotificationCardWithDelete";

export default NotificationCardWithDelete;

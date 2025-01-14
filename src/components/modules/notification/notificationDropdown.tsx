"use client";

import React, { useMemo } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { TNotification } from "@/src/types";
import NotificationCard from "../../ui/cards/notificationCard";
import { Button } from "@nextui-org/button";
import { Bell } from "lucide-react";
import { Badge } from "@nextui-org/badge";

interface NotificationDropdownProps {
  notifications: TNotification[];
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  notifications,
}) => {
  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications]
  );

  const unReadNotifications = useMemo(
    () => notifications.filter((n) => !n.isRead),
    [notifications]
  );

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button
          isIconOnly
          radius="full"
          className="relative bg-transparent p-2"
        >
          {unreadCount > 0 ? (
            <Badge content={unreadCount} shape="circle" color="danger">
              <Bell size={23} className="text-default-600" />
            </Badge>
          ) : (
            <Bell size={23} className="text-default-600" />
          )}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Notifications"
        className="w-full max-w-[448px] max-h-[400px] overflow-y-auto scrollbar-hide p-0"
        itemClasses={{
          base: "py-0 px-0 rounded-none gap-0 h-auto",
        }}
      >
        <DropdownItem
          key="notifications"
          isReadOnly
          className="h-auto overflow-y-auto"
          classNames={{
            base: "bg-default-50 hover:bg-default-50/0 rounded-lg p-0",
          }}
        >
          <div className="px-4 py-3 border-b border-default-100">
            <p className="text-lg font-semibold">Notifications</p>
          </div>

          {unReadNotifications.map((notification) => (
            <div key={notification._id} className="my-3 mx-1 cursor-pointer">
              <NotificationCard notification={notification} />
            </div>
          ))}
        </DropdownItem>
        <DropdownItem key={"no-data"} className="w-[440px]">
          {unReadNotifications.length <= 0 && (
            <p className="text-center text-default-500 py-4 w-full">
              No notifications
            </p>
          )}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NotificationDropdown;

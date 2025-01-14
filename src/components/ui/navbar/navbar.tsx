"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import {
  Navbar as NavbarUi,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Bell,
  LogOut,
  Settings,
  SquareGanttChartIcon as SquareChartGantt,
  SquarePlus,
} from "lucide-react";
import EventEaseLogo from "../logo";
import { ThemeSwitch } from "../theme-switch";
import { useAuth } from "@/src/context/useAuth";
import NotificationDropdown from "../../modules/notification/notificationDropdown";

export default function Navbar() {
  const { authUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.push("/login");
    toast.success("Logged out successfully");
    window.location.reload();
  };

  return (
    <NavbarUi
      maxWidth="xl"
      shouldHideOnScroll
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="border-b border-default-100"
    >
      <NavbarContent>
        <NavbarBrand>
          <EventEaseLogo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="flex">
          <ThemeSwitch />
        </NavbarItem>
        {authUser ? (
          <div className="flex items-center gap-4">
            <NotificationDropdown />
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="primary"
                  name={authUser.name}
                  size="sm"
                  src={
                    authUser.imageUrl ||
                    `https://ui-avatars.com/api/?name=${authUser.name}`
                  }
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem
                  key="profile"
                  className="h-14 gap-2 border rounded-md p-2 border-default-200 mb-3"
                >
                  <p className="text-sm">Signed in as</p>
                  <p className="text-xs">{authUser.email}</p>
                </DropdownItem>
                <DropdownItem
                  startContent={<Bell size={18} />}
                  key="notifications"
                  href="/notifications"
                >
                  Notifications
                </DropdownItem>
                <DropdownItem
                  startContent={<Settings size={18} />}
                  key="settings"
                  href="/settings"
                >
                  My Settings
                </DropdownItem>
                <DropdownItem
                  startContent={<SquareChartGantt size={18} />}
                  key="my-events"
                  href="/my-events"
                >
                  My Events
                </DropdownItem>
                <DropdownItem
                  startContent={<SquarePlus size={18} />}
                  key="register-events"
                  href="/"
                >
                  Register Event
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  startContent={<LogOut size={18} />}
                  onClick={handleLogout}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        ) : (
          <>
            <NavbarItem className="hidden sm:flex">
              <Button as={Link} href="/login" variant="flat">
                Log In
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} href="/register" className="primary-button">
                Register
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </NavbarUi>
  );
}

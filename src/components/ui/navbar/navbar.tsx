"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";
import {
  Navbar as NavbarUi,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import Link from "next/link";
import EventEaseLogo from "../logo";
import { ThemeSwitch } from "../theme-switch";
import { useAuth } from "@/src/context/useAuth";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const { authUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <NavbarUi
      maxWidth="xl"
      shouldHideOnScroll
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="border-b border-default-100"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <EventEaseLogo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="flex">
          <ThemeSwitch />
        </NavbarItem>
        {authUser ? (
          <NavbarItem>
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
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{authUser.email}</p>
                </DropdownItem>
                <DropdownItem key="settings" href="/settings">
                  My Settings
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onClick={() => {
                    logout();
                  }}
                >
                  <div className="flex items-center gap-2">
                    <LogOut size={18} />
                    Log Out
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
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

import { Button } from "@nextui-org/button";
import {
  Navbar as NavbarUi,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import Link from "next/link";
import EventEaseLogo from "../logo";
import { ThemeSwitch } from "../theme-switch";

export default function Navbar() {
  return (
    <NavbarUi
      maxWidth="xl"
      shouldHideOnScroll
      className="border-b border-default-100"
    >
      <NavbarBrand>
        <EventEaseLogo />
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="flex">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} href="/register" className="primary-button -mr-3">
            Register
          </Button>
        </NavbarItem>
      </NavbarContent>
    </NavbarUi>
  );
}

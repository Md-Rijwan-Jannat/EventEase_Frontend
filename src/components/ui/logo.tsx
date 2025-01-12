import Image from "next/image";
import React from "react";
import logo from "@/src/assets/EventEaseLogo.png";
import Link from "next/link";

export default function EventEaseLogo() {
  return (
    <Link href={"/"} className="flex items-center gap-2 -ml-3">
      <Image
        className="size-11 object-cover"
        src={logo}
        alt="logo"
        width={1000}
        height={1000}
      />
      <h3 className="text-xl font-bold text-default-800">EventEase</h3>
    </Link>
  );
}

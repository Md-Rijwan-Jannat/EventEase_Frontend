import Container from "@/src/components/ui/container";
import Navbar from "@/src/components/ui/navbar/navbar";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function WithCommonLayout({ children }: Props) {
  return (
    <div>
      <Navbar />
      <Container>{children}</Container>
    </div>
  );
}

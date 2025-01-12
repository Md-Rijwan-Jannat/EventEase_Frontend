import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function WithCommonLayout({ children }: Props) {
  return <div>{children}</div>;
}

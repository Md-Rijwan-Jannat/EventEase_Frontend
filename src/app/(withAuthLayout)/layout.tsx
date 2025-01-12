import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function WithAuthLayout({ children }: Props) {
  return <div>{children}</div>;
}

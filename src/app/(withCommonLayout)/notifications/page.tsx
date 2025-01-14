import Loader from "@/src/components/ui/loader/loader";
import React, { Suspense } from "react";

export default function NotificationPage() {
  return <Suspense fallback={<Loader />}>NotificationPage</Suspense>;
}

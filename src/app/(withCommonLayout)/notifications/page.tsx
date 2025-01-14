import AllNotification from "@/src/components/modules/notification/allNotification";
import Loader from "@/src/components/ui/loader/loader";
import React, { Suspense } from "react";

export default function NotificationPage() {
  return (
    <Suspense fallback={<Loader />}>
      <AllNotification />
    </Suspense>
  );
}

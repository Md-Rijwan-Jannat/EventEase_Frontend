import MyAllEvent from "@/src/components/modules/myEvent/myAllEvent";
import Loader from "@/src/components/ui/loader/loader";
import React, { Suspense } from "react";

export default function MyEventPage() {
  return (
    <Suspense fallback={<Loader />}>
      <MyAllEvent />
    </Suspense>
  );
}

import Loader from "@/src/components/ui/loader/loader";
import React, { Suspense } from "react";

export default function RegisterPage() {
  return <Suspense fallback={<Loader />}>RegisterPage</Suspense>;
}

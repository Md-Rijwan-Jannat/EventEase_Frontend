import Loader from "@/src/components/ui/loader/loader";
import React, { Suspense } from "react";

export default function LoginPage() {
  return <Suspense fallback={<Loader />}>LoginPage</Suspense>;
}

import AllOtherEvent from "@/src/components/modules/home/allOtherEvent";
import Loader from "@/src/components/ui/loader/loader";
import { Suspense } from "react";

export default async function Home() {
  return (
    <Suspense fallback={<Loader />}>
      <AllOtherEvent />
    </Suspense>
  );
}

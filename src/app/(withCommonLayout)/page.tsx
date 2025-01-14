import AllOtherEvent from "@/src/components/modules/home/allOtherEvent";
import Loader from "@/src/components/ui/loader/loader";
import { cookies } from "next/headers";
import { Suspense } from "react";

export default async function Home() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  console.log("accessToken=>", accessToken);
  return (
    <Suspense fallback={<Loader />}>
      <AllOtherEvent />
    </Suspense>
  );
}

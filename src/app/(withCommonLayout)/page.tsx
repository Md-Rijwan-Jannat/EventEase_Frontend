import AllEvent from "@/src/components/modules/home/allEvent";
import Loader from "@/src/components/ui/loader/loader";
import { cookies } from "next/headers";
import { Suspense } from "react";

export default async function Home() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  console.log("accessToken=>", accessToken);
  return (
    <Suspense fallback={<Loader />}>
      <AllEvent />
    </Suspense>
  );
}

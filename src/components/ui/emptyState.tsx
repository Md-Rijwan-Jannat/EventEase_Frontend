import Image from "next/image";
import empty from "@/src/assets/Empty-rafiki.png";

const EmptyState = () => (
  <div className="text-center py-12">
    <Image
      className="size-48 object-cover ml-6"
      src={empty}
      alt="EventEase Logo"
      width={1000}
      height={1000}
    />
    <h3 className="mt-2 text-sm font-semibold text-default-900">No events</h3>
    <p className="mt-1 text-sm text-default-500">
      Get started by creating a new event.
    </p>
  </div>
);

export default EmptyState;

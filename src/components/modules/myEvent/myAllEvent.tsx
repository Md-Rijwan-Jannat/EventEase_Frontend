"use client";

import React from "react";
import { useEvent } from "@/src/context/useEvent";
import EventCard from "../../ui/cards/eventCard";
import { CreateEventModal } from "../../ui/modals/createEventModal";
import { TEvent } from "@/src/types";
import EmptyState from "../../ui/emptyState";
import EventCardSkeleton from "../../ui/skeleton/eventCardSkeleton";

export default function MyAllEvent() {
  const { myEvents, isLoading } = useEvent();

  return (
    <div className="">
      <h1 className="text-lg font-bold my-6">My Events</h1>
      {/* Display Skeleton while loading */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <EventCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        // Display Events or Empty State after loading is complete
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CreateEventModal />
          {myEvents.length > 0 ? (
            myEvents.map((event: TEvent) => (
              <EventCard key={event._id} event={event} />
            ))
          ) : (
            <div className="my-10 md:h-[70vh] lg:h-[60vh] flex items-center justify-center col-span-full">
              <EmptyState />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

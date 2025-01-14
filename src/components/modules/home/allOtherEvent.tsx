"use client";

import React from "react";
import { useEvent } from "@/src/context/useEvent";

import { TEvent } from "@/src/types";
import EventCardSkeleton from "../../ui/skeleton/eventCardSkeleton";
import EmptyState from "../../ui/emptyState";
import EventRegisterCard from "../../ui/cards/eventRegisterCard";

export default function AllOtherEvent() {
  const { allOtherEvents, isLoading } = useEvent();

  return (
    <div>
      <h1 className="text-lg font-bold my-6">All Events</h1>
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
          {allOtherEvents.length > 0 ? (
            allOtherEvents.map((event: TEvent) => (
              <EventRegisterCard key={event._id} event={event} />
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

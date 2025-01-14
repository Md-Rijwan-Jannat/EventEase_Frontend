"use client";

import React from "react";
import { useEvent } from "@/src/context/useEvent";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { CalendarIcon, MapPinIcon, UsersIcon, PlusIcon } from "lucide-react";
import { Progress } from "@nextui-org/progress";
import EventCard from "../../ui/cards/eventCard";
import { CreateEventModal } from "../../ui/modals/createEventModal";
import Image from "next/image";
import empty from "@/src/assets/Empty-rafiki.png";

export default function AllEvent() {
  const { events, addEventFn } = useEvent();

  const handleCreateEvent = (eventData: any) => {
    addEventFn(eventData);
  };

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

  return (
    <div className="">
      <h1 className="text-lg font-bold my-6">All Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateEventModal />

        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
      <div className="my-10 md:h-[70vh] lg:h-[60vh] flex items-center justify-center">
        {events.length === 0 && <EmptyState />}
      </div>
    </div>
  );
}

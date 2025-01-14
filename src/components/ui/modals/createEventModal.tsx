"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { DatePicker } from "@nextui-org/date-picker";
import { Card, CardBody } from "@nextui-org/card";
import {
  SquareChartGantt,
  MapPinIcon,
  UsersIcon,
  PlusIcon,
} from "lucide-react";
import Image from "next/image";
import { useEvent } from "@/src/context/useEvent";
import { DateValue } from "@internationalized/date";

interface EventData {
  name: string;
  date: DateValue | null;
  location: string;
  maxAttendees: number;
}

export function CreateEventModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { addEventFn } = useEvent();

  const [eventData, setEventData] = useState<EventData>({
    name: "",
    date: null,
    location: "",
    maxAttendees: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: name === "maxAttendees" ? parseInt(value, 10) || 0 : value,
    }));
  };

  const handleSubmit = () => {
    const { name, date, location } = eventData;

    if (!name || !date || !location) {
      alert("Please fill all required fields.");
      return;
    }

    addEventFn({
      ...eventData,
      date: new Date(
        Date.UTC(date.year, date.month - 1, date.day)
      ).toISOString(),
    });
    onOpenChange();
  };

  return (
    <>
      <Button id="add-event" className="hidden" onPress={onOpen}>
        Open
      </Button>
      <label htmlFor="add-event" aria-label="Create New Event">
        <Card className="bg-gradient-to-br from-primaryColor-400 to-secondaryColor-600 text-white shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer w-full h-full group py-10">
          <CardBody className="flex flex-col items-center justify-center h-full">
            <PlusIcon className="w-12 h-12 mb-4 transition-transform group-hover:rotate-90 duration-300" />
            <p className="text-lg font-semibold">Create New Event</p>
          </CardBody>
        </Card>
      </label>

      <Modal
        closeButton
        backdrop="blur"
        placement="center"
        size="2xl"
        isOpen={isOpen}
        onClose={onOpenChange}
      >
        <ModalContent>
          <ModalHeader>
            <div className="relative w-full h-48 rounded-t-lg overflow-hidden">
              <Image
                src="https://static.vecteezy.com/system/resources/thumbnails/030/829/646/small_2x/a-wedding-reception-with-lights-and-candles-ai-generated-photo.jpg"
                alt="Event banner"
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primaryColor-900/70 flex items-end justify-center pb-4">
                <h2 className="text-3xl font-bold text-white">
                  Create New Event
                </h2>
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-6">
              <Input
                placeholder="AI Innovations Expo"
                name="name"
                value={eventData.name}
                onChange={handleInputChange}
                size="lg"
                startContent={
                  <SquareChartGantt className="text-primaryColor-500" />
                }
              />
              <DatePicker
                label="Event date"
                value={eventData.date}
                onChange={(date) => setEventData((prev) => ({ ...prev, date }))}
              />
              <Input
                placeholder="Convention Center, New York"
                name="location"
                value={eventData.location}
                onChange={handleInputChange}
                size="lg"
                startContent={<MapPinIcon className="text-green-500" />}
              />
              <Input
                placeholder="750"
                name="maxAttendees"
                value={eventData.maxAttendees.toString()}
                onChange={handleInputChange}
                type="number"
                size="lg"
                startContent={<UsersIcon className="text-secondaryColor-500" />}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button className="primary-outline-button" onPress={onOpenChange}>
              Cancel
            </Button>
            <Button className="primary-button" onPress={handleSubmit}>
              Create Event
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

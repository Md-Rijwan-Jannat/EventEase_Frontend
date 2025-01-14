"use client";

import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Progress } from "@nextui-org/progress";
import { Chip } from "@nextui-org/chip";
import { CalendarIcon, UsersIcon, Clock } from "lucide-react";
import { TEvent } from "@/src/types";
import { useEvent } from "@/src/context/useEvent";
import { useAuth } from "@/src/context/useAuth";

const EventRegisterCard = ({ event }: { event: TEvent }) => {
  const { registerForEvent, withdrawFromEvent } = useEvent();
  const { authUser } = useAuth();

  const isRegistered = event.attendees?.includes(authUser?._id ?? "");

  const handleRegister = async () => {
    if (!isRegistered && event.attendees.length < event.maxAttendees) {
      try {
        await registerForEvent(event._id);
      } catch (error) {
        console.error("Registration failed:", error);
      }
    }
  };

  const handleWithdraw = async () => {
    if (isRegistered) {
      try {
        await withdrawFromEvent(event._id);
      } catch (error) {
        console.error("Withdrawal failed:", error);
      }
    }
  };

  return (
    <Card
      key={event._id}
      className="bg-default-50 border border-default-100/90 shadow-lg hover:shadow-xl transition-shadow duration-200 w-full mx-auto"
    >
      <CardHeader className="flex flex-col gap-2 p-5">
        <div className="flex justify-between items-start w-full gap-3">
          <div className="flex flex-col">
            <h2 className="text-lg font-bold text-default-900">{event.name}</h2>
            <p className="text-small text-default-500">
              Created by {event.createdBy.name}
            </p>
          </div>
          <Chip color="primary" variant="flat">
            {new Date(event.date).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            })}
          </Chip>
        </div>
      </CardHeader>
      <CardBody className="gap-4">
        <div className="flex items-center">
          <CalendarIcon className="w-5 h-5 mr-3 text-primary-500" />
          <p className="text-sm">{new Date(event.date).toLocaleDateString()}</p>
        </div>
        <div className="flex items-center">
          <Clock className="w-5 h-5 mr-3 text-warning-500" />
          <p className="text-sm">{new Date(event.date).toLocaleTimeString()}</p>
        </div>
        <div className="flex items-center">
          <UsersIcon className="w-5 h-5 mr-3 text-secondary-500" />
          <p className="text-sm">
            {event.attendees.length} / {event.maxAttendees} attendees
          </p>
        </div>
      </CardBody>
      <CardFooter className="flex flex-col gap-4">
        <Progress
          value={(event.attendees.length / event.maxAttendees) * 100}
          classNames={{
            base: "w-full",
            track:
              "bg-gradient-to-r from-secondaryColor-200 via-secondaryColor-200 to-secondaryColor-300",
            indicator:
              "bg-gradient-to-r from-primaryColor-300 via-primaryColor-500 to-primaryColor-600",
            value: "text-sm text-white font-semibold",
          }}
          className="w-full rounded-full overflow-hidden shadow-md"
        />
        <Button
          className={`w-full font-semibold ${
            isRegistered || event.attendees.length >= event.maxAttendees
              ? "bg-gray-400 text-gray-600 cursor-not-allowed"
              : "bg-primaryColor text-white"
          }`}
          radius="full"
          onPress={handleRegister} // Register
          isDisabled={
            isRegistered || event.attendees.length >= event.maxAttendees
          }
        >
          {isRegistered
            ? "Registered"
            : event.attendees.length >= event.maxAttendees
              ? "Event Full"
              : "Register Now"}
        </Button>
        {isRegistered && (
          <Button
            className="w-full font-semibold bg-red-500 text-white"
            radius="full"
            onPress={handleWithdraw} // Withdraw
          >
            Withdraw
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default EventRegisterCard;

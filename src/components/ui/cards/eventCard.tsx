import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Progress } from "@nextui-org/progress";
import { CalendarIcon, MapPinIcon, UsersIcon } from "lucide-react";

const EventCard = ({ event }: { event: any }) => (
  <Card
    key={event._id}
    className="bg-default-50 border border-default-100/90 shadow-lg hover:shadow-xl transition-shadow duration-300"
  >
    <CardHeader className="flex gap-3">
      <div className="flex flex-col">
        <p className="text-md font-bold">{event.name}</p>
        <p className="text-small text-default-500">
          Created by {event.createdBy.name}
        </p>
      </div>
    </CardHeader>
    <CardBody>
      <div className="flex items-center mb-2">
        <CalendarIcon className="w-4 h-4 mr-2 text-primaryColor-500" />
        <p className="text-sm">{new Date(event.date).toLocaleDateString()}</p>
      </div>
      <div className="flex items-center mb-2">
        <MapPinIcon className="w-4 h-4 mr-2 text-green-500" />
        <p className="text-sm">{event.location}</p>
      </div>
      <div className="flex items-center">
        <UsersIcon className="w-4 h-4 mr-2 text-secondaryColor-500" />
        <p className="text-sm">
          {event.attendees.length} / {event.maxAttendees} attendees
        </p>
      </div>
    </CardBody>
    <CardFooter>
      <Progress
        value={(event.attendees.length / event.maxAttendees) * 100}
        classNames={{
          base: "w-full",
          track:
            "bg-gradient-to-r from-secondaryColor-200 via-secondaryColor-300 to-secondaryColor-400",
          indicator:
            "bg-gradient-to-r from-primaryColor-400 via-primaryColor-500 to-primaryColor-600",
          value: "text-sm text-white font-semibold",
        }}
        className="w-full rounded-full overflow-hidden shadow-md"
      />
    </CardFooter>
  </Card>
);

export default EventCard;

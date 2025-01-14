"use client";

import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";

const EventCardSkeleton = () => (
  <Card className="bg-default-50 border border-default-100/90 shadow-lg hover:shadow-xl transition-shadow duration-300">
    <CardHeader className="flex gap-3">
      <div className="flex flex-col w-full">
        <Skeleton className="h-3 w-3/5 rounded-lg" />
        <Skeleton className="h-3 w-4/5 rounded-lg mt-2" />
      </div>
    </CardHeader>
    <CardBody>
      <div className="flex items-center mb-2">
        <Skeleton className="w-4 h-4 mr-2 rounded-full" />
        <Skeleton className="h-3 w-1/3 rounded-lg" />
      </div>
      <div className="flex items-center mb-2">
        <Skeleton className="w-4 h-4 mr-2 rounded-full" />
        <Skeleton className="h-3 w-2/5 rounded-lg" />
      </div>
      <div className="flex items-center">
        <Skeleton className="w-4 h-4 mr-2 rounded-full" />
        <Skeleton className="h-3 w-1/4 rounded-lg" />
      </div>
    </CardBody>
    <CardFooter>
      <Skeleton className="w-full h-4 rounded-full" />
    </CardFooter>
  </Card>
);

export default EventCardSkeleton;

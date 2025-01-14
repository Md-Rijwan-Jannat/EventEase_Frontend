"use client";

import React from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";

const NotificationCardSkeleton: React.FC = () => {
  return (
    <Card className="w-full bg-default-50">
      <CardBody className="flex flex-row items-center gap-4 p-4">
        <Skeleton className="rounded-full w-10 h-10" />
        <div className="flex-grow">
          <Skeleton className="h-4 w-3/4 rounded-lg" />
          <Skeleton className="h-3 w-1/2 rounded-lg mt-2" />
        </div>
        <Skeleton className="h-5 w-16 rounded-full" />
      </CardBody>
    </Card>
  );
};

export default NotificationCardSkeleton;

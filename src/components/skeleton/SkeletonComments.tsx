import { Card, Skeleton } from "@heroui/react";
import React from "react";

const SkeletonComments = () => {
  return (
    <div className="space-y-4">
      {[...Array(2)].map((_, i) => (
        <Card key={i} className="p-4 space-y-4" radius="lg">
          <div className="flex items-center gap-4">
            <Skeleton className="rounded-full w-10 h-10" />
            <div className="flex flex-col gap-2 w-full">
              <Skeleton className="w-1/4 h-4 rounded-lg" />
              <Skeleton className="w-1/6 h-3 rounded-lg" />
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <Skeleton className="h-4 w-full rounded-lg" />
            <Skeleton className="h-4 w-5/6 rounded-lg" />
            <Skeleton className="h-4 w-3/4 rounded-lg" />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SkeletonComments;

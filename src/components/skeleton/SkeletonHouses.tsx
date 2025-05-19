"use client";
import { Card, Skeleton } from "@heroui/react";

const SkeletonCard = () => (
  <Card className="w-full space-y-4 p-4 min-h-[300px]" radius="lg">
    <Skeleton className="rounded-lg w-full">
      <div className="h-40 bg-default-300 rounded-lg" />
    </Skeleton>
    <div className="space-y-3">
      <Skeleton className="w-3/4 rounded-lg">
        <div className="h-4 bg-default-200 rounded-lg" />
      </Skeleton>
      <Skeleton className="w-1/2 rounded-lg">
        <div className="h-3 bg-default-300 rounded-lg" />
      </Skeleton>
      <Skeleton className="w-full rounded-lg">
        <div className="h-4 bg-default-300 rounded-lg" />
      </Skeleton>
    </div>
  </Card>
);

export default function SkeletonCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {Array.from({ length: 2 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

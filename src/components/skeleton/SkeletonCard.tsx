"use client";

import { Card, Skeleton } from "@heroui/react";

export default function SkeletonCard() {
  return (
    <Card className="group bg-white dark:bg-slate-900 rounded-3xl shadow-md p-3 sm:p-4 border border-gray-100 dark:border-slate-700/40 space-y-4">
      <div className="relative overflow-hidden rounded-2xl">
        <Skeleton className="w-full h-[176px] rounded-2xl" />
      </div>

      <div className="space-y-3 px-2 sm:px-4">
        <Skeleton className="w-2/3 h-5 rounded-lg" />
        <Skeleton className="w-1/2 h-4 rounded-md" />

        <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-200 dark:border-slate-700">
          <Skeleton className="w-24 h-6 rounded-full" />
          <Skeleton className="w-24 h-6 rounded-full" />
          <Skeleton className="w-24 h-6 rounded-full" />
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-4">
          <Skeleton className="w-16 h-4 rounded-md" />
          <Skeleton className="w-20 h-6 rounded-md" />
          <Skeleton className="ml-auto w-12 h-6 rounded-full" />
        </div>
      </div>
    </Card>
  );
}

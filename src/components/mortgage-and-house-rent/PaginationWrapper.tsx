"use client";

import { Pagination } from "@heroui/react";

interface PaginationWrapperProps {
  total: number;
  initialPage?: number;
}

const PaginationWrapper = ({
  total,
  initialPage = 1,
}: PaginationWrapperProps) => {
  return (
    <div dir="ltr" className="w-full flex justify-center items-center mb-10">
      <Pagination
        className="mt-7"
        color="warning"
        showControls
        initialPage={initialPage}
        total={total}
      />
    </div>
  );
};

export default PaginationWrapper;

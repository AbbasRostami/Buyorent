"use client";

import { Pagination } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface PaginationWrapperProps {
  totalCount: number;
  pageSize?: number;
}

const PaginationWrapper = ({
  totalCount,
  pageSize = 9,
}: PaginationWrapperProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalCount / pageSize);

  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    setCurrentPage(page);
  }, [searchParams]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    // Preserve limit if it exists, otherwise set default
    if (!params.get("limit")) {
      params.set("limit", String(pageSize));
    }

    if (page > 1) {
      params.set("page", String(page));
    } else {
      params.delete("page");
    }

    router.push(`?${params.toString()}`, { scroll: false });
    setCurrentPage(page);
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div dir="ltr" className="w-full flex justify-center items-center mb-10">
      <Pagination
        className="mt-7"
        color="warning"
        showControls
        page={currentPage}
        total={totalPages}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default PaginationWrapper;

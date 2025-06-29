// hooks/getBooking.ts
import { useMemo } from "react";
import { useQueries, useQueryClient } from "@tanstack/react-query";

import { useGet } from "@/utils/hooks/useReactQueryHooks";
import api from "../interceptor";
interface UseBookingWithHousesOptions {
  endpoint: string; // مثل "/bookings"
  queryKeyPrefix: string; // مثل "bookingSeller" یا "bookingBuyer"
  pageIndex: number;
  pageSize: number;
}

export function useBookingWithHouses<T extends { houseId: number }>(
  options: UseBookingWithHousesOptions
) {
  const { endpoint, queryKeyPrefix, pageIndex, pageSize } = options;

  const { data: bookingData, isLoading } = useGet<{
    data: T[];
    totalCount: number;
  }>(
    endpoint,
    {
      page: pageIndex + 1,
      limit: pageSize,
      sort: "created_at",
      order: "DESC",
    },
    {
      queryKey: [
        queryKeyPrefix,
        {
          page: pageIndex + 1,
          limit: pageSize,
          sort: "created_at",
          order: "DESC",
        },
      ],
    }
  );

  const uniqueHouseIds = useMemo(() => {
    return Array.from(new Set(bookingData?.data.map((b) => b.houseId)));
  }, [bookingData?.data]);

  const houseQueries = useQueries({
    queries: uniqueHouseIds.map((id) => ({
      queryKey: ["house", id],
      queryFn: async () => {
        const { data } = await api.get(`/houses/${id}`);
        return data;
      },
      enabled: !!bookingData?.data?.length,
      staleTime: 5 * 60 * 1000,
    })),
  });

  const houseMap = useMemo(() => {
    const map = new Map<number, any>();
    uniqueHouseIds.forEach((id, index) => {
      map.set(id, houseQueries[index]?.data);
    });
    return map;
  }, [houseQueries, uniqueHouseIds]);

  const combinedData = useMemo(() => {
    return bookingData?.data.map((booking) => ({
      ...booking,
      house: houseMap.get(booking.houseId),
    }));
  }, [bookingData?.data, houseMap]);

  return {
    combinedData,
    isLoading,
    totalCount: bookingData?.totalCount || 0,
  };
}

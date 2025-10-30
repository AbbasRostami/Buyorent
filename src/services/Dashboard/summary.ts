import { useGet } from "@/utils/hooks/useReactQueryHooks";

interface Summary {
  houses: number;
  users: number;
  bookings: {
    bookingCount: number;
    canceledBookings: number;
    conformedBookings: number;
    pendingBookings: number;
  };
  averageRating: string;
}

export const useGetSummary = () => {
  const {
    data: summary,
    isLoading,
    isError,
  } = useGet<Summary>("/dashboard/summary", {
    queryKey: ["summary"] as string[],
  } as any);

  return { summary, isLoading, isError };
};

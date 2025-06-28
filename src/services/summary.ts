import { useGet } from "@/utils/hooks/useReactQueryHooks";

interface Summary {
  houses: number;
  users: number;
  bookings: number;
  averageRating: string;
}

export const useGetSummary = () => {
  const {
    data: summary,
    isLoading,
    isError,
  } = useGet<Summary>("/dashboard/summary", {
    queryKey: ["summary"],
  });

  return { summary, isLoading, isError };
};

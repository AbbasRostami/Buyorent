import { useGet } from "@/utils/hooks/useReactQueryHooks";

export const useHouse = (
  pageIndex: number,
  pageSize: number,
  enabled: boolean = true
) =>
  useGet(
    `/houses`,
    { limit: pageSize, page: pageIndex + 1 },
    {
      queryKey: ["house", pageSize, pageIndex],
      enabled,
    }
  );

import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import api from "./apiClient";
// lib/server-hooks.ts
import { unstable_cache } from "next/cache";

type ErrorType = Error;

//// GET Hook
export const useGet = <T>(
  url: string,
  queryKey: any[],
  options?: UseQueryOptions<T, ErrorType>
) => {
  return useQuery<T, ErrorType>({
    queryKey,
    queryFn: async () => {
      const res = await api.get(url);
      return res.data;
    },
    ...options,
  });
};

// POST Hook
export const usePost = <T, D = any>(
  url: string,
  options?: UseMutationOptions<T, ErrorType, D>
) => {
  return useMutation<T, ErrorType, D>({
    mutationFn: async (data: D) => {
      const res = await api.post(url, data);
      return res.data;
    },
    ...options,
  });
};

// PUT Hook
export const usePut = <T, D = any>(
  url: string,
  options?: UseMutationOptions<T, ErrorType, D>
) => {
  return useMutation<T, ErrorType, D>({
    mutationFn: async (data: D) => {
      const res = await api.put(url, data);
      return res.data;
    },
    ...options,
  });
};

// DELETE Hook
export const useDelete = <T, D = any>(
  url: string,
  options?: UseMutationOptions<T, ErrorType, D>
) => {
  return useMutation<T, ErrorType, D>({
    mutationFn: async (data: D) => {
      const res = await api.delete(url, { data });
      return res.data;
    },
    ...options,
  });
};

import axios from "axios";

export const useServerData = (
  url: string,
  cacheKey: string,
  revalidateTime: number = 60
) => {
  const fetchData = unstable_cache(
    async () => {
      try {
        const { data } = await axios.get(url);
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Data fetch failed");
      }
    },
    [cacheKey],
    { revalidate: revalidateTime }
  );

  return fetchData();
};

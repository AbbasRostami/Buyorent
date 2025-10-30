import api from "@/services/interceptor";
import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { ApiError, QueryParams } from "@/types/api/ErrorTypes";

// GET Hook
export const useGet = <T>(
  endpoint: string,
  params?: QueryParams,
  options?: UseQueryOptions<T, ApiError>
) => {
  const queryKey = options?.queryKey ?? [endpoint, params];

  return useQuery<T, ApiError>({
    queryKey,
    queryFn: async () => {
      const { data } = await api.get<T>(endpoint, {
        params,
        paramsSerializer: {
          indexes: null,
        },
      });
      return data;
    },
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

// POST Hook
export const usePost = <T, D = unknown>(
  url: string,
  options?: UseMutationOptions<T, ApiError, D>
) => {
  return useMutation<T, ApiError, D>({
    mutationFn: async (data: D) => {
      const res = await api.post<T>(url, data);
      return res.data;
    },
    ...options,
  });
};

// PUT Hook
export const usePut = <T, D = unknown>(
  url: string,
  options?: UseMutationOptions<T, ApiError, D>
) => {
  return useMutation<T, ApiError, D>({
    mutationFn: async (data: D) => {
      const res = await api.put<T>(url, data);
      return res.data;
    },
    ...options,
  });
};

// DELETE Hook
export const useDelete = <T, D = unknown>(
  getUrl: (data: D) => string,
  options?: UseMutationOptions<T, ApiError, D>
) => {
  return useMutation<T, ApiError, D>({
    mutationFn: async (data: D) => {
      const url = getUrl(data);
      const res = await api.delete<T>(url);
      return res.data;
    },
    ...options,
  });
};

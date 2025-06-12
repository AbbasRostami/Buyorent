import api from "@/services/interceptor";
import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

// GET Hook
export const useGet = <T>(
  endpoint: string,
  params?: Record<string, any>,
  options?: UseQueryOptions<T, AxiosError>
) => {
  const queryKey = options?.queryKey ?? [endpoint, params];

  return useQuery<T, AxiosError>({
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
export const usePost = <T, D = any>(
  url: string,
  options?: UseMutationOptions<T, AxiosError, D>
) => {
  return useMutation<T, AxiosError, D>({
    mutationFn: async (data: D) => {
      const res = await api.post<T>(url, data);
      return res.data;
    },
    ...options,
  });
};

// PUT Hook
export const usePut = <T, D = any>(
  url: string,
  options?: UseMutationOptions<T, AxiosError, D>
) => {
  return useMutation<T, AxiosError, D>({
    mutationFn: async (data: D) => {
      const res = await api.put<T>(url, data);
      return res.data;
    },
    ...options,
  });
};

// DELETE Hook
export const useDelete = <T, D = any>(
  getUrl: (data: D) => string,
  options?: UseMutationOptions<T, AxiosError, D>
) => {
  return useMutation<T, AxiosError, D>({
    mutationFn: async (data: D) => {
      const url = getUrl(data);
      const res = await api.delete<T>(url);
      return res.data;
    },
    ...options,
  });
};

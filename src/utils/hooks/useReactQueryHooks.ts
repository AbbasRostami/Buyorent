import api from "@/services/interceptor";
import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

type ErrorType = Error;

//// GET Hook
export const useGet = <T>(
  endpoint: string,
  params?: Record<string, any>,
  options?: UseQueryOptions<T, AxiosError>
) => {
  return useQuery<T, AxiosError>({
    queryKey: [endpoint, params], 
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

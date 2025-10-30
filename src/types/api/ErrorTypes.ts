import { AxiosError } from "axios";

export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
  statusCode?: number;
}

export type ApiError = AxiosError<ApiErrorResponse>;

export type QueryParams = Record<
  string,
  string | number | boolean | undefined | null
>;

export type ApiResponse<T> = {
  data: T;
  message?: string;
  statusCode?: number;
};

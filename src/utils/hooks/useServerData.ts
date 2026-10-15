import axios from "axios";
import { unstable_cache } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export const useServerData = async <T>(
  endpoint: string,
  cacheKey?: string,
  revalidateTime?: number,
): Promise<T> => {
  if (cacheKey && revalidateTime !== undefined) {
    const fetchData = unstable_cache(
      async (): Promise<T> => {
        try {
          const { data } = await axios.get<T>(`${API_URL}${endpoint}`);
          return data;
        } catch (error: any) {
          if (error?.response?.status === 404) {
            console.warn(
              `[API 404 Warning]: Endpoint not found -> ${API_URL}${endpoint}`,
            );
            return { data: [] } as unknown as T;
          }
          throw error;
        }
      },
      [cacheKey],
      { revalidate: revalidateTime },
    );

    return fetchData();
  }

  try {
    const { data } = await axios.get<T>(`${API_URL}${endpoint}`, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
    return data;
  } catch (error: any) {
    console.error(
      "SSR fetch error:",
      error?.message,
      "Endpoint:",
      `${API_URL}${endpoint}`,
    );

    if (error?.response?.status === 404) {
      return { data: [] } as unknown as T;
    }

    throw new Error("Data fetch failed");
  }
};

import axios from "axios";
import { unstable_cache } from "next/cache";
import { HouseQueryParams } from "@/types/Landing/LandingType";

const API_BASE = process.env.NEXT_PUBLIC_API_URL!;

export class ApiClient {
  private static async cachedFetch<T>(
    endpoint: string,
    params: Record<string, any> = {},
    revalidate: number = 60
  ): Promise<T> {
    // ساخت کوئری استرینگ و کلید کش
    const filteredParams = Object.entries(params).reduce(
      (acc, [key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, any>
    );

    const queryString = new URLSearchParams(filteredParams).toString();
    const cacheKey = `api-${endpoint}-${JSON.stringify(filteredParams)}`;

    // ایجاد تابع کش شده
    const cachedRequest = unstable_cache(
      async () => {
        try {
          const { data } = await axios.get(
            `${API_BASE}/${endpoint}?${queryString}`
          );
          return data;
        } catch (error: any) {
          console.error(`API Error in ${endpoint}:`, error?.message);
          throw new Error(`Request failed: ${error?.message}`);
        }
      },
      [cacheKey],
      { revalidate, tags: [cacheKey] }
    );

    return cachedRequest();
  }

  static houses(params: HouseQueryParams = {}, revalidate?: number) {
    return this.cachedFetch<any[]>("houses", params, revalidate);
  }
}

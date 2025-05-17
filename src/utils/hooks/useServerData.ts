import axios from "axios";
import { unstable_cache } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export const useServerData = async <T>(
  endpoint: string,
  cacheKey: string,
  revalidateTime: number = 60
): Promise<T> => {
  const fetchData = unstable_cache(
    async (): Promise<T> => {
      try {
        const { data } = await axios.get<T>(`${API_URL}${endpoint}`);
        return data;
      } catch (error: any) {
        console.error("Error fetching data:", error?.message);
        throw new Error("Data fetch failed");
      }
    },
    [cacheKey],
    { revalidate: revalidateTime }
  );

  return fetchData();
};

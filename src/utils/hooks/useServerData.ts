import axios from "axios";
import { unstable_cache } from "next/cache";

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

import { useServerData } from "@/utils/hooks/useServerData";
import { HouseSingleHousesProps } from "@/types/DetailsTypes";
import ClientWrapper from "./components/ClientWrapper";

export const revalidate = 300;

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface HousesResponse {
  houses: HouseSingleHousesProps[];
  totalCount?: number;
}

export default async function ComparePage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const ids = ((resolvedSearchParams.id as string) || "")
    .split(",")
    .filter(Boolean);

  const housesData = await useServerData<HousesResponse>(
    "/houses",
    "compare-houses",
    300
  );

  console.log("housesData", housesData);
  const selectedHouses = ids
    .map((id) =>
      housesData?.houses?.find(
        (h: HouseSingleHousesProps) => String(h.id) === String(id)
      )
    )
    .filter((house): house is HouseSingleHousesProps => house !== undefined);

  return (
    <ClientWrapper
      selectedHouses={selectedHouses}
      ids={ids}
      housesData={housesData?.houses || []}
    />
  );
}

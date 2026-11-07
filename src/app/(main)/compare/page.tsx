import { HouseSingleHousesProps } from "@/types/DetailsTypes";
import ClientWrapper from "./components/ClientWrapper";
import { getServerData } from "@/utils/hooks/useServerData";

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

  const housesData = await getServerData<HousesResponse>("/houses", {
    revalidate: 300,
    tags: ["compare-houses"],
  });

  const selectedHouses = ids
    .map((id) =>
      housesData?.houses?.find(
        (h: HouseSingleHousesProps) => String(h.id) === String(id),
      ),
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

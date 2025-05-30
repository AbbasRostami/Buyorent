import { useServerData } from "@/utils/hooks/useServerData";
import ClientWrapper from "./ClientWrapper";
import { HouseSingleHousesProps } from "@/types/DetailsTypes";

export const revalidate = 300; 

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ComparePage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const ids = ((resolvedSearchParams.id as string) || "")
    .split(",")
    .filter(Boolean);

  const housesData = await useServerData<HouseSingleHousesProps[]>(
    "/houses",
    "compare-houses",
    300
  );

  const selectedHouses = ids
    .map((id) =>
      (housesData || []).find(
        (h: HouseSingleHousesProps) => String(h.id) === String(id)
      )
    )
    .filter((house): house is HouseSingleHousesProps => house !== undefined);

  return (
    <ClientWrapper
      selectedHouses={selectedHouses}
      ids={ids}
      housesData={housesData}
    />
  );
}

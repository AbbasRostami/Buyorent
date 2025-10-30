import { useServerData } from "@/utils/hooks/useServerData";
import ClientWrapper from "../../../components/houses-reserve/ClientWrapper";
import qs from "qs";
import { HouseReserveProps } from "@/types/HousesReserve";
import { generateHousesReserveMetadata } from "@/utils/metadata/houses-reserve";
import { Metadata } from "next";
import { Suspense } from "react";
import SkeletonCards from "@/components/skeleton/SkeletonHouses";

export const revalidate = 60;

type SearchParams = {
  minPrice?: string;
  maxPrice?: string;
  sort?: "rate" | "price";
  order?: "asc" | "desc";
  transactionType?: "mortgage" | "rental" | "reservation" | "direct_purchase";
  search?: string;
};

type Props = {
  searchParams: Promise<SearchParams>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  return generateHousesReserveMetadata(resolvedSearchParams);
}

export default async function HousesReservePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolved = await searchParams;
  const queryString = qs.stringify(resolved, {
    arrayFormat: "brackets",
    encode: false,
  });
  const endpoint = queryString ? `/houses?${queryString}` : "/houses";

  return (
    <div className="min-h-screen pt-20">
      <Suspense fallback={<SkeletonCards />}>
        <ServerContent endpoint={endpoint} cacheKey={`houses-${queryString}`} />
      </Suspense>
    </div>
  );
}

async function ServerContent({
  endpoint,
  cacheKey,
}: {
  endpoint: string;
  cacheKey: string;
}) {
  const initialData = await useServerData<HouseReserveProps[]>(
    endpoint,
    cacheKey,
    60
  );
  return <ClientWrapper initialData={initialData} />;
}

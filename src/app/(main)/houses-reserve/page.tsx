import { useServerData } from "@/utils/hooks/useServerData";
import ClientWrapper from "./ClientWrapper";
import qs from "qs";
import { HouseReserveProps } from "@/types/HousesReserve";
import { generateHousesReserveMetadata } from "@/utils/metadata/houses-reserve";
import { Metadata } from "next";

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

export default async function Page(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = await props.searchParams;

  const queryString = qs.stringify(resolvedSearchParams, {
    arrayFormat: "brackets",
    encode: false,
  });

  const endpoint = queryString ? `/houses?${queryString}` : "/houses";

  const initialData = await useServerData<HouseReserveProps[]>(
    endpoint,
    `houses-${queryString}`,
    60
  );

  return <ClientWrapper initialData={initialData} />;
}

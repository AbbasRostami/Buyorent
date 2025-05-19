import { useServerData } from "@/utils/hooks/useServerData";
import ClientWrapper from "./ClientWrapper";
import qs from "qs";
import { HouseReserveProps } from "@/types/HousesReserve";

export const revalidate = 60;

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

  console.log("initialData: ", initialData);
  
  return <ClientWrapper initialData={initialData} />;
}

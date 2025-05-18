import { useServerData } from "@/utils/hooks/useServerData";
import ClientWrapper from "./ClientWrapper";
import qs from "qs";

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  // Create a plain object copy of searchParams
  const paramsCopy = { ...searchParams };
  
  const queryString = qs.stringify(paramsCopy, {
    arrayFormat: 'brackets',
    encode: false,
  });

  const endpoint = queryString ? `/houses?${queryString}` : "/houses";
  
  const initialData = await useServerData(
    endpoint,
    `houses-${queryString}`,
    60
  );

  return <ClientWrapper initialData={initialData} />;
}
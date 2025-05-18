import { useServerData } from "@/utils/hooks/useServerData";
import ClientWrapper from "./ClientWrapper";
import qs from "qs";

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

  const initialData = await useServerData(
    endpoint,
    `houses-${queryString}`,
    60
  );

  return <ClientWrapper initialData={initialData} />;
}

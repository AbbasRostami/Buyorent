"use client";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useGet } from "@/utils/hooks/useReactQueryHooks";
import { useMemo } from "react";

const FilterData = dynamic(() => import("./FilterData"));
const ItemsList = dynamic(() => import("./ItemsList"));
const MapHousesReserve = dynamic(() => import("./MapHousesReserve"));

export default function ClientWrapper({ initialData }: { initialData: any }) {
  const searchParams = useSearchParams();
  const params = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams]
  );

  const { data } = useGet("/houses", params, {
    initialData,
    queryKey: ["houses", params],
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:h-screen min-h-screen pt-20 dark:bg-[#0a192f]">
      <div className="bg-white p-6 flex flex-col overflow-hidden dark:bg-[#0a192f]">
        <FilterData />
        <ItemsList data={data} />
      </div>

      <div className="z-0 dark:bg-[#0a192f] p-4 lg:p-0 md:h-[calc(100vh-5rem)] min-h-[400px]">
        <MapHousesReserve data={data} />
      </div>
    </div>
  );
}

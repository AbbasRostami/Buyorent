import PropertyCard from "@/components/mortgage-and-house-rent/PropertyCard";
import ClientWrapper from "@/components/mortgage-and-house-rent/ClientWrapper";
import PaginationWrapper from "@/components/mortgage-and-house-rent/PaginationWrapper";
import qs from "qs";
import { useServerData } from "@/utils/hooks/useServerData";
import { HouseTypeRentProps } from "@/types/LandingType";

export const revalidate = 60;

export const dynamic = "force-dynamic";

export default async function RentPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const queryString = qs.stringify(searchParams, {
    arrayFormat: "brackets",
    encode: false,
  });

  const endpoint = queryString ? `/houses?${queryString}` : "/houses";

  const data = await useServerData<HouseTypeRentProps>(
    endpoint,
    `houses-${queryString}`,
    60
  );

  return (
    <>
      <div className="mt-32 gap-2 flex flex-col sm:flex-row sm:justify-start justify-center items-center max-w-screen-xl mx-auto px-4 text-center sm:text-right">
        <p className="text-2xl sm:text-4xl font-bold">رهن و اجاره </p>
        <p className="bg-[#e89300] rounded-2xl px-4 py-2 w-fit h-fit text-white font-bold text-xl sm:text-3xl mt-2 sm:mt-0">
          آپارتمان
        </p>
      </div>

      <div className="flex flex-col justify-center gap-6 xl:flex-row md:justify-start md:items-center max-w-screen-xl mx-auto mt-14 text-[#272727] rounded-2xl px-4">
        <ClientWrapper initialData={data} />
      </div>

      <PropertyCard data={data} isLoading={false} />

      <PaginationWrapper total={5} />
    </>
  );
}

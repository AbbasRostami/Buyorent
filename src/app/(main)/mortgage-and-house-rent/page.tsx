import PropertyCard from "@/components/mortgage-and-house-rent/PropertyCard";
import ClientWrapper from "@/components/mortgage-and-house-rent/ClientWrapper";
import PaginationWrapper from "@/components/mortgage-and-house-rent/PaginationWrapper";
import qs from "qs";
import { useServerData } from "@/utils/hooks/useServerData";
import { HouseTypeRentProps } from "@/types/Landing/LandingType";
import SmartSearchContainer from "@/components/mortgage-and-house-rent/SmartSearchContainer";
import { convertToHouseItems } from "@/types/property";
import { generateMortgageAndRentMetadata } from "@/utils/metadata/mortgage-and-rent";
import { Metadata } from "next";
import { SearchParams, SearchParamsType } from "@/types/search";

export const revalidate = 60;

type Props = {
  searchParams: Promise<SearchParams>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  return generateMortgageAndRentMetadata(resolvedSearchParams);
}

export default async function RentPage({
  searchParams,
}: {
  searchParams: Promise<SearchParamsType>;
}) {
  const resolvedSearchParams = await searchParams;
  const queryString = qs.stringify(resolvedSearchParams, {
    encode: false,
  });

  const endpoint = queryString ? `/houses?${queryString}` : "/houses";

  const data = await useServerData<HouseTypeRentProps>(
    endpoint,
    `houses-${queryString}`,
    60
  );

  const convertedData = convertToHouseItems(data);

  return (
    <>
      <div className="mt-32 gap-4 flex flex-col sm:flex-row sm:justify-between   justify-center items-center max-w-screen-xl mx-auto px-4 text-center sm:text-right">
        <div className="flex justify-center items-center gap-2">
          <p className="text-2xl sm:text-4xl font-bold">رهن و اجاره </p>
          <p className="bg-[#e89300] rounded-2xl px-4 py-2 w-fit h-fit text-white font-bold text-xl sm:text-3xl mt-2 sm:mt-0">
            آپارتمان
          </p>
        </div>
        <div className="flex justify-center items-center">
          <SmartSearchContainer properties={convertedData} />
        </div>
      </div>

      <div className="flex flex-col justify-center gap-6 xl:flex-row md:justify-start md:items-center max-w-screen-xl mx-auto mt-14 text-[#272727] rounded-2xl px-4">
        <ClientWrapper initialData={data} />
      </div>

      <PropertyCard data={data} isLoading={false} />

      <PaginationWrapper total={5} />
    </>
  );
}

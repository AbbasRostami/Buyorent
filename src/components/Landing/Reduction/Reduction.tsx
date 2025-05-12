import { useServerData } from "@/utils/hooks/useServerData";
import ReductionCarousel from "./ReductionSwiper";
import ReductionHeader from "./ReductionHeader";

export default async function Reduction() {
  const houses = await useServerData(
    "/houses?limit=4&sort=rate&order=DESC&transactionType=",
    "top-rated-houses",
    60
  );

  return (
    <div className="relative rounded-2xl border-2 border-gray-200 mt-20">
      <ReductionHeader />
      <ReductionCarousel houses={houses} />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 border-t-2 border-gray-200 rounded-t-md inverted_bottom drop-shadow-2xl">
        <div className="customer flex justify-center p-1" />
      </div>
    </div>
  );
}

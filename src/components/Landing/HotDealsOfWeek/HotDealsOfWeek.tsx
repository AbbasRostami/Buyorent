import { IoIosArrowBack } from "react-icons/io";
import { FaCircle } from "react-icons/fa6";
import { useServerData } from "@/utils/hooks/useServerData";
import HotDealsOfWeekSwiper from "./HotDealsOfWeekSwiper";
import { HouseTypeProps } from "@/types/LandingType";
import Link from "next/link";

export default async function HotDealsOfWeek() {
  const houses = await useServerData<HouseTypeProps["houses"]>(
    "/houses?limit=4&sort=rate&order=DESC&transactionType=",
    "top-last_updated-houses",
    60
  );

  return (
    <div className="relative w-full mt-20">
      <div className="flex  flex-col md:flex-row items-center justify-between rounded-xl px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6 p-6">
          <div className="flex items-center gap-3">
            <FaCircle
              size={17}
              className="text-orange-500 text-xs  animate-pulse-color"
            />
            <h2 className="text-orange-700 text-medium md:text-2xl font-bold dark:text-amber-400">
              داغ‌ترین معاملات هفته
            </h2>
          </div>
          <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
            آنچه که از بازار معاملات ملک در این هفته داشتیم
          </p>
        </div>

        <Link
          href="/houses-reserve"
          className="flex items-center gap-2 cursor-pointer justify-center px-5 py-2 rounded-xl
             md:text-sm text-medium font-semibold shadow-md transition-all duration-300
             text-gray-600 bg-white hover:bg-amber-100
             dark:text-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700"
        >
          مشاهده همه
          <IoIosArrowBack className="text-xl transition-transform duration-300 group-hover:-translate-x-1" />
        </Link>
      </div>

      <HotDealsOfWeekSwiper houses={houses} />
      <div className="HotDeals flex justify-center mt-7  p-1 " />
    </div>
  );
}

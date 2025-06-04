import { HeroButton } from "@/utils/providers/HeroUIClient";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import FavoritesSwiper from "./FavoritesSwiper";

export default function Favourites() {
  return (
    <div className=" relative  rounded-2xl  border-gray-200 bg-gray-100 overflow-hidden mt-38 step-5">
      {/* گوشه معکوس */}
      <div className="absolute bottom-0 right-12 rounded-tab">
        <HeroButton
          variant="light"
          className="flex items-center border-1 border-gray-300 dark:bg-gray-800 bg-white mt-2 justify-center px-4 py-2 text-lg font-semibold text-gray-400 "
        >
          مشاهده همه
          <IoIosArrowBack className="text-lg mr-1" />
        </HeroButton>
      </div>

      <div className="absolute top-0 right-0 rotate-180 rounded-tab-right">
        <div className="text-xl md:text-2xl rotate-180 font-bold text-orange-700 dark:text-orange-500 flex items-center gap-2">
          <span className="w-2 h-2 bg-gray-300 rounded-full inline-block" />
          اجاره ویلا در محبوب‌ترین مقصدهای این ماه
        </div>
      </div>

      <div className="absolute flex gap-4 left-0 bottom-5 -translate-x-12  rotate-90 rounded-tab p-2">
        <button className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-500    shadow flex items-center justify-center hover:bg-gray-100">
          <IoIosArrowRoundForward className="dark:text-amber-50" />
        </button>
        <button className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-500  shadow flex items-center justify-center hover:bg-gray-100">
          <IoIosArrowRoundBack className="dark:text-amber-50" />
        </button>
      </div>

      <FavoritesSwiper />
    </div>
  );
}

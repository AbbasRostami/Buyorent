// components/InvertedSlider.tsx

"use client";

import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/free-mode";
import { Button } from "@heroui/react";
import { FreeMode } from "swiper/modules";
import image1 from "./../../assets/Rectangle 27.png";
import image2 from "./../../assets/Rectangle 27 (2).png";
import image3 from "./../../assets/Rectangle 27 (3).png";
import { IoIosArrowBack } from "react-icons/io";
import Image from "next/image";

const destinations = [
  { title: "اصفهان", visits: "۶۳ بازدید", img: image1, seen: "2بازدید" },
  { title: "شیراز", visits: "۶۳ بازدید", img: image2, seen: "2بازدید" },
  { title: "تهران", visits: "۶۳ بازدید", img: image3, seen: "2بازدید" },
  { title: "اصفهان", visits: "۶۳ بازدید", img: image1, seen: "2بازدید" },
  { title: "اصفهان", visits: "۶۳ بازدید", img: image2, seen: "2بازدید" },
];

export default function Favourites() {
  const sliderRef = useRef<HTMLDivElement>(null);

  return (
    <div className=" relative  rounded-2xl  border-gray-200 bg-gray-100 overflow-hidden mt-38">
      {/* گوشه معکوس */}
      <div className="absolute bottom-0 right-12 rounded-tab">
        <Button
          variant="light"
          className="flex items-center border-1 border-gray-300 dark:bg-gray-800 bg-white mt-2 justify-center px-4 py-2 text-lg font-semibold text-gray-400 "
        >
          مشاهده همه
          <IoIosArrowBack className="text-lg mr-1" />
        </Button>
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

      <div className="p-4 dark:bg-gray-700">
        <div>
          <div className="grid grid-cols-9 gap-4 items-center px-4 py-2">
            <p className="col-span-4 text-right  text-md md:text-lg dark:text-amber-50 text-gray-600 mb-4">
              اینجا می‌تونید محبوب‌ترین مقصدهایی که توی ماه اخیر از نگاه کاربران
              پربازدیدتر از بقیه بودن رو ببینید!
            </p>

            <div className="col-span-5">
              <Swiper
                modules={[Navigation]}
                spaceBetween={10}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  640: { slidesPerView: 3 },
                  768: { slidesPerView: 3 },
                  // 1024: { slidesPerView: 5 },
                  // 1280: { slidesPerView: 6 },
                }}
              >
                {destinations.map((card, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <div className="group relative cursor-pointer">
                        <Image
                          src={card.img}
                          alt={card.title}
                          className="transition-transform duration-500 group-hover:scale-105   filter group-hover:brightness-50"
                        />

                        {/* Title */}
                        <div className="absolute bottom-4 right-4 text-white font-bold text-xl transform transition-all duration-300 group-hover:-translate-y-2">
                          {card.title}
                        </div>

                        {/* Date appears on hover */}
                        <div className="absolute bottom-2 right-4 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {card.seen}
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

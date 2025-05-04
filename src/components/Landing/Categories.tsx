"use client";

import { useState } from "react";
import Image from "next/image";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/navigation";

import boat from "./../../assets/Landing/boat.png";
import condo from "./../../assets/Landing//condo.png";
import cottage from "./../../assets/Landing//cottage.png";
import forest from "./../../assets/Landing//forest.png";
import swimmingpool from "./../../assets/Landing//swimmingpool.png";
import villa from "./../../assets/Landing//villa.png";

const cards = [
  { title: "کلبه ای", img: boat },
  { title: "استخر دار", img: swimmingpool },
  { title: "ویلایی", img: villa },
  { title: "بوم گردی", img: forest },
  { title: "ساحلی", img: cottage },
  { title: "آپارتمان", img: condo },
  { title: "آپارتمان", img: condo },
];

export default function CustomSwiper() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="w-full px-4 py-8 relative">
      {/* Buttons */}
      <button className="custom-prev absolute top-1/2 -translate-y-1/2 -right-4 z-10 bg-gray-200 dark:bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-gray-300 transition">
        <IoIosArrowRoundForward  className="dark:text-amber-100" size={25}/>
      </button>
      <button className="custom-next absolute top-1/2 -translate-y-1/2 -left-4 z-10 bg-gray-200 dark:bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-gray-300 transition">
        <IoIosArrowRoundBack className="dark:text-amber-100" size={25}/>
      </button>

      <Swiper
        modules={[Autoplay, Navigation]}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
      >
        {cards.map((card, index) => {
          const isActive = selected === card.title;

          return (
            <SwiperSlide key={index} className="flex justify-center">
              <div
                onClick={() => setSelected(card.title)}
                className={`
                  aspect-square w-[160px] mx-auto
                  drop-shadow group relative flex flex-col items-center justify-center 
                  rounded-2xl bg-white dark:bg-gray-800   cursor-pointer transition-all
                  border-r-4 ${
                    isActive ? "border-yellow-400" : "border-transparent"
                  }
                  hover:border-yellow-400
                `}
              >
                <div className="relative w-[50px] h-[50px] flex items-center justify-center">
                  <div className="absolute translate-x-4 -translate-y-2 -z-10 pointer-events-none">
                    <svg
                      width="47"
                      height="50"
                      viewBox="0 0 47 50"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M47 26.6355C47 41.3459 23.0532 50 8.13122 50C-6.79071 50 3.39109 38.5422 3.39109 23.8318C3.39109 9.12139 5.05953 0 19.9815 0C34.9034 0 47 11.9251 47 26.6355Z"
                        fill={isActive ? "#FFD700" : "#F8F8F8"}
                        className="transition-all group-hover:fill-yellow-400"
                      />
                    </svg>
                  </div>
                  <Image
                    src={card.img}
                    alt={card.title}
                    width={40}
                    height={40}
                  />
                </div>
                <p className="mt-2 text-sm font-bold text-gray-700 dark:text-amber-100 " >
                  {card.title}
                </p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

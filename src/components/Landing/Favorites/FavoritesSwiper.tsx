"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/free-mode";
import image1 from "./../../../assets/Rectangle 27.png";
import image2 from "./../../../assets/Rectangle 27 (2).png";
import image3 from "./../../../assets/Rectangle 27 (3).png";
import Image from "next/image";

const destinations = [
  { title: "اصفهان", visits: "۶۳ بازدید", img: image1, seen: "2بازدید" },
  { title: "شیراز", visits: "۶۳ بازدید", img: image2, seen: "2بازدید" },
  { title: "تهران", visits: "۶۳ بازدید", img: image3, seen: "2بازدید" },
  { title: "اصفهان", visits: "۶۳ بازدید", img: image1, seen: "2بازدید" },
  { title: "اصفهان", visits: "۶۳ بازدید", img: image2, seen: "2بازدید" },
];

const FavoritesSwiper = () => {
  return (
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
  );
};

export default FavoritesSwiper;

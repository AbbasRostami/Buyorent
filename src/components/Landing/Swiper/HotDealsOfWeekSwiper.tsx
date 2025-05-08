"use client";
import React from "react";
import { FaShower } from "react-icons/fa";
import { IoMdBed } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { MdFamilyRestroom } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { HouseTypeProps } from "@/types/LandingType";
import Image from "next/image";

const HotDealsOfWeekSwiper = ({ houses }: HouseTypeProps) => {
  const extendHouses = [
    ...houses,
    ...houses,
    ...houses,
    ...houses,
    ...houses,
    ...houses,
  ];
  return (
    <div className=" relative gap-4 px-7">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          nextEl: ".custom-next-off",
          prevEl: ".custom-next-Hot",
        }}
        pagination={{
          el: ".HotDeals",
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {extendHouses?.map((items, index) => (
          <SwiperSlide
            key={index}
            className="flex justify-center p-4 rounded-xl "
          >
            <div className="bg-[#FFFAF3] dark:bg-neutral-900 rounded-xl shadow-xl py-4 px-2 mx-auto cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/50">
              <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                loop
              >
                {items.photos.map((photo: string, idx: number) => (
                  <SwiperSlide key={idx}>
                    <Image
                      src={photo}
                      unoptimized
                      alt={`${items.title}-photo-${idx}`}
                      width={300}
                      height={176}
                      className="object-cover rounded-xl bg-white shadow-xl p-1 border-2 border-gray-100 transition-all duration-300 ease-in-out transform"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="px-6 py-4 text-right space-y-5">
                <p className="text-lg text-gray-700 font-semibold dark:text-amber-200 transition-all duration-300 ease-in-out hover:text-orange-600">
                  {items.title}
                </p>
                <p className="flex items-center truncate text-gray-600 text-sm dark:text-amber-100">
                  <IoLocationOutline size={26} className="dark:text-white" />
                  {items.address}
                </p>
                <div className="flex justify-start gap-6 text-sm text-gray-700 mt-3">
                  <div className="flex items-center gap-2">
                    <IoMdBed size={25} className="dark:text-amber-50" />
                    <span className="text-base dark:text-amber-100">
                      {items.rooms}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaShower size={25} className="dark:text-amber-50" />
                    <span className="text-base dark:text-amber-100">
                      {items.bathrooms}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MdFamilyRestroom
                      size={25}
                      className="dark:text-amber-50"
                    />
                    <span className="text-base dark:text-amber-100">
                      {items.capacity}
                    </span>
                  </div>
                </div>
                <div className="border border-gray-200 my-2"></div>
                <div className="flex items-center justify-between text-lg text-orange-600 font-semibold mt-4">
                  <span>{items.price} تومان</span>
                  <p className="line-through decoration-orange-600 dark:text-gray-100 text-gray-400 text-base">
                    300000 تومان
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HotDealsOfWeekSwiper;

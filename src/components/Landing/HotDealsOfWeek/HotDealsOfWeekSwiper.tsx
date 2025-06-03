"use client";
import React from "react";
import { FaShower } from "react-icons/fa";
import { IoMdBed } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { MdFamilyRestroom } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { HouseTypeProps } from "@/types/LandingType";
import Image from "next/image";
import { Card } from "@heroui/react";
import { Skeleton } from "@heroui/react";

const HotDealsOfWeekSwiper = ({ houses }: HouseTypeProps) => {
  const extendHouses = [...houses, ...houses];

  if (!houses) {
    return (
      <Card className="w-[200px] space-y-5 p-4" radius="lg">
        <Skeleton className="rounded-lg">
          <div className="h-24 rounded-lg bg-default-300" />
        </Skeleton>
        <div className="space-y-3">
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-300" />
          </Skeleton>
        </div>
      </Card>
    );
  }
  return (
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
      // autoplay={{
      //   delay: 5000,
      //   disableOnInteraction: false,
      // }}
      // loop={true}
      breakpoints={{
        0: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1280: { slidesPerView: 4 },
      }}
    >
      {extendHouses?.map((items, index) => (
        <SwiperSlide key={index} className="flex justify-center p-4 rounded-xl">
          <div className="bg-[#FFFAF3] dark:bg-neutral-900 rounded-xl shadow-lg py-4 px-2 mx-auto cursor-pointer hover:shadow-amber-500/50">
            <Swiper
              modules={[Autoplay, Pagination, EffectFade]}
              effect="fade"
              fadeEffect={{
                crossFade: true,
              }}
              speed={3000}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              loop={true}
              className="flex justify-center items-center"
            >
              {items?.photos?.map((photo: string, idx: number) => (
                <SwiperSlide
                  key={idx}
                  className="!flex !justify-center !items-center"
                >
                  <Image
                    src={photo}
                    unoptimized
                    alt={`${items.title}-photo-${idx}`}
                    width={300}
                    height={176}
                    className="object-cover rounded-xl shadow-lg  transition-all duration-300 ease-in-out transform"
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
                  <MdFamilyRestroom size={25} className="dark:text-amber-50" />
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
  );
};

export default HotDealsOfWeekSwiper;

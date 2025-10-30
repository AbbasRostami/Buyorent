"use client";
import React from "react";
import { FaShower } from "react-icons/fa";
import { IoMdBed } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { MdFamilyRestroom, MdOutlineImageNotSupported } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { Card } from "@heroui/react";
import { Skeleton } from "@heroui/react";
import Link from "next/link";
import { formatCurrency } from "@/utils/formatters";

const HotDealsOfWeekSwiper = ({ houses }: any) => {
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
  console.log("houses", houses);

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
      breakpoints={{
        0: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1280: { slidesPerView: 4 },
      }}
    >
      {houses?.houses?.map((items: any, index: any) => (
        <SwiperSlide
          key={index}
          className="flex justify-center p-6 animate-fade-in"
        >
          <Link href={`/mortgage-and-house-rent/${items.id}`}>
            <div className="group relative w-full max-w-sm transform rounded-2xl border border-gray-100 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
              <div className="relative overflow-hidden rounded-t-2xl min-h-[220px]">
                <Swiper
                  modules={[Autoplay, Pagination, EffectFade]}
                  effect="fade"
                  fadeEffect={{ crossFade: true }}
                  speed={3000}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  pagination={{ clickable: true }}
                  loop={true}
                >
                  {items?.photos?.filter((p: string) => p.trim() !== "").length > 0 ? 
                    items?.photos?.filter((p: string) => p.trim() !== "").map((photo: string, idx: number) => (
                    <SwiperSlide
                      key={idx}
                      className="!flex !justify-center !items-center bg-black/5 dark:bg-black/10"
                    >
                      <Image
                        src={photo}
                        unoptimized
                        alt={`${items.title}-photo-${idx}`}
                        width={400}
                        height={220}
                        loading="lazy"
                        className="h-[220px] w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                      />
                    </SwiperSlide>
                  )) :  (
                    <SwiperSlide className="!flex !h-full !justify-center !items-center bg-black/5 dark:bg-black/10 min-h-[220px]">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <span className="text-lg font-bold text-gray-500 dark:text-gray-400">
                          تصویری یافت نشد
                        </span>
                        <MdOutlineImageNotSupported size={45} />
                      </div>
                    </SwiperSlide>
                  )}
                </Swiper>

                <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/50 to-transparent z-0" />

                <div className="absolute top-3 left-3 z-10 flex items-center gap-2 rounded-full bg-orange-600 px-3 py-1.5 text-white shadow-md backdrop-blur-sm">
                  <span className="text-lg">⭐</span>
                  <span className="text-sm font-bold">
                    {items.rate || "بدون امتیاز"}
                  </span>
                </div>
              </div>

              <div className="space-y-4 px-5 py-4 text-right">
                <h3 className="text-lg font-bold leading-snug text-gray-800 dark:text-white transition-colors duration-300 group-hover:text-orange-600">
                  {items.title}
                </h3>

                <p className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300 truncate">
                  <IoLocationOutline size={20} />
                  {items.address}
                </p>

                <div className="flex justify-between text-sm text-gray-700 dark:text-amber-100 mt-2">
                  <div className="flex items-center gap-1">
                    <IoMdBed size={20} />
                    {items.rooms} خواب
                  </div>
                  <div className="flex items-center gap-1">
                    <FaShower size={18} />
                    {items.bathrooms} حمام
                  </div>
                  <div className="flex items-center gap-1">
                    <MdFamilyRestroom size={20} />
                    {items.capacity} نفر
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-600 my-2" />

                <div className="flex items-center justify-between text-orange-600 font-bold text-base">
                  <span>
                    {formatCurrency(items?.price)} تومان
                  </span>
                  <p className="line-through text-sm text-gray-400 dark:text-gray-500">
                    {formatCurrency(300000)} تومان
                  </p>
                </div>
              </div>

              {/* Border Glow on Hover */}
              <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-orange-400 group-hover:shadow-[0_0_10px_2px_rgba(251,146,60,0.3)] transition-all duration-500" />
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HotDealsOfWeekSwiper;

"use client";
import { HouseReserveProps } from "@/types/HousesReserve";
import { ScrollShadow } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineNightsStay } from "react-icons/md";
import { TfiFaceSad } from "react-icons/tfi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
const ItemsList = ({ data }: { data: HouseReserveProps[] }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center flex flex-col gap-5 items-center text-gray-500 dark:text-amber-50 py-10">
        <TfiFaceSad size={80} />
        <p className="text-lg">موردی برای نمایش وجود ندارد.</p>
        <p className="text-sm mt-2">
          فیلترها را تغییر دهید یا جستجوی جدیدی انجام دهید.
        </p>
      </div>
    );
  }
  return (
    <>
      <ScrollShadow
        size={50}
        offset={10}
        hideScrollBar
        className="h-full overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {data?.map((item) => (
          <Link
            href={`/mortgage-and-house-rent/${item.id}`}
            key={item.id}
            className="border border-[#EAEAEA] rounded-2xl shadow-sm hover:shadow-md transition p-4 flex flex-col min-h-[300px] overflow-hidden"
          >
            <div className="relative w-full h-40">
              <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                effect="fade"
                fadeEffect={{
                  crossFade: true,
                }}
                speed={2000}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
                loop={true}
                className="flex justify-center items-center"
              >
                {item?.photos?.map((photo) => (
                  <SwiperSlide key={photo}>
                    <Image
                      unoptimized
                      width={300}
                      height={300}
                      src={photo}
                      alt={item.title}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <h2 className="text-lg font-semibold truncate mt-2">
              {item.title}
            </h2>

            <div className="flex items-center justify-between gap-2 text-sm text-gray-500 mt-2 flex-wrap">
              <div className="flex items-center gap-1">
                <IoLocationOutline className="dark:text-amber-100" size={18} />
                <span className="truncate dark:text-amber-50">
                  {item.address}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <MdOutlineNightsStay
                  className="dark:text-amber-100"
                  size={18}
                />
                <span className="dark:text-amber-50">
                  {Number(item.rooms).toLocaleString("fa-IR")}
                </span>{" "}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-baseline gap-2 text-sm font-bold flex-wrap">
                <span className="line-through decoration-red-500 text-gray-400">
                  {Number(1200000).toLocaleString("fa-IR")} تومان
                </span>
                <span className="text-black dark:text-amber-100">
                  / {Number(item.price).toLocaleString("fa-IR")}
                  <span className="text-[#595959] text-xs dark:text-amber-50 mr-1">
                    تومان
                  </span>
                </span>
              </div>
              <button className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-md">
                ٪{Number(item.rate).toLocaleString("fa-IR")} تخفیف
              </button>
            </div>
          </Link>
        ))}
      </ScrollShadow>
    </>
  );
};

export default ItemsList;

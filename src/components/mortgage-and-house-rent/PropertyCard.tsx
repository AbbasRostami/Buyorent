"use client";

import Image from "next/image";
import Link from "next/link";
import { FaLongArrowAltDown } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import {
  MdOutlineBedroomParent,
  MdOutlineBathroom,
  MdCarRepair,
} from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination as SwiperPagination } from "swiper/modules";
import "swiper/css";
import SkeletonCard from "../skeleton/SkeletonCard";

interface Property {
  id: string;
  title: string;
  photos: string[];
  address: string;
  rooms: number;
  bathrooms: number;
  parking: number;
  price: number;
}

interface Props {
  data?: Property[];
  isLoading: boolean;
}

export default function PropertyCard({ data, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 md:px-8 border-t border-[#ccc] mt-6 pt-6 max-w-screen-xl mx-auto">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 md:px-8 border-t border-[#ccc] mt-6 pt-6 max-w-screen-xl mx-auto">
      {data?.map((property) => (
        <div
          key={property.id}
          className="group relative bg-white dark:bg-slate-900 rounded-3xl shadow-md hover:shadow-xl dark:hover:shadow-amber-200/10 transition-all duration-500 p-3 sm:p-4 cursor-pointer overflow-hidden border border-gray-100 dark:border-slate-700/40"
        >
          <div className="absolute inset-0 z-20 overflow-hidden">
            <Link
              href={`mortgage-and-house-rent/${property.id}`}
              className="absolute top-0 left-0 w-full h-0 bg-gradient-to-b from-amber-500/90 to-transparent transition-all duration-500 group-hover:h-full flex items-center justify-center"
            >
              <span className="relative text-white font-bold text-2xl opacity-0 translate-y-[-20px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-200">
                <span className="inline-block [text-shadow:_0_2px_8px_rgba(0,0,0,0.3)]">
                  مشاهده جزئیات
                </span>
                <span className="mr-2 inline-block animate-float">
                  <FaLongArrowAltDown />
                </span>
                <div className="absolute -bottom-2 left-1/2 w-0 h-[2px] bg-white/80 group-hover:w-full -translate-x-1/2 transition-all duration-300 delay-300" />
              </span>
            </Link>
          </div>

          <div className="relative overflow-hidden rounded-2xl">
            <Swiper
              modules={[Autoplay, SwiperPagination]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: false }}
              loop
            >
              {property.photos.map((photo, idx) => (
                <SwiperSlide key={idx}>
                  <Image
                    src={photo}
                    unoptimized
                    alt={`${property.title}-photo-${idx}`}
                    width={300}
                    height={176}
                    className="w-full h-auto object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 rounded-2xl" />
          </div>

          <div className="p-2 sm:p-4 space-y-3">
            <h3 className="text-xl font-bold text-gray-800 dark:text-amber-100 transition-colors duration-300 group-hover:text-amber-600 dark:group-hover:text-yellow-300">
              {property.title}
            </h3>

            <p className="text-sm flex items-center gap-1 text-gray-500 dark:text-gray-300 transition-all duration-300 group-hover:translate-x-1">
              <IoLocationOutline
                size={20}
                className="text-gray-400 dark:text-white"
              />
              {property.address}
            </p>

            <div className="flex flex-wrap gap-2 border-t border-gray-200 dark:border-slate-700 pt-3">
              <div className="flex items-center gap-1 py-1 px-3 rounded-full text-sm font-medium bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-amber-50 hover:scale-105">
                <MdOutlineBedroomParent size={18} /> {property.rooms} خواب
              </div>
              <div className="flex items-center gap-1 py-1 px-3 rounded-full text-sm font-medium bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-amber-50 hover:scale-105">
                <MdOutlineBathroom size={18} /> {property.bathrooms} حمام
              </div>
              <div className="flex items-center gap-1 py-1 px-3 rounded-full text-sm font-medium bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-amber-50 hover:scale-105">
                <MdCarRepair size={18} /> پارکینگ {property.parking}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-7">
              <span className="text-sm sm:text-base font-semibold text-gray-400 line-through decoration-red-400">
                12.000.000
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                تومان /
              </span>
              <span className="text-base sm:text-xl font-bold text-gray-900 dark:text-[#e2eaa0]">
                {property.price}
                <span className="text-xs"> تومان</span>
              </span>
              <div className="ml-auto bg-gradient-to-r from-red-500 to-red-600 text-xs sm:text-sm font-bold px-3 py-1 text-white rounded-full shadow-sm animate-pulse group-hover:animate-none">
                ۹٪
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

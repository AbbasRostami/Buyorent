"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import { IoLocationOutline } from "react-icons/io5";
import {
  MdOutlineBedroomParent,
  MdOutlineBathroom,
  MdCarRepair,
  MdAddHomeWork,
} from "react-icons/md";
import { HouseReserveProps } from "@/types/HousesReserve";
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import Link from "next/link";
interface PropertyDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: HouseReserveProps | null;
  reason?: string;
}

export default function PropertyDetailsModal({
  isOpen,
  onClose,
  property,
  reason,
}: PropertyDetailsModalProps) {
  if (!isOpen || !property) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30  z-50"
        aria-hidden="true"
        onClick={onClose}
      />
      <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
        <div
          className="bg-white dark:bg-black rounded-lg p-6 w-full max-w-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <MdAddHomeWork className="text-amber-500" size={20} />
              <span className="text-gray-600 dark:text-gray-400">
                {property.title}
              </span>
            </h2>
            <Button variant="flat" color="danger" onPress={onClose}>
              بستن
            </Button>
          </div>

          {reason && (
            <div className="bg-amber-50 dark:bg-amber-600 p-4 rounded-lg mb-4 text-amber-800 dark:text-amber-50">
              {reason}
            </div>
          )}

          <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
            <Swiper
              modules={[Autoplay, EffectFade]}
              effect="fade"
              spaceBetween={50}
              slidesPerView={1}
              fadeEffect={{ crossFade: true }}
              className="h-full"
              loop={true}
              autoplay={true}
              speed={1000}
              pagination={{
                clickable: true,
              }}
            >
              {property.photos.map((photo) => (
                <SwiperSlide key={photo}>
                  <Image
                    unoptimized
                    src={photo}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="space-y-4">
            <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <IoLocationOutline className="text-amber-500" size={20} />
              {property.address}
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full">
                <MdOutlineBedroomParent size={20} />
                <span>{property.rooms} خواب</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full">
                <MdOutlineBathroom size={20} />
                <span>{property.bathrooms} حمام</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full">
                <MdCarRepair size={20} />
                <span>{property.parking} پارکینگ</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-2xl font-bold text-amber-600">
                {property.price} تومان
              </div>
              <Link
                href={`/mortgage-and-house-rent/${property.id}`}
                className="bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 rounded-xl text-white hover:from-amber-600 hover:to-amber-700"
              >
                مشاهده جزئیات بیشتر
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

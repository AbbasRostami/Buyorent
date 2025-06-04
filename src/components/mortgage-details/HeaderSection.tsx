"use client";
import React, { useState } from "react";
import Image from "next/image";
import { BsPinAngle } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { IoGitCompareSharp, IoLocationOutline } from "react-icons/io5";
import { LiaShareAltSolid } from "react-icons/lia";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { Tooltip } from "@heroui/react";
import { MotionDiv } from "../../utils/providers/MotionWrapper";

const HeaderSectionSingle = ({ data }: any) => {
  const [mainImage, setMainImage] = useState(data?.photos[0]);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const router = useRouter();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;

    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 px-4 pt-24 pb-10 overflow-hidden max-w-screen-xl mx-auto">
        <div className="relative w-2/3 rounded-3xl overflow-hidden shadow">
          <div
            className="relative w-full aspect-4/2"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            <Image
              src={mainImage}
              alt="Main Image"
              fill
              className={`object-cover rounded-3xl transition-transform cursor-pointer duration-200 ${
                isZoomed ? "scale-150" : "scale-100"
              }`}
              style={{
                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
              }}
              unoptimized
            />
          </div>
        </div>

        <div className="w-full md:w-1/3 flex flex-col gap-4">
          <div className="grid grid-cols-2  gap-4">
            {data?.photos.map((item: string, index: number) => (
              <div
                key={index}
                className="relative w-full aspect-[320/230] rounded-3xl overflow-hidden shadow cursor-pointer"
                onClick={() => setMainImage(item)}
              >
                <Image
                  src={item}
                  alt="building"
                  fill
                  className="object-cover transform-3d "
                  unoptimized
                />
              </div>
            ))}
          </div>

          {data?.photos.length > 4 && (
            <div className="w-full">
              <Swiper
                modules={[Navigation, Pagination]}
                navigation={{
                  nextEl: ".custom-nextt",
                  prevEl: ".custom-prevt",
                }}
                pagination={{
                  el: ".customer-pagination",
                  clickable: true,
                }}
                spaceBetween={16}
                slidesPerView={2}
                className="h-full"
              >
                {data?.photos?.map((item: string, index: number) => (
                  <SwiperSlide key={index}>
                    <div
                      className="relative w-full aspect-[320/230] rounded-3xl overflow-hidden shadow cursor-pointer"
                      onClick={() => setMainImage(item)}
                    >
                      <Image
                        src={item}
                        alt="building"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <button className="custom-prevt cursor-pointer hidden sm:block absolute -left-10 bottom-38 z-10 bg-white dark:bg-neutral-800 p-2 rounded-full shadow-md">
                <IoIosArrowRoundBack
                  className="dark:text-amber-100"
                  size={25}
                />
              </button>

              <button className="custom-nextt cursor-pointer hidden sm:block absolute -right-5 bottom-38 z-10 bg-white dark:bg-neutral-800 p-2 rounded-full shadow-md">
                <IoIosArrowRoundForward
                  className="dark:text-amber-100"
                  size={25}
                />
              </button>
              <div className="customer-pagination mt-6 flex justify-center gap-2" />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row-reverse md:justify-between gap-10 justify-center md:px-20 w-full items-center">
        <div className="flex items-center gap-3">
          <Tooltip content=" مقایسه ملک " placement="top-start" color="warning">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.6 }}
              className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center cursor-pointer"
              onClick={() => router.push(`/compare?id=${data?.id}`)}
            >
              <IoGitCompareSharp size={26} className="text-amber-50" />
            </MotionDiv>
          </Tooltip>
          <Tooltip content=" ثبت ملک " placement="top-start" color="warning">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.8 }}
              className="w-10 h-10 rounded-full border hover:border-color1 flex items-center justify-center cursor-pointer"
            >
              <BsPinAngle size={26} />
            </MotionDiv>
          </Tooltip>
          <Tooltip
            content="افزدون موردعلاقه"
            placement="top-start"
            color="warning"
          >
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.0 }}
              className="w-10 h-10 rounded-full border hover:border-color1 flex items-center justify-center cursor-pointer"
            >
              <CiHeart size={26} />
            </MotionDiv>
          </Tooltip>
          <Tooltip
            content=" به اشتراک گذاری "
            placement="top-start"
            color="warning"
          >
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.2 }}
              className="w-10 h-10 rounded-full bg-color1 flex items-center justify-center cursor-pointer"
            >
              <LiaShareAltSolid className="text-amber-50" size={26} />
            </MotionDiv>
          </Tooltip>
        </div>

        <div className="text-center px-2">
          <p className="text-3xl font-bold">{data.title}</p>
          <p className="md:text-lg text-medium font-medium flex items-center gap-2 mt-2">
            <IoLocationOutline className="dark:text-amber-600" size={30} />
            {data.address}
          </p>
        </div>
      </div>
    </>
  );
};

export default HeaderSectionSingle;

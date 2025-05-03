"use client";

import { useRef, useEffect, useState } from "react";
import {
  IoIosArrowBack,
  IoIosArrowRoundBack,
  IoIosArrowRoundForward,
  IoMdBed,
} from "react-icons/io";
import { FaCircle } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Timer from "@/utils/hooks/timer";
import { IoLocationOutline } from "react-icons/io5";
import Image from "next/image";
import bed from "./../../assets/Landing/bed.png";
import shower from "./../../assets/Landing/shower.png";
import toilet from "./../../assets/Landing/toilet.png";
import { FaShower } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";

const cards = [
  {
    title: " ویلای دوبلکس ساحلی  ",
    img: "https://4kwallpapers.com/images/walls/thumbs_3t/22104.jpg",
    locate: "مازندران ، بابلسر",
    cost: "۱,۷۵۰,۰۰۰",
    discount: "۲.۲۵۰.۰۰۰",
  },
  {
    title: " ویلای دوبلکس ساحلی  ",
    img: "https://4kwallpapers.com/images/walls/thumbs_3t/22104.jpg",
    locate: "مازندران ، بابلسر",
    cost: "۱,۷۵۰,۰۰۰",
    discount: "۲.۲۵۰.۰۰۰",
  },
  {
    title: " ویلای دوبلکس ساحلی  ",
    img: "https://4kwallpapers.com/images/walls/thumbs_3t/22104.jpg",
    locate: "مازندران ، بابلسر",
    cost: "۱,۷۵۰,۰۰۰",
    discount: "۲.۲۵۰.۰۰۰",
  },
  {
    title: " ویلای دوبلکس ساحلی  ",
    img: "https://4kwallpapers.com/images/walls/thumbs_3t/22104.jpg",
    locate: "مازندران ، بابلسر",
    cost: "۱,۷۵۰,۰۰۰",
    discount: "۲.۲۵۰.۰۰۰",
  },
  {
    title: " ویلای دوبلکس ساحلی  ",
    img: "https://4kwallpapers.com/images/walls/thumbs_3t/22104.jpg",
    locate: "مازندران ، بابلسر",
    cost: "۱,۷۵۰,۰۰۰",
    discount: "۲.۲۵۰.۰۰۰",
  },
];

export default function Reduction() {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const [textWidth, setTextWidth] = useState<string>();

  useEffect(() => {
    if (!containerRef.current || !buttonsRef.current) return;

    const calculateWidth = () => {
      const total = containerRef.current?.offsetWidth || 0;
      const btns = buttonsRef.current?.offsetWidth || 0;
      const newWidth = total - btns - 16;

      setTextWidth((prev) =>
        prev !== `${newWidth}px` ? `${newWidth}px` : prev
      );
    };

    calculateWidth();

    const resizeObserver = new ResizeObserver(calculateWidth);
    resizeObserver.observe(containerRef.current);
    resizeObserver.observe(buttonsRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className=" relative rounded-2xl border-2 border-gray-200 mt-20"
    >
      <div
        className="hidden lg:flex items-center justify-between  rounded-xl px-4"
        style={{ width: textWidth }}
      >
        <div className="flex items-center gap-4 p-4">
          <div className="text-orange-700 md:text-2xl xl:text-3xl flex items-center gap-4">
            <FaCircle size={17} className="text-gray-200 text-[10px]" />
            جشنواره تخفیف بهاره
          </div>
          <p className=" bg-Winston text-white px-4 py-1 rounded-full  text-base">
            بجنب تا تموم نشده !
          </p>
        </div>
        <div className="text-Winston xl:text-3xl whitespace-nowrap font-bold">
          <Timer />
        </div>
      </div>

      <div
        ref={buttonsRef}
        className="hidden lg:block inverted absolute top-0 left-0 p-2 rounded-br-xl bg-white dark:bg-[#0a192f] border-b-2 border-r-2 border-gray-200"
      >
        <div className="absolute top-0 left-0 w-full h-3 -mt-2 bg-[#FDFDFD] dark:bg-[#0a192f]  z-30 rounded-br-xl" />
        <div className="absolute left-0 w-4 h-full -ml-2 bg-[#FDFDFD] dark:bg-[#0a192f] z-30 rounded-br-xl" />
        <div className="flex items-center gap-4">
          <button className="custom-prev-off dark:bg-gray-900 w-10 h-10 flex items-center justify-center rounded-full border border-gray-100 shadow-md hover:bg-gray-300 hover:text-white transition">
            <IoIosArrowRoundForward className="dark:text-white " />
          </button>
          <button className="custom-next-off dark:bg-gray-900 z-10 w-10 h-10 flex items-center justify-center rounded-full border border-gray-100 shadow-md hover:bg-gray-300 hover:text-white transition">
            <IoIosArrowRoundBack className="dark:text-white" />
          </button>
          <button className="flex items-center shadow justify-center dark:bg-gray-900 px-4 py-2 text-lg font-semibold text-gray-400 hover:text-white border border-gray-100 rounded-lg bg-white hover:bg-gray-300 transition">
            مشاهده همه
            <IoIosArrowBack className="text-lg mr-1" />
          </button>
        </div>
      </div>
      <div className="flex lg:hidden flex-col sm:flex-row items-center justify-between p-2">
        <div className="text-orange-700 text-3xl flex items-center gap-4">
          <FaCircle className="text-gray-200 text-[10px]" />
          جشنواره تخفیف بهاره
          <button className="flex items-center text-base justify-center  text- font-semibold text-gray-400 ">
            مشاهده همه
            <IoIosArrowBack className="text-sm mr-1" />
          </button>
        </div>
        <div className="flex  items-center gap-2 mt-4 sm:mt-0">
          <p className=" bg-Winston text-white px-4 py-1 rounded-full  text-base">
            بجنب تا تموم نشده !
          </p>
          <p className="text-Winston xl:text-3xl  whitespace-nowrap font-bold  text-center">
            ۰۶ : ۰۹ : ۲۶ : ۳۵
          </p>
        </div>
      </div>

      <div className="m-6">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation={{
            nextEl: ".custom-next-off",
            prevEl: ".custom-prev-off",
          }}
          pagination={{
            el: ".customer",
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
          {cards.map((items, index) => (
            <SwiperSlide key={index} className="flex justify-center p-4 ">
              <div className="bg-[#FFFAF3] dark:bg-slate-900 rounded-xl shadow-xl py-4 mx-auto cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/50">
                <div className="relative perspective p-2">
                  <img
                    src={items.img}
                    alt={items.title}
                    className="w-full h-44 object-cover rounded-xl scale-x-115 bg-white shadow-xl p-1 border-2 border-gray-100 transition-all duration-300 ease-in-out hover:rotate-2 hover:scale-105 transform"
                    style={{ transform: "perspective(800px) rotateY(24deg)" }}
                  />
                </div>
                <div className="px-6 py-4 text-right space-y-5">
                  <p className="text-lg text-gray-700 font-semibold dark:text-amber-200 transition-all duration-300 ease-in-out hover:text-orange-600">
                    {items.title}
                  </p>
                  <p className="flex items-center text-gray-600 text-sm dark:text-amber-100">
                    <IoLocationOutline
                      size={26}
                      className="  dark:text-white"
                    />
                    {items.locate}
                  </p>
                  <div className="flex justify-start gap-6 text-sm text-gray-700 mt-3">
                    <div className="flex items-center gap-2">
                      <IoMdBed size={25} className="dark:text-amber-50" />
                      <span className="text-base dark:text-amber-100">۳</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaShower size={25} className="dark:text-amber-50" />
                      <span className="text-base dark:text-amber-100">۲</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MdFamilyRestroom
                        size={25}
                        className="dark:text-amber-50"
                      />
                      <span className="text-base dark:text-amber-100">۶</span>
                    </div>
                  </div>
                  <div className="border border-gray-200 my-2"></div>
                  <div className="flex items-center justify-between text-lg text-orange-600 font-semibold mt-4">
                    <span>{items.cost} تومان</span>
                    <p className="line-through decoration-orange-600 dark:text-gray-100 text-gray-400 text-base">
                      {items.discount} تومان
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 border-t-2  border-gray-200 rounded-t-md inverted_bottom drop-shadow-2xl">
        <div className="customer flex justify-center  p-1  " />
      </div>
    </div>
  );
}

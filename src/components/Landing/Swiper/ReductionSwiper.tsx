"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { IoLocationOutline } from "react-icons/io5";
import { IoMdBed } from "react-icons/io";
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
export default function ReductionCarousel() {
  return (
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
                  <IoLocationOutline size={26} className="  dark:text-white" />
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
  );
}

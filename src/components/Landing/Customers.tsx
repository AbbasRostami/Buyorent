"use client";
import React from "react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import Image from "next/image";
import AsProfile2 from "./../../assets/AS-67207980 1 (1).svg";
import { GoDotFill } from "react-icons/go";

import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
const Customers = () => {
  return (
    <div className="mt-32 mb-20 px-8">
      <div className="flex flex-col sm:flex-row items-center mb-10">
        <GoDotFill className="text-[#D9D9D9] hidden sm:block" size={30} />
        <p className="text-[#D27700] text-3xl font-black text-nowrap">
          بایورنت از نگاه مشتریان
        </p>
        <h4 className="text-[#9A815F] text-[16px] font-medium text-nowrap pt-2 pr-2">
          بدی های ما رو به ما بگید خوبی های ما رو به دیگران !
        </h4>
      </div>

      <div className="relative">
        <Swiper
          cssMode={true}
          navigation={{
            nextEl: ".custom-nextt",
            prevEl: ".custom-prevt",
          }}
          pagination={{
            el: ".custom-pagination",
            clickable: true,
          }}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className="mySwiper h-full"
          spaceBetween={10}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 1,
            },
            1024: {
              slidesPerView: 2,
            },
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <SwiperSlide key={item}>
              <div className="min-h-[240px] group flex flex-col sm:flex-row items-center gap-6 sm:gap-10 w-full cursor-pointer">
                <div className="group relative w-[160px] h-[160px] sm:w-4/12 sm:h-48 [perspective:1000px] shrink-0">
                  <div className="w-full h-full py-2 bg-[#F4F4F4] hidden sm:block rounded-2xl shadow-lg [transform:rotateY(-60deg)] [transform-style:preserve-3d] group-hover:bg-[#FFC800] transition-colors duration-300 z-0" />
                  <Image
                    src={AsProfile2}
                    alt=""
                    width={158}
                    height={158}
                    priority
                    className="absolute inset-0 right-5 sm:right-20 top-5 object-cover rounded-2xl z-10"
                  />
                </div>

                <div className="w-full sm:w-8/12 px-2 sm:px-5 grid gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 items-center pt-3 gap-2">
                    <p className="text-xl sm:text-2xl  font-black group-hover:text-[#FFC800] transition-colors">
                      مریم طبتی
                    </p>
                    <div className="flex justify-start sm:justify-end space-x-1 text-xl sm:text-2xl transition-colors">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          aria-label={`${star} stars`}
                          className="text-gray-400 group-hover:text-[#FFC800] hover:text-yellow-400 transition-colors"
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-1 ">
                    <p className="text-[#777777] dark:text-blue-200 text-base sm:text-xl font-normal ">
                      تاجر
                    </p>
                    <p className="text-[#777777] dark:text-blue-200 text-sm sm:text-lg font-normal text-end">
                      1403/12/06
                    </p>
                  </div>

                  <div className="pt-2 text-justify">
                    <p className="text-[#777777] dark:text-blue-100 text-sm sm:text-md font-normal leading-relaxed">
                      ترانسفر اوکی پذیرش اوکی سوییت چهار تخته سه شب اجاره کردیم
                      سوییت تمیز و قابل قبول بود چایی ساز داشت محوطه هتل هم
                      بسیار خوب و زیبا بود.
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="custom-prevt cursor-pointer hidden sm:block absolute -left-10 bottom-38 z-10 bg-white dark:bg-neutral-800 p-2 rounded-full shadow-md">
          <IoIosArrowRoundBack className="dark:text-amber-100" size={25} />
        </button>

        <button className="custom-nextt cursor-pointer hidden sm:block absolute -right-5 bottom-38 z-10 bg-white dark:bg-neutral-800 p-2 rounded-full shadow-md">
          <IoIosArrowRoundForward className="dark:text-amber-100" size={25} />
        </button>
        <div className="custom-pagination mt-10 flex justify-center gap-2" />
      </div>
    </div>
  );
};

export default Customers;

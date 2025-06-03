"use client";
import React from "react";
import Image from "next/image";
import AsProfile1 from "./../../../assets/AS-67207980 1 (1).svg";
import AsProfile2 from "./../../../assets/Avatar1.png";
import AsProfile3 from "./../../../assets/Avatar2.png";
import AsProfile4 from "./../../../assets/Avatar3.png";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";

const customersData = [
  {
    id: 1,
    name: "مریم طبتی",
    job: "تاجر",
    date: "1403/12/06",
    comment:
      "ترانسفر عالی بود، سوییت کاملاً تمیز و مرتب بود. از فضای هتل بسیار راضی بودم.",
    image: AsProfile1,
    rate: 5,
  },
  {
    id: 2,
    name: "سارا محمدی",
    job: "دانشجو",
    date: "1403/10/21",
    comment:
      "موقعیت مکانی بسیار خوب بود. به راحتی به همه جا دسترسی داشتم و محیط آرامش‌بخشی داشت.",
    image: AsProfile2,
    rate: 4,
  },
  {
    id: 3,
    name: "علی رضایی",
    job: "برنامه‌نویس",
    date: "1403/09/15",
    comment:
      "اتاق‌ها مجهز و تمیز بودن، فقط سرعت اینترنت کمی پایین بود. در کل اقامت خوبی داشتم.",
    image: AsProfile3,
    rate: 4,
  },
  {
    id: 4,
    name: "ندا شریفی",
    job: "مدیر فروش",
    date: "1403/08/30",
    comment:
      "از رفتار پرسنل خیلی راضی بودم. فضای لابی و محوطه بسیار دلنشین بود.",
    image: AsProfile1,
    rate: 5,
  },
  {
    id: 5,
    name: "حسین عباسی",
    job: "مهندس عمران",
    date: "1403/07/18",
    comment:
      "سوییت امکانات مناسبی داشت. به نظرم ارزش اقامت نسبت به قیمت بالا بود.",
    image: AsProfile4,
    rate: 3,
  },
  {
    id: 6,
    name: "مهسا راد",
    job: "طراح گرافیک",
    date: "1403/06/25",
    comment:
      "دکوراسیون داخلی زیبا و چشم‌نواز بود. تنها نکته منفی سرو صدای زیاد اطراف بود.",
    image: AsProfile2,
    rate: 4,
  },
  {
    id: 7,
    name: "عادل کرمی",
    job: "مترجم",
    date: "1403/06/10",
    comment: "از امکانات اتاق راضی بودم، ولی تنوع صبحانه می‌توانست بیشتر باشد.",
    image: AsProfile3,
    rate: 3,
  },
  {
    id: 8,
    name: "نگین حاجی‌پور",
    job: "مشاور املاک",
    date: "1403/05/05",
    comment:
      "همه چیز طبق انتظار بود، نظافت خوب و سرویس‌دهی مناسب. پیشنهاد می‌کنم.",
    image: AsProfile2,
    rate: 5,
  },
  {
    id: 9,
    name: "بابک کریمی",
    job: "وکیل",
    date: "1403/04/20",
    comment:
      "برای سفر کاری رزرو کرده بودم. محیطی آرام و مناسب برای استراحت داشتم.",
    image: AsProfile4,
    rate: 4,
  },
];
const CustomersSwiper = () => {
  return (
    <>
      <Swiper
        cssMode={true}
        navigation={{
          nextEl: ".custom-nextt",
          prevEl: ".custom-prevt",
        }}
        pagination={{
          el: ".customer-pagination",
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
        {customersData.map((customer) => (
          <SwiperSlide key={customer.id}>
            <div className="min-h-[240px] group flex flex-col sm:flex-row items-center gap-6 sm:gap-10 w-full cursor-pointer">
              <div className="group relative w-[160px] h-[160px] sm:w-4/12 sm:h-48 [perspective:1000px] shrink-0">
                <div className="w-full h-full py-2 bg-[#F4F4F4] dark:bg-neutral-800 hidden sm:block rounded-2xl shadow-lg [transform:rotateY(-60deg)] [transform-style:preserve-3d] group-hover:bg-[#FFC800] transition-colors duration-300 z-0" />
                <Image
                  src={customer.image}
                  alt={customer.name}
                  width={158}
                  height={158}
                  priority
                  className="absolute inset-0 right-5 sm:right-20 top-5 object-cover rounded-2xl z-10"
                />
              </div>

              <div className="w-full sm:w-8/12 px-2 sm:px-5 grid gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 items-center pt-3 gap-2">
                  <p className="text-xl sm:text-2xl font-black group-hover:text-[#FFC800] transition-colors">
                    {customer.name}
                  </p>
                  <div className="flex justify-start sm:justify-end space-x-1 text-xl sm:text-2xl transition-colors">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`${
                          i < customer.rate
                            ? "text-[#FFC800]"
                            : "text-gray-400 dark:text-gray-600"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-1 ">
                  <p className="text-[#777777] dark:text-blue-200 text-base sm:text-xl font-normal ">
                    {customer.job}
                  </p>
                  <p className="text-[#777777] dark:text-blue-200 text-sm sm:text-lg font-normal text-end">
                    {customer.date}
                  </p>
                </div>

                <div className="pt-2 text-justify">
                  <p className="text-[#777777] dark:text-blue-100 text-sm sm:text-md font-normal leading-relaxed">
                    {customer.comment}
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
      <div className="customer-pagination mt-10 flex justify-center gap-2" />
    </>
  );
};

export default CustomersSwiper;

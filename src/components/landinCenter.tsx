"use client";
import React from "react";
import Image from "next/image";
import { LandingCard } from "./LandingCard";
import Ellipse from "../assets/Ellipse 16.svg";
import Rectangle from "../assets/Rectangle 27.svg";
import Rectangle6 from "../assets/Rectangle 6.svg";
import Vector1 from "../assets/Vector (1).svg";
import Vector from "../assets/Vector.png";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

const LandinCenter = () => {
  return (
    <>
      <div className="bg-white text-right border-[5px] mt-2 sm:w-[1320px] w-[340px] sm:h-[498px] h-[100px] mx-auto shadow-xs  rounded-r-4xl ">
        <div className="flex justify-end gap-4 border[1px] mt-6 ">
          <button className="border-[1px] rounded-2xl h-[45px] w-[165px] text-[20px] text-[#9E9E9E] pt-2 ">
            مشاهده همه

          </button>

          <button className="border-[1px] rounded-full mr-2 custom-prev">
            <Image
              className="h-[35px] w-[45px]  "
              src={Vector}
              alt=""
              width={8}
              height={8}
              priority
            />
          </button>
          <button className="border-[1px] rounded-full mr-44 custom-next">
            <Image
              className="h-[35px] w-[45px] "
              src={Vector1}
              alt=""
              width={8}
              height={8}
              priority
            />
          </button>

          <p className="text-[#DC0000] sm:text-[30px] text-[18px]  pr-[11rem] sm:text-wrap  ">
            {" "}
            ۰۶ : ۰۹ : ۲۶ : ۳۵
          </p>
          <p className="bg-[#DC0000] sm:text-[30px] text-[18px] sm:text-wrap text-nowrap h-fit">
            {" "}
            بجنب تا تموم نشده !
          </p>
          <p className="text-[#D27700] sm:text-[30px] text-[18px] sm:text-wrap text-nowrap pr-12 flex">
            {" "}
            جشنواره تخفیف بهاره
            <Image
              className="ml-1.5 mt-1.5"
              src={Ellipse}
              alt=""
              width={12}
              height={12}
              priority
            />
          </p>
        </div>
        <div className="flex justify-around gap-6 ">
          <Swiper
            cssMode={true}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            pagination={true}
            mousewheel={true}
            keyboard={true}
            slidesPerView={4}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
            }}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="mySwiper"
          >
            <SwiperSlide>
              <LandingCard />
            </SwiperSlide>
            <SwiperSlide>
              <LandingCard />
            </SwiperSlide>
            <SwiperSlide>
              <LandingCard />
            </SwiperSlide>
            <SwiperSlide>
              <LandingCard />
            </SwiperSlide>
            <SwiperSlide>
              <LandingCard />
            </SwiperSlide>
            <SwiperSlide>
              <LandingCard />
            </SwiperSlide>
            <SwiperSlide>
              <LandingCard />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <div className="border-[3px] border-[#A85F00] sm:h-[10rem] h-[19rem] sm:w-[83%] w-[90%] mx-auto sm:mt-28 mt-1 sm:flex block items-center gap-2 rounded-r-full ">
        <h3 className=" text-[#333] sm:text-[24px] text-[17px] bg-[#FFEFD9] sm:w-[70%] w-[80%] h-[7rem]  text-center rounded-l-full sm:ml-0 ml-24 sm:mt-4 mt-96 pt-9 -translate-x-24" >
          {" "}
          اگه تو هم خونه یا ملکی داری که میخوای بفروشی یا اجاره بدی الان وقتشه 
        </h3>
        <h3 className=" text-[#FFFFFF]  text-[20px] bg-[#E89300] sm:w-[245px] w-[200px] h-[50px] text-center  rounded-2xl sm:mt-4 mt-14 pt-3 sm:ml-0 ml-6  ">
          میخوام آگهی بذارم!
        </h3>
      </div>

      <h2 className="flex justify-end sm:mr-36 mr-14 sm:mt-20 mt-6 text-right text-[#D27700] sm:text-[30px] text-[34px]">
        {" "}
        اجاره ویلا در محبوب‌ترین مقصد‌های این ماه
        <Image
          className="ml-1.5 "
          src={Ellipse}
          alt=""
          width={12}
          height={12}
          priority
        />
      </h2>
      

      <div className="flex border-2 border-[#ddd] w-[90%] mx-auto h-[230px]">
        <div className="flex  gap-6  w-[50%] h-[165px] mt-10 justify-around ml-5">
            <Image
               className=" border-2 rounded-2xl border-[#ddd] w-full "
              src={Rectangle}
              alt=""
              width={300}
              height={300}
              priority
            />
     

            <Image
             className=" border-2 rounded-2xl border-[#ddd] w-full "
              src={Rectangle}
              alt=""
              width={300}
              height={300}
              priority
            />
          
            <Image
              className=" border-2 rounded-2xl border-[#ddd]  "
              src={Rectangle}
              alt=""
              width={300}
              height={300}
              priority
            />
            
          
        </div>
        <p className="text-[#543000] text-right text-[26px] w-[50%] pt-[90px] text-base mr-10">
          {" "}
          اینجا می تونید محبوب ترین مقصد هایی که توی ماه اخیر 
          <br />
          از نگاه کاربر ها
          پر بازدید تر از بقیه بودن رو ببینید!{" "}
        </p>
      </div>
      <button className="border-[1px] rounded-full mr-2 custom-prev ml-20">
            <Image
              className="h-[35px] w-[45px]  "
              src={Vector}
              alt=""
              width={8}
              height={8}
              priority
            />
          </button>
          <button className="border-[1px] rounded-full mr-10 custom-next">
            <Image
              className="h-[35px] w-[45px] "
              src={Vector1}
              alt=""
              width={8}
              height={8}
              priority
            />
          </button>
      <button className="border-[1px] rounded-2xl h-[45px] w-[165px] text-[20px] text-[#9E9E9E] pt-2 mt-10 ">
            مشاهده همه

          </button>

      <div className="flex justify-end mt-20 mr-20 gap-4 text-[29px] ">
        <p className="text-[#9A815F]  ">
          {" "}
          آنچه که از بازار معاملات ملک در این هفته داشتیم{" "}
        </p>
        <p className="text-[#D27700]  "> داغ ترین معاملات هفته </p>
      </div>

      
          <div className="flex justify-around gap-6 ">
          <Swiper
            cssMode={true}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            pagination={true}
            mousewheel={true}
            keyboard={true}
            slidesPerView={4}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="mySwiper"
          >
            <SwiperSlide>
              <LandingCard />
            </SwiperSlide>
            <SwiperSlide>
              <LandingCard />
            </SwiperSlide>
            <SwiperSlide>
              <LandingCard />
            </SwiperSlide>
            <SwiperSlide>
              <LandingCard />
            </SwiperSlide>
            <SwiperSlide>
              <LandingCard />
            </SwiperSlide>
            <SwiperSlide>
              <LandingCard />
            </SwiperSlide>
            <SwiperSlide>
              <LandingCard />
            </SwiperSlide>
          </Swiper>
        </div>
        <button className="border-[1px] rounded-2xl h-[45px] w-[165px] text-[20px] text-[#9E9E9E] pt-2 mt-14 ml-40 ">
            مشاهده همه

          </button>

          <button className="border-[1px] rounded-full ml-2 mr-2 custom-prev">
            <Image
              className="h-[35px] w-[45px]  "
              src={Vector}
              alt=""
              width={8}
              height={8}
              priority
            />
          </button>
          <button className="border-[1px] rounded-full mr-16 custom-next">
            <Image
              className="h-[35px] w-[45px] "
              src={Vector1}
              alt=""
              width={8}
              height={8}
              priority
            />
          </button>

      
    </>
  );
};

export { LandinCenter };

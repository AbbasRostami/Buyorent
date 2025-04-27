"use client";
import React from "react";
import Image from "next/image";
import { LandingCard } from "./LandingCard";
import Ellipse from "../assets/Ellipse 16.svg";

import Rectangle from "../assets/Rectangle 27.svg";
import Vector1 from "../assets/Vector (1).svg";
import Vector from "../assets/Vector.png";
import Vector2 from "../assets/Vector (2).svg";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

const LandinCenter = () => {
  return (
    <>
      <div className="bg-white text-right border-[5px] mt-2 w-[1320px] h-[498px] mx-auto shadow-xs  rounded-r-4xl roun">
        <div className="flex justify-end gap-4 border[1px] mt-6 ">
          <button className="border-[1px] rounded-2xl h-[45px] w-[165px] text-[20px] text-[#9E9E9E] pt-2 ">
            مشاهده همه
            {/* <Image
           className="h-[25px] w-[25px]  "         
           src={Vector2}
           alt=""
           width={18}
           height={18}
           priority
   /> */}
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

          <p className="text-[#DC0000] text-[30px] pr-[11rem]">
            {" "}
            ۰۶ : ۰۹ : ۲۶ : ۳۵
          </p>
          <p className="bg-[#DC0000] text-[بجنب تا تموم نشده !] text-[30px]">
            {" "}
            بجنب تا تموم نشده !
          </p>
          <p className="text-[#D27700] text-[30px] pr-12 flex">
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
        <div className="flex justify-around gap-6">
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
      </div>

      <div className="border-[3px] border-[#A85F00] h-[10rem] w-[83%] mx-auto mt-28 flex items-center gap-2 rounded-r-full ">
        <h3 className=" text-[#333] text-[24px] bg-[#FFEFD9] w-[70%] h-[7rem]  text-center rounded-l-full mt-4 pt-9 -translate-x-24">
          {" "}
          ! اگه تو هم خونه یا ملکی داری که میخوای بفروشی یا اجاره بدی الان وقتشه
        </h3>
        <h3 className=" text-[#FFFFFF] text-[20px] bg-[#E89300] w-[245px] h-[50px] text-center  rounded-2xl mt-4 pt-3  ">
          میخوام آگهی بذارم!
        </h3>
      </div>

      <h2 className="flex justify-end mr-36 mt-20 text-right text-[#D27700] text-[30px]">
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
        <div className="flex  gap-6  w-[50%] h-[165px] mt-10 justify-around ml-16">
          <div className=" border-2 rounded-2xl border-[#ddd] w-1/3 ">
            <Image
              className="  "
              src={Rectangle}
              alt=""
              width={300}
              height={300}
              priority
            />
          </div>

          <div className=" border-2 rounded-2xl border-[#ddd] w-1/3 ">
            <Image
              className="  "
              src={Rectangle}
              alt=""
              width={300}
              height={300}
              priority
            />
          </div>
          <div className=" border-2 rounded-2xl border-[#ddd] w-1/3 ">
            <Image
              className="  "
              src={Rectangle}
              alt=""
              width={300}
              height={300}
              priority
            />
          </div>
        </div>
        <p className="text-[#543000] text-right text-[26px] w-[50%] pt-[90px] text-base mr-10">
          {" "}
          اینجا می تونید محبوب ترین مقصد هایی که توی ماه اخیر از نگاه کاربر ها
          پر بازدید تر از بقیه بودن رو ببینید!{" "}
        </p>
      </div>

      <div className="flex justify-end mt-20 mr-20 gap-4 text-[29px] ">
        <p className="text-[#9A815F]  ">
          {" "}
          آنچه که از بازار معاملات ملک در این هفته داشتیم{" "}
        </p>
        <p className="text-[#D27700] "> داغ ترین معاملات هفته </p>
      </div>

      <div className="flex justify-around gap-6">
        <LandingCard />
        <LandingCard />
        <LandingCard />
        <LandingCard />
      </div>
    </>
  );
};

export { LandinCenter };

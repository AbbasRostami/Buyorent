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
import {
  MdKeyboardArrowLeft,
  MdOutlineArrowCircleLeft,
  MdOutlineArrowCircleRight,
} from "react-icons/md";
import { FaCircle } from "react-icons/fa";
import { ArrowDownCircleIcon } from "@heroicons/react/16/solid";

const LandinCenter = () => {
  return (
    <>
   
      <div className="bg-white text-right mt-2 sm:w-[95%] w-[340px] sm:h-[498px] h-[100px] mx-auto shadow-2xl  rounded-2xl ">
        <div className="flex justify-between gap-4 border[1px] mt-6 px-4 ">
          <div className="flex justify-between items-center">
            <div className=" flex justify-center items-center gap-4">
              <p className="text-[#D27700] sm:text-[30px] items-center gap-2 text-[18px] sm:text-wrap text-nowrap flex">
                {" "}
                <FaCircle size={20} />
                جشنواره تخفیف بهاره
              </p>
              <p className="bg-[#DC0000] text-lg font-medium px-2 text-white sm:text-wrap text-nowrap h-fit rounded-full">
                {" "}
                بجنب تا تموم نشده !
              </p>
            </div>
            <p className="text-[#DC0000] sm:text-[30px] text-[18px]  pr-[11rem] sm:text-wrap  ">
              {" "}
              ۰۶ : ۰۹ : ۲۶ : ۳۵
            </p>
          </div>

          <div className="flex justify-between items-center gap-4 mt-2">
            <MdOutlineArrowCircleRight
              size={40}
              className="mt-1 custom-next cursor-pointer"
            />
            <MdOutlineArrowCircleLeft
              size={40}
              className="mt-1 custom-prev cursor-pointer"
            />

            <button className="border-[1px] rounded-2xl w-[165px] flex justify-center items-center gap-2 text-[20px] text-[#9E9E9E] ">
              مشاهده همه
              <MdKeyboardArrowLeft size={32} />
            </button>
          </div>
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
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 4 },
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
        <h3 className=" text-[#FFFFFF]  text-[20px] bg-[#E89300] sm:w-[245px] w-[170px] h-[50px] text-center  rounded-2xl sm:mt-4 mt-14 pt-3 mr-14  ">
          میخوام آگهی بذارم!
        </h3>
        <h3 className=" text-[#333] sm:text-[24px] text-[17px] bg-[#FFEFD9] sm:w-[70%] w-[80%] h-[7.5rem]  text-center rounded-l-full sm:ml-0 ml-24 sm:mt-2 mt-96 pt-9 -translate-x-34">
          {" "}
          اگه تو هم خونه یا ملکی داری که میخوای بفروشی یا اجاره بدی الان وقتشه
        </h3>
      </div>

      <h2 className="flex  sm:mr-30 mr-14 sm:mt-20 mt-6 text-right text-[#D27700] sm:text-[30px] text-[34px]">
        {" "}
        <Image
          className="ml-1.5 "
          src={Ellipse}
          alt=""
          width={12}
          height={12}
          priority
        />
        اجاره ویلا در محبوب‌ترین مقصد‌های این ماه
      </h2>

      <div className="flex border-2 border-[#ddd] w-[90%] mx-auto h-[230px] mt-5">
        <p className="text-[#543000] text-right text-[26px] w-[50%] pt-[90px] text-base mr-10">
          {" "}
          اینجا می تونید محبوب ترین مقصد هایی که توی ماه اخیر
          <br />
          از نگاه کاربر ها پر بازدید تر از بقیه بودن رو ببینید!{" "}
        </p>
        <div className="flex  gap-6  w-[50%] h-[165px] mt-10 justify-around ml-56">
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
      </div>

      <div className="flex justify-center items-center gap-4 mt-2">
        <MdOutlineArrowCircleRight
          size={40}
          className="mt-1 custom-next cursor-pointer"
        />
        <MdOutlineArrowCircleLeft
          size={40}
          className="mt-1 custom-prev cursor-pointer"
        />

        <button className="border-[1px] rounded-2xl w-[165px] flex justify-center items-center gap-2 text-[20px] text-[#9E9E9E] ">
          مشاهده همه
          <MdKeyboardArrowLeft size={32} />
        </button>
      </div>

      <div className="flex  mt-20 mr-20 gap-4 ">
        <p className="text-[#D27700] text-[33px]  ">
          {/* <FaCircle size={15} /> */}
          داغ ترین معاملات هفته{" "}
        </p>
        <p className="text-[#9A815F] text-[26px]  mt-2  ">
          {" "}
          آنچه که از بازار معاملات ملک در این هفته داشتیم{" "}
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

      <div className="flex  items-center gap-4 mt-2">
        <MdOutlineArrowCircleRight
          size={40}
          className="mt-1 custom-next cursor-pointer"
        />
        <MdOutlineArrowCircleLeft
          size={40}
          className="mt-1 custom-prev cursor-pointer"
        />

        <button className="border-[1px] rounded-2xl w-[165px] flex justify-center items-center gap-2 text-[20px] text-[#9E9E9E] ">
          مشاهده همه
          <MdKeyboardArrowLeft size={32} />
        </button>

        

      </div>
    </>
  );
};

export { LandinCenter };

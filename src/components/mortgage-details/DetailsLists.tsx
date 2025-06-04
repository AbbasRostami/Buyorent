"use client";

import Image from "next/image";
import React from "react";
import { FaPhoneVolume, FaHashtag } from "react-icons/fa";
import image from "../../assets/Avatar2.png";
import moment from "moment-jalaali";
import { HouseDetailsData } from "@/types/DetailsTypes";
import { NearbyPOIs } from "./NearbyPOIs";
import { MotionDiv, MotionP } from "../../utils/providers/MotionWrapper";

const DetailsLists = ({ data }: { data: HouseDetailsData }) => {
  return (
    <>
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <button className="text-lg font-bold border border-color2 px-4 py-2 rounded-full text-color1">
          امکانات ملک
        </button>
      </MotionDiv>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3 text-[16px] font-medium">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-col pr-3 border-r-3 border-[#d27700]"
        >
          <span className="text-[#d27700] dark:text-amber-400">تعداد خواب</span>
          <span className="text-gray-800 dark:text-gray-100">
            {" "}
            {data.rooms} خواب{" "}
          </span>
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="flex flex-col pr-3 border-r-3 border-[#d27700]"
        >
          <span className="text-[#d27700] dark:text-amber-400">اجاق گاز</span>
          <span className="text-gray-800 dark:text-gray-100"> دارد </span>
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="flex flex-col pr-3 border-r-3 border-[#d27700]"
        >
          <span className="text-[#d27700] dark:text-amber-400">بالکن</span>
          <span className="text-gray-800 dark:text-gray-100">دارد</span>
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="flex flex-col pr-3 border-r-3 border-[#d27700]"
        >
          <span className="text-[#d27700] dark:text-amber-400">
            سرویس ایرانی
          </span>
          <span className="text-gray-800 dark:text-gray-100">
            {" "}
            {data.bathrooms}{" "}
          </span>
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.0 }}
          className="flex flex-col pr-3 border-r-3 border-[#d27700]"
        >
          <span className="text-[#d27700] dark:text-amber-400">نوع نما</span>
          <span className="text-gray-800 dark:text-gray-100">
            {" "}
            {data.categories.name}{" "}
          </span>
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="flex flex-col pr-3 border-r-3 border-[#d27700]"
        >
          <span className="text-[#d27700] dark:text-amber-400">نوع حیاط</span>
          <span className="text-gray-800 dark:text-gray-100">
            {" "}
            {data.yard_type}{" "}
          </span>
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.4 }}
          className="flex flex-col pr-3 border-r-3 border-[#d27700]"
        >
          <span className="text-[#d27700] dark:text-amber-400"> پارکینگ</span>
          <span className="text-gray-800 dark:text-gray-100">
            {data.parking}{" "}
          </span>
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.6 }}
          className="flex flex-col pr-3 border-r-3 border-[#d27700]"
        >
          <span className="text-[#d27700] dark:text-amber-400">آسانسور</span>
          <span className="text-gray-800 dark:text-gray-100">دارد</span>
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.8 }}
          className="flex flex-col pr-3 border-r-3 border-[#d27700]"
        >
          <span className="text-[#d27700] dark:text-amber-400">اوپن</span>
          <span className="text-gray-800 dark:text-gray-100">سنگی</span>
        </MotionDiv>
      </div>

      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 3.0 }}
      >
        <button className="text-xl font-semibold text-[#943600] mt-4 border rounded-full px-4 py-2 dark:text-amber-400">
          قیمت رهن‌واجاره و اطلاعات تماس
        </button>
      </MotionDiv>

      <div className="grid gap-10 items-center sm:grid-cols-2">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.2 }}
          className="flex flex-col gap-2 pr-3 border-r-3 border-[#d27700]"
        >
          <span className="text-[#d27700] dark:text-amber-400 text-xl font-bold">
            قیمت اجاره از
          </span>
          <span className="dark:text-gray-100 font-bold text-2xl text-[#1E1E1E]">
            {data.price}{" "}
            <span className="text-[#595959] font-bold text-sm dark:text-amber-100">
              تومان
            </span>{" "}
          </span>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.4 }}
          className="flex flex-col gap-2 pr-3 border-r-3 border-[#d27700]"
        >
          <span className="text-[#d27700] dark:text-amber-400 text-xl font-bold">
            قیمت رهن از
          </span>
          <span className="dark:text-gray-100 font-bold text-2xl text-[#1E1E1E]">
            {data.price}{" "}
            <span className="text-[#595959] font-bold text-sm dark:text-amber-100">
              تومان
            </span>{" "}
          </span>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.6 }}
          className="flex items-center justify-start gap-2"
        >
          <Image
            src={image}
            alt="phone"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div>
            <p className="text-lg font-medium text-gray-800 dark:text-gray-100">
              {data.sellerName}
            </p>
            <p className="text-medium font-normal">
              {" "}
              {moment(data.last_updated).format("jYYYY/jMM/jDD")}{" "}
            </p>
          </div>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.8 }}
          className="flex justify-start items-center gap-2"
        >
          <div className="w-[50px] h-[50px] border border-amber-500 dark:border-amber-300 flex justify-center items-center rounded-full">
            <FaPhoneVolume
              className="text-gray-800 dark:text-amber-100"
              size={20}
            />
          </div>

          <div className="bg-color1 dark:bg-gray-700 rounded-full px-6 py-3 text-white font-bold text-medium">
            شماره تماس : 5642***0938
          </div>
        </MotionDiv>

        <MotionP
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 4.0 }}
          className="flex items-center gap-1 text-medium font-semibold text-gray-500 dark:text-gray-100"
        >
          <FaHashtag />
          برچسب ها:
          {data.tags?.[0] && (
            <span className="text-medium font-semibold text-color2">
              #{data.tags[0]}
            </span>
          )}
          {data.tags?.[1] && (
            <span className="text-medium font-semibold text-color2">
              #{data.tags[1]}
            </span>
          )}
        </MotionP>
      </div>

      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 4.2 }}
        className="mt-8"
      >
        <NearbyPOIs address={data.address} />
      </MotionDiv>
    </>
  );
};

export default DetailsLists;

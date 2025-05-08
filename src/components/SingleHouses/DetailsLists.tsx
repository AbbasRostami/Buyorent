import Image from "next/image";
import React from "react";
import { FaPhoneVolume, FaHashtag } from "react-icons/fa";
import image from "../../assets/Avatar2.png";

const DetailsLists = () => {
  return (
    <>
      <button className="text-lg font-bold border border-color2 px-4 py-2 rounded-full  text-color1">
        امکانات ملک
      </button>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3 text-[16px] font-medium">
        <div className="flex flex-col pr-3 border-r-3 border-[#d27700]">
          <span className="text-[#d27700] dark:text-amber-400">تعداد خواب</span>
          <span className="text-gray-800 dark:text-gray-100">۴ خواب</span>
        </div>
        <div className="flex flex-col pr-3 border-r-3 border-[#d27700]">
          <span className="text-[#d27700] dark:text-amber-400">اجاق گاز</span>
          <span className="text-gray-800 dark:text-gray-100">دارد</span>
        </div>
        <div className="flex flex-col pr-3 border-r-3 border-[#d27700]">
          <span className="text-[#d27700] dark:text-amber-400">بالکن</span>
          <span className="text-gray-800 dark:text-gray-100">دارد</span>
        </div>
        <div className="flex flex-col pr-3 border-r-3 border-[#d27700]">
          <span className="text-[#d27700] dark:text-amber-400">
            سرویس ایرانی
          </span>
          <span className="text-gray-800 dark:text-gray-100">کوار</span>
        </div>
        <div className="flex flex-col pr-3 border-r-3 border-[#d27700]">
          <span className="text-[#d27700] dark:text-amber-400">نوع نما</span>
          <span className="text-gray-800 dark:text-gray-100">رومی</span>
        </div>
        <div className="flex flex-col pr-3 border-r-3 border-[#d27700]">
          <span className="text-[#d27700] dark:text-amber-400">نوع سازه</span>
          <span className="text-gray-800 dark:text-gray-100">نوساز</span>
        </div>
        <div className="flex flex-col pr-3 border-r-3 border-[#d27700]">
          <span className="text-[#d27700] dark:text-amber-400">پارکینگ</span>
          <span className="text-gray-800 dark:text-gray-100">دارد</span>
        </div>
        <div className="flex flex-col pr-3 border-r-3 border-[#d27700]">
          <span className="text-[#d27700] dark:text-amber-400">آسانسور</span>
          <span className="text-gray-800 dark:text-gray-100">دارد</span>
        </div>
        <div className="flex flex-col pr-3 border-r-3 border-[#d27700]">
          <span className="text-[#d27700] dark:text-amber-400">اوپن</span>
          <span className="text-gray-800 dark:text-gray-100">سنگی</span>
        </div>
      </div>

      <button className="text-xl font-semibold text-[#943600] mt-4 border rounded-full px-4 py-2 dark:text-amber-400">
        قیمت رهن‌واجاره و اطلاعات تماس
      </button>

      <div className="grid gap-10 items-center sm:grid-cols-2">
        <div className="flex flex-col gap-2 pr-3 border-r-3 border-[#d27700]">
          <span className="text-[#d27700] dark:text-amber-400 text-xl font-bold">
            قیمت اجاره از
          </span>
          <span className="dark:text-gray-100 font-bold text-2xl text-[#1E1E1E]">
            1،200،000،000{" "}
            <span className="text-[#595959] font-bold text-sm dark:text-amber-100">
              تومان
            </span>{" "}
          </span>
        </div>

        <div className="flex flex-col gap-2 pr-3 border-r-3 border-[#d27700]">
          <span className="text-[#d27700] dark:text-amber-400 text-xl font-bold">
            قیمت رهن از
          </span>
          <span className="dark:text-gray-100 font-bold text-2xl text-[#1E1E1E]">
            1،200،000،000{" "}
            <span className="text-[#595959] font-bold text-sm dark:text-amber-100">
              تومان
            </span>{" "}
          </span>
        </div>

        <div className="flex items-center justify-start gap-2 ">
          <Image
            src={image}
            alt="phone"
            width={50}
            height={50}
            className=" rounded-full"
          />
          <div>
            <p className="text-lg font-medium text-gray-800 dark:text-gray-100">
              عباس بهبودی
            </p>
            <p className="text-medium font-normal">15 اردیبهشت 1404</p>
          </div>
        </div>

        <div className="flex justify-start items-center gap-2 ">
          <div className="w-[50px] h-[50px] border border-amber-500 dark:border-amber-300 flex justify-center items-center rounded-full ">
            <FaPhoneVolume
              className="text-gray-800 dark:text-amber-100"
              size={20}
            />
          </div>

          <div className="bg-color1 dark:bg-gray-700 rounded-full px-6 py-3 text-white font-bold text-medium">
            شماره تماس : 5642***0938
          </div>
        </div>

        <p className=" flex items-center gap-1 text-medium font-semibold text-[#979797]">
          <FaHashtag />
          برچسب ها:
          <span className="text-medium font-semibold  text-color2">
            #رهن‌واجاره
          </span>
          <span className="text-medium font-semibold  text-color2">
            #خونه‌آپارتمانی
          </span>
        </p>
      </div>
    </>
  );
};

export default DetailsLists;

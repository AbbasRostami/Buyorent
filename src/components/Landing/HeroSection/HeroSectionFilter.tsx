"use client";
import React from "react";
import reserve from "./../../../assets/Landing/reserve.png";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Image from "next/image";
import { Input, Select, SelectItem, DatePicker } from "@heroui/react";

const destinations = [
  { value: "tehran", label: "تهران" },
  { value: "shiraz", label: "شیراز" },
  { value: "mashhad", label: "مشهد" },
];

const HeroSectionFilter = () => {
  return (
    <>
      <div className="w-full flex justify-center items-center px-2 sm:px-4 -mt-3 xl:-mt-10 mb-10 sm:mb-20 step-2">
        <div className="relative z-20 w-full" >
          <div className="absolute -translate-y-7 -translate-x-25 z-30 hidden lg:block">
            <Image src={reserve} alt="home" className="w-20" />
          </div>

          <div className="absolute left-0 -translate-x-1/2 md:-translate-x-1/3 translate-y-1/4 hidden md:flex bg-[#D27700] rounded-l-full justify-end items-center">
            <FaMagnifyingGlass className="text-amber-50 text-xl sm:text-2xl lg:text-3xl" />
          </div>

          <div className="relative bg-[#FFFBF5] dark:bg-gray-800 dark:text-white translate-x-2 sm:translate-x-7 drop-shadow-lg rounded-l-md rounded-r-full w-full z-10 px-4 sm:px-8 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="destination"
                  className="text-sm sm:text-base md:text-lg font-medium"
                >
                  انتخاب مقصد :
                </label>
                <Select
                  id="destination"
                  aria-label="انتخاب مقصد"
                  className="text-sm sm:text-base"
                  labelPlacement="outside"
                  placeholder="___   انتخاب کنید   ___"
                  variant="bordered"
                >
                  {destinations.map((dest) => (
                    <SelectItem
                      className="dark:text-amber-100"
                      key={dest.value}
                    >
                      {dest.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="guests"
                  className="text-sm sm:text-base md:text-lg font-medium"
                >
                  تعداد نفرات :
                </label>
                <Input
                  placeholder="0"
                  type="number"
                  id="guests"
                  aria-label="تعداد نفرات"
                  className="text-sm sm:text-base"
                  variant="bordered"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="check-in"
                  className="text-sm sm:text-base md:text-lg font-medium"
                >
                  تاریخ ورود :
                </label>
                <DatePicker
                  id="check-in"
                  aria-label="تاریخ ورود"
                  className="text-sm sm:text-base"
                  variant="bordered"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="check-out"
                  className="text-sm sm:text-base md:text-lg font-medium"
                >
                  تاریخ خروج :
                </label>
                <DatePicker
                  id="check-out"
                  aria-label="تاریخ خروج"
                  className="text-sm sm:text-base"
                  variant="bordered"
                />
              </div>
            </div>
          </div>

          <div
            className="absolute border-2 border-amber-700 hidden md:block rounded-r-md  rounded-l-full w-full left-1/2 top-1/2 -translate-x-[56%] -translate-y-1/2 pointer-events-none"
            style={{ height: "calc(100% + 2rem)" }}
          />
          
        </div>
      </div>
    </>
  );
};

export default HeroSectionFilter;

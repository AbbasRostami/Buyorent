"use client";
import React from "react";
import reserve from "./../../../assets/Landing/reserve.png";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Image from "next/image";
import {
  HeroInput,
  HeroSelect,
  HeroSelectItem,
} from "../../providers/HeroUIClient";
const animals = [
  { value: "cat", label: "گربه" },
  { value: "dog", label: "سگ" },
  { value: "elephant", label: "فیل" },
];
const HeroSectionFilter = () => {
  return (
    <>
      <div className="w-full flex  justify-center items-center px-4 -mt-3 xl:-mt-10 mb-20">
        <div className="relative z-20 w-full max-w-6xl mx-auto">
          <div className="absolute -translate-y-7 -translate-x-25 z-30">
            <Image src={reserve} alt="home" />
          </div>

          <div className="absolute left-0 -translate-x-1/2 md:-translate-x-1/3 translate-y-1/4 hidden md:flex bg-[#D27700] rounded-l-full justify-end items-center px-6 py-5">
            <FaMagnifyingGlass className="text-amber-50 md:text-2xl lg:text-3xl" />
          </div>

          <div className="relative bg-[#FFFBF5] dark:bg-gray-800 dark:text-white translate-x-7 drop-shadow-lg rounded-l-md rounded-r-full w-full z-10 px-8 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col gap-2 max-w-xs">
                <label
                  htmlFor="destination"
                  className="text-base sm:text-md md:text-lg lg:text-xl font-medium"
                >
                  انتخاب مقصد :
                </label>
                <HeroSelect
                  id="destination"
                  aria-label="انتخاب مقصد"
                  className="text-sm sm:text-base md:text-lg"
                  labelPlacement="outside"
                  placeholder="___   انتخاب کنید   ___"
                  variant="bordered"
                >
                  {animals.map((animal) => (
                    <HeroSelectItem
                      className="dark:text-amber-100"
                      key={animal.value}
                    >
                      {animal.label}
                    </HeroSelectItem>
                  ))}
                </HeroSelect>
              </div>

              <div className="flex flex-col gap-2 max-w-xs">
                <label
                  htmlFor="destination"
                  className="text-base sm:text-md md:text-lg lg:text-xl font-medium"
                >
                  تعداد نفرات :
                </label>
                <HeroInput
                  placeholder="0"
                  type="number"
                  id="destination"
                  aria-label="تعداد نفرات"
                  className="text-sm sm:text-base md:text-lg"
                  variant="bordered"
                />
              </div>

              <div className="flex flex-col gap-2 max-w-xs">
                <label
                  htmlFor="destination"
                  className="text-base sm:text-md md:text-lg lg:text-xl font-medium"
                >
                  تاریخ ورود :
                </label>
                <HeroSelect
                  id="arrival-date"
                  aria-label="تاریخ ورود"
                  className="text-sm sm:text-base md:text-lg"
                  labelPlacement="outside"
                  placeholder="وارد کنید"
                  variant="bordered"
                >
                  {animals.map((animal) => (
                    <HeroSelectItem
                      className="dark:text-amber-100"
                      key={animal.value}
                    >
                      {animal.label}
                    </HeroSelectItem>
                  ))}
                </HeroSelect>
              </div>
              <div className="flex flex-col gap-2 max-w-xs">
                <label
                  htmlFor="destination"
                  className="text-base sm:text-md md:text-lg lg:text-xl font-medium"
                >
                  تاریخ خروج :
                </label>
                <HeroSelect
                  id="destination"
                  aria-label="تاریخ خروج"
                  className="text-sm sm:text-base md:text-lg"
                  labelPlacement="outside"
                  placeholder="وارد کنید"
                  variant="bordered"
                >
                  {animals.map((animal) => (
                    <HeroSelectItem
                      className="dark:text-amber-100"
                      key={animal.value}
                    >
                      {animal.label}
                    </HeroSelectItem>
                  ))}
                </HeroSelect>
              </div>
            </div>
          </div>

          <div
            className="absolute border-2 border-amber-700 rounded-r-md rounded-l-full w-full left-1/2 top-1/2 -translate-x-[56%] -translate-y-1/2 pointer-events-none"
            style={{ height: "calc(100% + 2rem)" }}
          />
        </div>
      </div>
    </>
  );
};

export default HeroSectionFilter;

"use client";
import Image from "next/image";
import home from "./../../assets/Landing/home.png";
import reserve from "./../../assets/Landing/reserve.png";
import { IoIosArrowBack } from "react-icons/io";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Button, Input, Select, SelectItem } from "@heroui/react";

import { MotionDiv, MotionP } from "../providers/MotionWrapper";
import Link from "next/link";
const animals = [
  { key: "cat", label: "Cat" },
  { key: "dog", label: "Dog" },
  { key: "elephant", label: "Elephant" },
];

export default function HeroSection() {
  return (
    <div className="lg:mx-24 mt-12">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 ">
        <MotionDiv
          initial={{ opacity: 0, x: 100, rotate: 10 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1 }}
          className="mx-2 xl:mx-24 mt-4"
        >
          <MotionP
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-2xl lg:text-3xl xl:text-4xl font-semibold dark:text-amber-100"
          >
            یه انتخاب ساده ، یه جای راحت!
          </MotionP>

          <MotionP
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-md md:text-lg xl:text-xl mt-4 dark:text-amber-200"
          >
            رزرو ، رهن ، اجاره و حتی خرید و فروش ملک مورد نظرتون مثل آب خوردن با
            <span>
              بای<span className="text-amber-500">و</span>رنت
            </span>
          </MotionP>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <Button className="group relative bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 text-amber-900 px-9 py-7 rounded-[3rem] text-xl md:text-2xl font-bold tracking-wide mt-10 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-[1.03] hover:shadow-2xl hover:shadow-amber-500/30 overflow-hidden isolate">
              <div className="absolute inset-0 rounded-[3rem] overflow-hidden">
                <div className="absolute -inset-[3px] animate-rotate-metallic bg-[conic-gradient(from_var(--angle),#f59e0b_0%,#d97706_30%,transparent_80%,#d97706_100%)] opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-amber-100/50 backdrop-blur-sm m-[3px] rounded-[3rem]" />
              </div>

              <div className="absolute inset-0 rounded-[3rem] overflow-hidden">
                <div className="absolute -top-[150%] -left-[150%] w-[400%] h-[400%] animate-diamond-shine bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.95)_0%,transparent_60%)] opacity-70 mix-blend-overlay" />
              </div>

              <div className="absolute inset-0 rounded-[3rem] overflow-hidden">
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-[#b45309]/60 rounded-full animate-float-particle"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  />
                ))}
              </div>

             <Link href="/mortgage-and-house-rent" className="group">
  <span className="relative z-20 flex items-center gap-4 cursor-pointer">
    <span className="bg-gradient-to-r from-[#92400e] to-[#78350f] bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(251,191,36,0.3)]">
      رهن و اجاره ملک
    </span>
    <IoIosArrowBack className="w-8 h-8 text-[#78350f] transition-transform duration-500 group-hover:translate-x-3 group-hover:text-[#92400e]" />
  </span>
</Link>
            </Button>
          </MotionDiv>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, x: -100, rotate: -10 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1 }}
          className="mx-auto"
        >
          <Image src={home} alt="home" />
        </MotionDiv>
      </div>

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
                <Select
                  id="destination"
                  aria-label="انتخاب مقصد"
                  className="text-sm sm:text-base md:text-lg"
                  labelPlacement="outside"
                  placeholder="___   انتخاب کنید   ___"
                  variant="bordered"
                >
                  {animals.map((animal) => (
                    <SelectItem
                      className="dark:text-amber-100"
                      key={animal.key}
                    >
                      {animal.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <div className="flex flex-col gap-2 max-w-xs">
                <label
                  htmlFor="destination"
                  className="text-base sm:text-md md:text-lg lg:text-xl font-medium"
                >
                  تعداد نفرات :
                </label>
                <Input
                  placeholder="0"
                  type="number"
                  id="destination"
                  aria-label="تعداد نفرات"
                  className="text-sm sm:text-base md:text-lg"
                  variant="bordered"
                />
                {animals.map((animal) => (
                  <SelectItem className="dark:text-amber-100" key={animal.key}>
                    {animal.label}
                  </SelectItem>
                ))}
              </div>

              <div className="flex flex-col gap-2 max-w-xs">
                <label
                  htmlFor="destination"
                  className="text-base sm:text-md md:text-lg lg:text-xl font-medium"
                >
                  تاریخ ورود :
                </label>
                <Select
                  id="arrival-date"
                  aria-label="تاریخ ورود"
                  className="text-sm sm:text-base md:text-lg"
                  labelPlacement="outside"
                  placeholder="وارد کنید"
                  variant="bordered"
                >
                  {animals.map((animal) => (
                    <SelectItem
                      className="dark:text-amber-100"
                      key={animal.key}
                    >
                      {animal.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div className="flex flex-col gap-2 max-w-xs">
                <label
                  htmlFor="destination"
                  className="text-base sm:text-md md:text-lg lg:text-xl font-medium"
                >
                  تاریخ خروج :
                </label>
                <Select
                  id="destination"
                  aria-label="تاریخ خروج"
                  className="text-sm sm:text-base md:text-lg"
                  labelPlacement="outside"
                  placeholder="وارد کنید"
                  variant="bordered"
                >
                  {animals.map((animal) => (
                    <SelectItem
                      className="dark:text-amber-100"
                      key={animal.key}
                    >
                      {animal.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>
          </div>

          <div
            className="absolute border-2 border-amber-700 rounded-r-md rounded-l-full w-full left-1/2 top-1/2 -translate-x-[56%] -translate-y-1/2 pointer-events-none"
            style={{ height: "calc(100% + 2rem)" }}
          />
        </div>
      </div>
    </div>
  );
}

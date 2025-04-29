"use client";
import Image from "next/image";
import home from "./../../assets/Landing/home.png";
import reserve from "./../../assets/Landing/reserve.png";
import { IoIosArrowBack } from "react-icons/io";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { motion } from "framer-motion";
const animals = [
  { key: "cat", label: "Cat" },
  { key: "dog", label: "Dog" },
  { key: "elephant", label: "Elephant" },
];

export default function HeroSection() {
  return (
    <div className="lg:mx-24 ">
      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 ">
        <motion.div
          initial={{ opacity: 0, x: 100, rotate: 10 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1 }}
          className="mx-2 xl:mx-24 mt-4"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-2xl lg:text-3xl xl:text-4xl font-semibold dark:text-amber-100"
          >
            یه انتخاب ساده ، یه جای راحت!
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-md md:text-lg xl:text-xl mt-4 dark:text-amber-200"
          >
            رزرو ، رهن ، اجاره و حتی خرید و فروش ملک مورد نظرتون مثل آب خوردن با
            <span>
              بای<span className="text-amber-500">و</span>رنت
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <Button className="flex items-center gap-4 px-4 py-2 bg-amber-500 text-amber-50 text-sm md:text-md xl:text-lg rounded-2xl mt-6 transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-400/50">
              رهن و اجاره ملک
              <IoIosArrowBack className="transition-transform duration-300 transform group-hover:translate-x-2" />
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -100, rotate: -10 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1 }}
          className="mx-auto"
        >
          <Image src={home} alt="home" />
        </motion.div>
      </div>

      {/* Dynamic Section */}
      <div className="w-full flex  justify-center items-center px-4 -mt-3 xl:-mt-10 mb-20">
        <div className="relative z-20 w-full max-w-6xl mx-auto">
          {/* Reserve Image */}
          <div className="absolute -translate-y-7 -translate-x-25 z-30">
            <Image src={reserve} alt="home" />
          </div>

          {/* Search Icon Box */}
          <div className="absolute left-0 -translate-x-1/2 md:-translate-x-1/3 translate-y-1/4 hidden md:flex bg-[#D27700] rounded-l-full justify-end items-center px-6 py-5">
            <FaMagnifyingGlass className="text-amber-50 md:text-2xl lg:text-3xl" />
          </div>

          {/* Search Form */}
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
                    <SelectItem className="dark:text-amber-100" key={animal.key}>{animal.label}</SelectItem>
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
                  <SelectItem className="dark:text-amber-100" key={animal.key}>{animal.label}</SelectItem>
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
                    <SelectItem className="dark:text-amber-100" key={animal.key}>{animal.label}</SelectItem>
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
                    <SelectItem className="dark:text-amber-100" key={animal.key}>{animal.label}</SelectItem>
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

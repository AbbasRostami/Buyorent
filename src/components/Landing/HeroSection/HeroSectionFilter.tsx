"use client";
import React, { useState } from "react";
import reserve from "./../../../assets/Landing/reserve.png";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Image from "next/image";
import { Input, Select, SelectItem } from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useDebounce } from "use-debounce";
const destinations = [
  { value: "تهران", label: "تهران" },
  { value: "شیراز", label: "شیراز" },
  { value: "مشهد", label: "مشهد" },
];
const transactionTypes = [
  { label: "اجاره", value: "rental" },
  { label: "رهن", value: "mortgage" },
  { label: "خرید", value: "direct_purchase" },
];
const HeroSectionFilter = () => {
  const router = useRouter();

  const [filters, setFilters] = useState({
    destination: "",
    transactionType: "",
    minRent: "",
    maxRent: "",
  });

  const [debouncedFilters] = useDebounce(filters, 2000);

  const handleApplyFilters = () => {
    if (
      debouncedFilters.destination &&
      debouncedFilters.transactionType &&
      debouncedFilters.minRent &&
      debouncedFilters.maxRent
    ) {
      const query = new URLSearchParams({
        destination: debouncedFilters.destination,
        transactionType: debouncedFilters.transactionType,
        minRent: debouncedFilters.minRent,
        maxRent: debouncedFilters.maxRent,
      }).toString();
      router.push(`/mortgage-and-house-rent?${query}`);
    } else {
      toast.error("لطفا همه فیلترها را پر کنید");
    }
  };
  return (
    <>
      <div className="w-full flex justify-center items-center px-2 sm:px-4 -mt-3 xl:-mt-10 mb-10 sm:mb-20 step-2">
        <div className="relative z-20 w-full">
          <div className="absolute -translate-y-7 -translate-x-25 z-30 hidden lg:block">
            <Image src={reserve} alt="home" className="w-20" />
          </div>

          <div
            onClick={handleApplyFilters}
            className="absolute left-0 -translate-x-1/2 md:-translate-x-1/3 translate-y-1/4 cursor-pointer hidden lg:flex bg-[#D27700] rounded-l-full justify-end items-center"
          >
            <FaMagnifyingGlass className="text-amber-50 cursor-pointer text-xl sm:text-2xl lg:text-6xl p-3" />
          </div>

          <div className="relative bg-[#FFFBF5] dark:bg-gray-800 dark:text-white translate-x-2 sm:translate-x-7 drop-shadow-lg rounded-l-md rounded-lg lg:rounded-r-full w-full z-10 px-4 sm:px-8 py-4">
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
                  value={filters.destination}
                  onChange={(e) => {
                    setFilters((prev) => ({
                      ...prev,
                      destination: e.target.value,
                    }));
                  }}
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
                  htmlFor="transactionType"
                  className="text-sm sm:text-base md:text-lg font-medium"
                >
                  نوع معامله :
                </label>
                <Select
                  id="transactionType"
                  aria-label="نوع معامله"
                  className="text-sm sm:text-base"
                  placeholder="نوع معامله"
                  variant="bordered"
                  value={filters.transactionType}
                  items={transactionTypes}
                  onChange={(e) => {
                    setFilters((prev) => ({
                      ...prev,
                      transactionType: e.target.value,
                    }));
                  }}
                >
                  {(item) => (
                    <SelectItem key={item.value}>{item.label}</SelectItem>
                  )}
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="minRent"
                  className="text-sm sm:text-base md:text-lg font-medium"
                >
                  حداقل اجاره :
                </label>
                <Input
                  step={200000}
                  id="minRent"
                  aria-label="حداقل اجاره"
                  className="text-sm sm:text-base"
                  variant="bordered"
                  type="number"
                  placeholder="مبلغ را وارد کنید..."
                  value={filters.minRent}
                  onChange={(e) => {
                    setFilters((prev) => ({
                      ...prev,
                      minRent: e.target.value,
                    }));
                  }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="maxRent"
                  className="text-sm sm:text-base md:text-lg font-medium"
                >
                  حداکثر اجاره :
                </label>
                <Input
                  step={200000}
                  id="maxRent"
                  aria-label="حداکثر اجاره"
                  className="text-sm sm:text-base"
                  variant="bordered"
                  type="number"
                  placeholder="مبلغ را وارد کنید..."
                  value={filters.maxRent}
                  onChange={(e) => {
                    setFilters((prev) => ({
                      ...prev,
                      maxRent: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>
            <button
              onClick={handleApplyFilters}
              className=" cursor-pointer lg:hidden  bg-[#D27700] w-full py-2 mt-6 rounded-xl flex justify-center items-center gap-2"
            >
              جستجو
              <FaMagnifyingGlass
                size={20}
                className="text-amber-50 cursor-pointer "
              />
            </button>
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

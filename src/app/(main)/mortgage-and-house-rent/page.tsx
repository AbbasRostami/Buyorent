"use client";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Select,
  SelectItem,
  useDisclosure,
} from "@heroui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { RiMenuSearchLine } from "react-icons/ri";
import {
  MdOutlineBedroomParent,
  MdOutlineBathroom,
  MdCarRepair,
} from "react-icons/md";
import { FiFilter } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { useGet } from "@/utils/hooks/useReactQueryHooks";
import { HouseTypeProps, HouseTypeRentProps } from "@/types/LandingType";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination as SwiperPagination,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SkeletonCard from "@/components/skeleton/SkeletonCard";

const RentPage = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const destinations = [
    { label: "تهران", value: "tehran" },
    { label: "شیراز", value: "shiraz" },
    { label: "اصفهان", value: "isfahan" },
  ];

  const propertyTypes = [
    { label: "همه", value: "همه" },
    { label: "ویلا", value: "ویلا" },
    { label: "آپارتمان", value: "آپارتمان" },
    { label: "روستایی", value: "روستایی" },
  ];

  const transactionTypes = [
    { label: "اجاره", value: "rental" },
    { label: "رهن", value: "mortgage" },
    { label: "خرید", value: "direct_purchase" },
  ];

  const sortOptions = [
    { label: "جدیدترین‌ها", value: "last_updated" },
    { label: "ارزان‌ترین‌ها", value: "price" },
    { label: "محبوب‌ترین‌ها", value: "rate" },
  ];

  const DEFAULT_PARAMS = {
    page: "1",
    limit: "10",
    order: "ASC",
    transactionType: "",
  };
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );
  const [debouncedSearch] = useDebounce(searchValue, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    let shouldUpdate = false;

    Object.entries(DEFAULT_PARAMS).forEach(([key, value]) => {
      if (!params.has(key)) {
        params.set(key, value);
        shouldUpdate = true;
      }
    });

    if (shouldUpdate) {
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, []);

  const getQueryParams = () => {
    const result: Record<string, string> = {};

    const keysToInclude = [
      "page",
      "limit",
      "sort",
      "order",
      "location",
      "propertyType",
      "transactionType",
      "minPrice",
      "maxPrice",
      "minRent",
      "maxRent",
      "minMortgage",
      "maxMortgage",
      "minArea",
      "maxArea",
    ];

    keysToInclude.forEach((key) => {
      const value = searchParams.get(key);
      if (value && value.trim() !== "") result[key] = value;
    });

    if (debouncedSearch.trim() !== "") {
      result["search"] = debouncedSearch.trim();
    }

    if (!("transactionType" in result)) {
      result["transactionType"] = "";
    }

    return result;
  };

  const queryParams = getQueryParams();
  const queryString = new URLSearchParams(queryParams).toString();

  const { data, isLoading, isError } = useGet<HouseTypeRentProps>(
    `/houses?${queryString}`
  );
  console.log("data", data);

  const updateQueryParams = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (value && value.trim() !== "") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    if (!params.has("transactionType")) {
      params.set("transactionType", "");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleFilterChange = (name: string, value: string | number) => {
    updateQueryParams({
      [name]: String(value),
      ...(name !== "page" && { page: "1" }),
    });
  };

  const SORT_OPTIONS = [
    { label: "همه", sort: "", order: "" },
    { label: "محبوب ترین", sort: "rate", order: "desc" },
    { label: "ارزان ترین", sort: "price", order: "asc" },
    { label: "گران ترین", sort: "price", order: "desc" },
    { label: "عکس دار", sort: "photos", order: "desc" },
    { label: "پارکینگ دار", sort: "parking", order: "desc" },
    { label: "حمام دار", sort: "bathrooms", order: "desc" },
  ];

  const handleSortChange = (sort: string, order: string) => {
    updateQueryParams({ sort, order });
  };

  const activeSort = searchParams.get("sort") || "";

  useEffect(() => {
    updateQueryParams({ search: debouncedSearch });
  }, [debouncedSearch]);

  const [filters, setFilters] = useState({
    location: "",
    propertyType: "",
    transactionType: "",
    minRent: "",
    maxRent: "",
    minMortgage: "",
    maxMortgage: "",
    sort: "",
  });

  return (
    <>
      <div className="mt-32 gap-2 flex flex-col sm:flex-row sm:justify-start justify-center items-center max-w-screen-xl mx-auto px-4 text-center sm:text-right">
        <p className="text-2xl sm:text-4xl font-bold">رهن و اجاره </p>
        <p className="bg-[#e89300] rounded-2xl px-4 py-2 w-fit h-fit text-white font-bold text-xl sm:text-3xl mt-2 sm:mt-0">
          آپارتمان
        </p>
      </div>

      <div className="flex flex-col justify-center gap-6 xl:flex-row md:justify-start md:items-center max-w-screen-xl mx-auto mt-14 text-[#272727] rounded-2xl px-4">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10 w-full">
          <div className="relative w-full md:w-[320px] max-w-md">
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
              <RiMenuSearchLine size={25} />
            </span>
            <input
              type="text"
              placeholder="جستجو کنید..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full p-3 pr-10 text-sm border dark:text-amber-100 dark:placeholder:text-amber-50 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <Button
            onPress={onOpen}
            className="w-full md:w-24 text-sm bg-[#e89300] text-white p-3 rounded-2xl transition"
          >
            فیلترها
          </Button>
          <Modal
            isOpen={isOpen}
            size={"5xl"}
            onOpenChange={onOpenChange}
            scrollBehavior="inside"
            backdrop="opaque"
            classNames={{
              backdrop:
                "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
            }}
          >
            <ModalContent className="z-[99999]">
              {(onClose) => (
                <>
                  <ModalHeader className="text-lg font-semibold">
                    فیلتر پیشرفته
                  </ModalHeader>
                  <ModalBody className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* محل مورد نظر */}
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          محل مورد نظر
                        </label>
                        <Select
                          placeholder="انتخاب مقصد"
                          items={destinations}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              location: e.target.value,
                            }))
                          }
                        >
                          {(item) => (
                            <SelectItem key={item.value}>
                              {item.label}
                            </SelectItem>
                          )}
                        </Select>
                      </div>

                      {/* نوع ملک */}
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          نوع ملک
                        </label>
                        <Select
                          placeholder="نوع ملک"
                          items={propertyTypes}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              propertyType: e.target.value,
                            }))
                          }
                        >
                          {(item) => (
                            <SelectItem key={item.value}>
                              {item.label}
                            </SelectItem>
                          )}
                        </Select>
                      </div>

                      {/* نوع معامله */}
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          نوع معامله
                        </label>
                        <Select
                          placeholder="نوع معامله"
                          items={transactionTypes}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              transactionType: e.target.value,
                            }))
                          }
                        >
                          {(item) => (
                            <SelectItem key={item.value}>
                              {item.label}
                            </SelectItem>
                          )}
                        </Select>
                      </div>

                      {/* نوع مرتب‌سازی */}
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          مرتب‌ سازی
                        </label>
                        <Select
                          placeholder="مرتب‌سازی"
                          items={sortOptions}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              sort: e.target.value,
                            }))
                          }
                        >
                          {(item) => (
                            <SelectItem key={item.value}>
                              {item.label}
                            </SelectItem>
                          )}
                        </Select>
                      </div>
                    </div>

                    {/* فیلترهای عددی */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* حداقل اجاره */}
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          حداقل اجاره
                        </label>
                        <Input
                          type="number"
                          placeholder="مبلغ را وارد کنید..."
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              minRent: e.target.value,
                            }))
                          }
                        />
                      </div>

                      {/* حداکثر اجاره */}
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          حداکثر اجاره
                        </label>
                        <Input
                          type="number"
                          placeholder="مبلغ را وارد کنید..."
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              maxRent: e.target.value,
                            }))
                          }
                        />
                      </div>

                      {/* حداقل رهن */}
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          حداقل رهن
                        </label>
                        <Input
                          type="number"
                          placeholder="مبلغ را وارد کنید..."
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              minMortgage: e.target.value,
                            }))
                          }
                        />
                      </div>

                      {/* حداکثر رهن */}
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          حداکثر رهن
                        </label>
                        <Input
                          type="number"
                          placeholder="مبلغ را وارد کنید..."
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              maxMortgage: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                  </ModalBody>

                  <ModalFooter className="mt-4">
                    <Button
                      color="danger"
                      variant="light"
                      onPress={onClose}
                      className="ml-2"
                    >
                      انصراف
                    </Button>
                    <Button
                      className="bg-[#e89300]"
                      onPress={() => {
                        updateQueryParams(filters);
                        onClose();
                      }}
                      startContent={<FiFilter className="text-lg" />}
                    >
                      اعمال فیلترها
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>

        <ul className="flex gap-3 md:gap-4 overflow-x-auto md:overflow-visible whitespace-nowrap md:px-0">
          {SORT_OPTIONS.map(({ label, sort, order }, index) => {
            const isActive =
              searchParams.get("sort") === sort &&
              searchParams.get("order") === order;

            return (
              <li
                key={index}
                onClick={() => handleSortChange(sort, order)}
                className={`flex-shrink-0 w-24 cursor-pointer text-center text-base border rounded-2xl py-2 transition duration-300 ease-in-out ${
                  isActive
                    ? "bg-[#e89300] text-white font-bold"
                    : "border-[#ccc] dark:text-amber-50 hover:bg-[#e89300] hover:text-white"
                }`}
              >
                {label}
              </li>
            );
          })}
        </ul>
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 md:px-8 border-t border-[#ccc] mt-6 pt-6 max-w-screen-xl mx-auto">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 md:px-8 border-t border-[#ccc] mt-6 pt-6 max-w-screen-xl mx-auto">
          {data?.map((property) => (
            <div
              key={property.id}
              className="group bg-white dark:bg-slate-900 rounded-3xl shadow-md hover:shadow-xl dark:hover:shadow-amber-200/10 transition-all duration-500 p-3 sm:p-4 cursor-pointer overflow-hidden border border-gray-100 dark:border-slate-700/40"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <Swiper
                  modules={[SwiperPagination]}
                  // autoplay={{
                  //   delay: 3000,
                  //   disableOnInteraction: false,
                  // }}
                  pagination={{ clickable: true }}
                  loop
                >
                  {property.photos.map((photo: string, idx: number) => (
                    <SwiperSlide key={idx}>
                      <Image
                        src={photo}
                        unoptimized
                        alt={`${property.title}-photo-${idx}`}
                        width={300}
                        height={176}
                        className="w-full h-auto object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 rounded-2xl" />
              </div>

              <div className="p-2 sm:p-4 space-y-3">
                <h3 className="text-xl font-bold text-gray-800 dark:text-amber-100 transition-colors duration-300 group-hover:text-amber-600 dark:group-hover:text-yellow-300">
                  {property.title}
                </h3>

                <p className="text-sm flex items-center gap-1 text-gray-500 dark:text-gray-300 transition-all duration-300 group-hover:translate-x-1">
                  <IoLocationOutline
                    size={20}
                    className="text-gray-400 dark:text-white"
                  />
                  {property.address}
                </p>

                <div className="flex flex-wrap gap-2 border-t border-gray-200 dark:border-slate-700 pt-3">
                  <div className="flex items-center gap-1 py-1 px-3 rounded-full text-sm font-medium bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-amber-50 transition-all duration-300 hover:scale-105">
                    <MdOutlineBedroomParent size={18} /> {property.rooms} خواب
                  </div>
                  <div className="flex items-center gap-1 py-1 px-3 rounded-full text-sm font-medium bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-amber-50 transition-all duration-300 hover:scale-105">
                    <MdOutlineBathroom size={18} /> {property.bathrooms} حمام
                  </div>
                  <div className="flex items-center gap-1 py-1 px-3 rounded-full text-sm font-medium bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-amber-50 transition-all duration-300 hover:scale-105">
                    <MdCarRepair size={18} /> پارکینگ {property.parking}
                  </div>
                </div>

                {/* قیمت */}
                <div className="flex flex-wrap items-center gap-2 mt-7">
                  <span className="text-sm sm:text-base font-semibold text-gray-400 line-through decoration-red-400">
                    12.000.000
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    تومان /
                  </span>
                  <span className="text-base sm:text-xl font-bold text-gray-900 dark:text-[#e2eaa0] transition-colors duration-300">
                    {property.price}
                    <span className="text-xs"> تومان</span>
                  </span>

                  <div className="ml-auto bg-gradient-to-r from-red-500 to-red-600 text-xs sm:text-sm font-bold px-3 py-1 text-white rounded-full shadow-sm animate-pulse group-hover:animate-none transition-all duration-300">
                    ۹٪
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div dir="ltr" className="w-full flex justify-center items-center mb-10">
        <Pagination
          className="mt-7"
          color="warning"
          showControls
          initialPage={1}
          total={5}
        />
      </div>
    </>
  );
};

export default RentPage;

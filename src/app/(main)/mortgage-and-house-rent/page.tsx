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
import React, { useEffect, useState } from "react";
import { RiMenuSearchLine } from "react-icons/ri";

import { FiFilter } from "react-icons/fi";
import { useDebounce } from "use-debounce";
import { useGet } from "@/utils/hooks/useReactQueryHooks";
import { HouseTypeRentProps } from "@/types/LandingType";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import PropertyCard from "@/components/mortgage-and-house-rent/PropertyCard";
import { useRouter, useSearchParams } from "next/navigation";

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
      result["transactionType"] = DEFAULT_PARAMS.transactionType;
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
  const isFilterActive = () => {
    return Object.values(filters).some(
      (value) => value !== "" && value !== undefined
    );
  };
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

          {isFilterActive() ? (
            <Button
              className="w-full md:w-24 text-sm bg-red-500 text-white p-3 rounded-2xl transition"
              onPress={() => {
                setFilters({
                  location: "",
                  propertyType: "",
                  transactionType: "",
                  minRent: "",
                  maxRent: "",
                  minMortgage: "",
                  maxMortgage: "",
                  sort: "",
                });
                updateQueryParams({
                  location: "",
                  propertyType: "",
                  transactionType: "",
                  minRent: "",
                  maxRent: "",
                  minMortgage: "",
                  maxMortgage: "",
                  sort: "",
                  page: "1",
                });
              }}
            >
              حذف فیلتر
            </Button>
          ) : (
            <Button
              onPress={onOpen}
              className="w-full md:w-24 text-sm bg-[#e89300] text-white p-3 rounded-2xl transition"
            >
              فیلترها
            </Button>
          )}
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

      <PropertyCard data={data} isLoading={isLoading} />
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

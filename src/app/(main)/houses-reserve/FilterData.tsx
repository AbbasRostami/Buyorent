"use client";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Select,
  SelectItem,
  Slider,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import React, { useState, useEffect } from "react";
import { FiFilter } from "react-icons/fi";
import { RiMenuSearchLine } from "react-icons/ri";
import { useSearchParams, useRouter } from "next/navigation";

const FilterData = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // State initialization from URL params
  const initialMinPrice = parseInt(searchParams.get("minPrice") || "1500000");
  const initialMaxPrice = parseInt(searchParams.get("maxPrice") || "5500000");
  
  const [priceRange, setPriceRange] = useState([initialMinPrice, initialMaxPrice]);
  const [transactionType, setTransactionType] = useState(
    searchParams.get("transactionType") || ""
  );
  const [sort, setSort] = useState(searchParams.get("sort") || "");
  const [order, setOrder] = useState(searchParams.get("order") || "");
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  // Transaction type options
  const transactionTypes = [
    { label: "اجاره", value: "rental" },
    { label: "رهن", value: "mortgage" },
    { label: "رزرو", value: "reservation" },
    { label: "خرید مستقیم", value: "direct_purchase" },
  ];

  // Sort options
  const sortOptions = [
    { label: "بیشترین امتیاز", value: "rate", order: "desc" },
    { label: "کمترین امتیاز", value: "rate", order: "asc" },
    { label: "گران‌ترین", value: "price", order: "desc" },
    { label: "ارزان‌ترین", value: "price", order: "asc" },
  ];

  // Update URL params
  const updateFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    params.set("minPrice", priceRange[0].toString());
    params.set("maxPrice", priceRange[1].toString());
    params.set("transactionType", transactionType);
    
    if (sort) {
      params.set("sort", sort);
      params.set("order", order);
    } else {
      params.delete("sort");
      params.delete("order");
    }
    
    searchTerm ? params.set("search", searchTerm) : params.delete("search");
    
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Handle search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(updateFilters, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-2 flex-wrap">
        <Button
          onPress={onOpen}
          className="text-xs cursor-pointer bg-color1 text-white p-4 rounded-lg transition"
        >
          فیلترها
        </Button>

        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
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
                <ModalBody className="space-y-4">
                  {/* Transaction Type */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      نوع معامله
                    </label>
                    <Select
                      selectedKeys={[transactionType]}
                      onSelectionChange={(keys) =>
                        setTransactionType(Array.from(keys)[0] as string)
                      }
                      placeholder="انتخاب نوع معامله"
                      items={transactionTypes}
                    >
                      {(item) => (
                        <SelectItem key={item.value}>{item.label}</SelectItem>
                      )}
                    </Select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <div className="flex flex-col gap-1 text-sm font-medium mb-2">
                      <p>
                        قیمت از:{" "}
                        <span className="text-color1">
                          {priceRange[0].toLocaleString()} تومان
                        </span>
                      </p>
                      <p>
                        قیمت تا:{" "}
                        <span className="text-color1">
                          {priceRange[1].toLocaleString()} تومان
                        </span>
                      </p>
                    </div>
                    <Slider
                      label="بازه قیمت (تومان)"
                      className="max-w-full"
                      color="warning"
                      value={priceRange}
                      onChange={(val) => setPriceRange(val as number[])}
                      minValue={1000000}
                      maxValue={10000000}
                      step={500000}
                      formatOptions={{
                        style: "currency",
                        currency: "IRR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }}
                      getValue={(val) => `${val.toLocaleString()} تومان`}
                    />
                  </div>

                  {/* Sorting */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      مرتب‌سازی بر اساس
                    </label>
                    <Select
                      selectedKeys={[`${sort}-${order}`]}
                      onSelectionChange={(keys) => {
                        const value = Array.from(keys)[0] as string;
                        const [sort, order] = value.split("-");
                        setSort(sort);
                        setOrder(order);
                      }}
                      placeholder="انتخاب نوع مرتب‌سازی"
                      items={sortOptions}
                    >
                      {(item) => (
                        <SelectItem key={`${item.value}-${item.order}`}>
                          {item.label}
                        </SelectItem>
                      )}
                    </Select>
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
                    className="bg-color1"
                    onPress={() => {
                      updateFilters();
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

        <div className="relative flex-1 min-w-[180px]">
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <RiMenuSearchLine size={25} />
          </span>
          <input
            type="text"
            placeholder="جستجو کنید..."
            className="w-full p-3 pr-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default FilterData;
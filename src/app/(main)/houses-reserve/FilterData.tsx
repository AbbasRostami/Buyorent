"use client";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  SelectItem,
  Slider,
  useDisclosure,
} from "@heroui/react";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiFilter } from "react-icons/fi";
import { RiMenuSearchLine } from "react-icons/ri";

const FilterData = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [priceRange, setPriceRange] = useState([1000000, 10000000]);
  const [sort, setSort] = useState<"rating" | "price" | "">("");
  const [order, setOrder] = useState<"asc" | "desc" | "">("");
  const [transactionType, setTransactionType] = useState("");

  
  // تنظیم مقدار پیش‌فرض از URL (در صورتی که در حال استفاده مجدد از query باشی)
  useEffect(() => {
    const min = Number(searchParams.get("minPrice")) || 1000000;
    const max = Number(searchParams.get("maxPrice")) || 10000000;
    setPriceRange([min, max]);
    setSort((searchParams.get("sort") as "price" | "rating") || "");
    setOrder((searchParams.get("order") as "asc" | "desc") || "");
    setTransactionType(searchParams.get("transactionType") || "");
  }, [searchParams]);

  const handleApplyFilters = () => {
    const query = new URLSearchParams();

    query.set("minPrice", String(priceRange[0]));
    query.set("maxPrice", String(priceRange[1]));

    if (sort && order) {
      query.set("sort", sort);
      query.set("order", order);
    }

    if (transactionType) {
      query.set("transactionType", transactionType);
    }

    router.push(`?${query.toString()}`);
  };

  const transactionTypes = [
    { label: "رهن", value: "mortgage" },
    { label: "اجاره", value: "rental" },
    { label: "رزرو", value: "reservation" },
    { label: "خرید مستقیم", value: "direct_purchase" },
  ];


const onFilterChange = (key, value) => {
  const params = new URLSearchParams(searchParams);
  if (value) {
    params.set(key, value);
  } else {
    params.delete(key);
  }
  router.push(`?${params.toString()}`);
};
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
                  فیلتر پیشرفته هتل‌ها
                </ModalHeader>

                <ModalBody className="space-y-4">
                  {/* نوع معامله */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      نوع معامله
                    </label>
                    <Select
                      placeholder="انتخاب نوع معامله"
                      selectedKeys={[transactionType]}
                      onChange={(e) => setTransactionType(e.target.value)}
                      items={transactionTypes}
                    >
                      {(item) => (
                        <SelectItem key={item.value}>{item.label}</SelectItem>
                      )}
                    </Select>
                  </div>

                  {/* قیمت */}
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
                      getValue={(val) => `${val.toLocaleString()} تومان`}
                    />
                  </div>

                  {/* مرتب‌سازی بر اساس امتیاز */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      مرتب‌سازی بر اساس امتیاز
                    </label>
                    <Select
                      placeholder="انتخاب نوع"
                      selectedKeys={sort === "rating" ? [order] : []}
                      onChange={(e) => {
                        setSort("rating");
                        setOrder(e.target.value as "asc" | "desc");
                      }}
                      items={[
                        { label: "بیشترین امتیاز", value: "desc" },
                        { label: "کمترین امتیاز", value: "asc" },
                      ]}
                    >
                      {(item) => (
                        <SelectItem key={item.value}>{item.label}</SelectItem>
                      )}
                    </Select>
                  </div>

                  {/* مرتب‌سازی بر اساس قیمت */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      مرتب‌سازی بر اساس قیمت
                    </label>
                    <Select
                      placeholder="انتخاب نوع"
                      selectedKeys={sort === "price" ? [order] : []}
                      onChange={(e) => {
                        setSort("price");
                        setOrder(e.target.value as "asc" | "desc");
                      }}
                      items={[
                        { label: "ارزان‌ترین", value: "asc" },
                        { label: "گران‌ترین", value: "desc" },
                      ]}
                    >
                      {(item) => (
                        <SelectItem key={item.value}>{item.label}</SelectItem>
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
                      handleApplyFilters();
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

        {/* نوار جستجو (در صورت نیاز، به searchParams وصل کن) */}
        <div className="relative flex-1 min-w-[180px]">
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <RiMenuSearchLine size={25} />
          </span>
          <input
            type="text"
            placeholder="جستجو کنید..."
            className="w-full p-3 pr-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </>
  );
};

export default FilterData;

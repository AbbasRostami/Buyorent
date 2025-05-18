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
  useDisclosure,
} from "@heroui/react";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RiMenuSearchLine } from "react-icons/ri";
import { useDebounce } from "@/hooks/useDebounce"; // هوک debounce جداگانه بنویس پایین

const FilterData = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [priceRange, setPriceRange] = useState([1000000, 10000000]);
  const [sort, setSort] = useState<"rate" | "price" | "">("");
  const [order, setOrder] = useState<"asc" | "desc" | "">("");
  const [transactionType, setTransactionType] = useState("");
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);
  const debouncedPriceRange = useDebounce(priceRange, 500);

  const updateQueryParams = (params: {
    minPrice?: number;
    maxPrice?: number;
    sort?: "rate" | "price";
    order?: "asc" | "desc";
    transactionType?: string;
    search?: string;
  }) => {
    const query = new URLSearchParams(searchParams.toString());

    if (params.minPrice !== undefined)
      query.set("minPrice", String(params.minPrice));
    if (params.maxPrice !== undefined)
      query.set("maxPrice", String(params.maxPrice));

    if (params.sort) query.set("sort", params.sort);
    if (params.order) query.set("order", params.order);

    if (params.transactionType)
      query.set("transactionType", params.transactionType);
    if (params.search !== undefined) query.set("search", params.search);

    router.push(`?${query.toString()}`);
  };

  // sync state from URL
  useEffect(() => {
    const min = Number(searchParams.get("minPrice")) || 1000000;
    const max = Number(searchParams.get("maxPrice")) || 10000000;
    setPriceRange([min, max]);

    setSort((searchParams.get("sort") as "price" | "rate") || "");
    setOrder((searchParams.get("order") as "asc" | "desc") || "");
    setTransactionType(searchParams.get("transactionType") || "");
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  // debounce update for price
  useEffect(() => {
    updateQueryParams({
      minPrice: debouncedPriceRange[0],
      maxPrice: debouncedPriceRange[1],
    });
  }, [debouncedPriceRange]);

  // debounce update for search
  useEffect(() => {
    updateQueryParams({ search: debouncedSearch });
  }, [debouncedSearch]);

  const transactionTypes = [
    { label: "رهن", value: "mortgage" },
    { label: "اجاره", value: "rental" },
    { label: "رزرو", value: "reservation" },
    { label: "خرید مستقیم", value: "direct_purchase" },
  ];

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
            {() => (
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
                      onChange={(e) => {
                        const val = e.target.value;
                        setTransactionType(val);
                        updateQueryParams({ transactionType: val });
                      }}
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

                  {/* مرتب‌سازی امتیاز */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      مرتب‌سازی بر اساس امتیاز
                    </label>
                    <Select
                      placeholder="انتخاب نوع"
                      selectedKeys={sort === "rate" ? [order] : []}
                      onChange={(e) => {
                        const val = e.target.value as "asc" | "desc";
                        setSort("rate");
                        setOrder(val);
                        updateQueryParams({ sort: "rate", order: val });
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

                  {/* مرتب‌سازی قیمت */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      مرتب‌سازی بر اساس قیمت
                    </label>
                    <Select
                      placeholder="انتخاب نوع"
                      selectedKeys={sort === "price" ? [order] : []}
                      onChange={(e) => {
                        const val = e.target.value as "asc" | "desc";
                        setSort("price");
                        setOrder(val);
                        updateQueryParams({ sort: "price", order: val });
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
              </>
            )}
          </ModalContent>
        </Modal>

        {/* نوار جستجو */}
        <div className="relative flex-1 min-w-[180px]">
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <RiMenuSearchLine size={25} />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجو کنید..."
            className="w-full p-3 pr-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </>
  );
};

export default FilterData;

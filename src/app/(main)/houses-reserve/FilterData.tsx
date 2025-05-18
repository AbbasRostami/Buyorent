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

let debounceTimer: NodeJS.Timeout;

const FilterData = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [priceRange, setPriceRange] = useState([1000000, 10000000]);
  const [sort, setSort] = useState<"rate" | "price" | "">("");
  const [order, setOrder] = useState<"asc" | "desc" | "">("");
  const [transactionType, setTransactionType] = useState("");
  const [search, setSearch] = useState("");

  const defaultMinPrice = 1000000;
  const defaultMaxPrice = 10000000;

  const updateQueryParams = (params: {
    minPrice?: number;
    maxPrice?: number;
    sort?: "rate" | "price" | "";
    order?: "asc" | "desc" | "";
    transactionType?: string;
    search?: string;
  }) => {
    const query = new URLSearchParams(searchParams.toString());

    if (params.minPrice !== undefined && params.minPrice !== defaultMinPrice) {
      query.set("minPrice", String(params.minPrice));
    } else {
      query.delete("minPrice");
    }

    if (params.maxPrice !== undefined && params.maxPrice !== defaultMaxPrice) {
      query.set("maxPrice", String(params.maxPrice));
    } else {
      query.delete("maxPrice");
    }

    if (params.sort) query.set("sort", params.sort);
    else query.delete("sort");

    if (params.order) query.set("order", params.order);
    else query.delete("order");

    if (params.transactionType)
      query.set("transactionType", params.transactionType);
    else query.delete("transactionType");

    if (params.search !== undefined) {
      if (params.search.trim() === "") query.delete("search");
      else query.set("search", params.search);
    }

    router.push(`?${query.toString()}`);
  };
  const debouncedUpdateQuery = (params: any) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const newParams: any = {};

      if (params.search !== undefined) {
        newParams.search = params.search;
      }

      if (params.minPrice !== undefined) newParams.minPrice = params.minPrice;
      if (params.maxPrice !== undefined) newParams.maxPrice = params.maxPrice;
      if (params.sort) newParams.sort = params.sort;
      if (params.order) newParams.order = params.order;
      if (params.transactionType)
        newParams.transactionType = params.transactionType;

      updateQueryParams(newParams);
    }, 500);
  };

  useEffect(() => {
    const min = Number(searchParams.get("minPrice")) || 1000000;
    const max = Number(searchParams.get("maxPrice")) || 10000000;
    setPriceRange([min, max]);
    setSort((searchParams.get("sort") as "price" | "rate") || "");
    setOrder((searchParams.get("order") as "asc" | "desc") || "");
    setTransactionType(searchParams.get("transactionType") || "");
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  const transactionTypes = [
    { label: "رهن", value: "mortgage" },
    { label: "اجاره", value: "rental" },
    { label: "رزرو", value: "reservation" },
    { label: "خرید مستقیم", value: "direct_purchase" },
  ];

  const clearFilters = () => {
    setPriceRange([defaultMinPrice, defaultMaxPrice]);
    setSort("");
    setOrder("");
    setTransactionType("");
    setSearch("");
    updateQueryParams({
      minPrice: defaultMinPrice,
      maxPrice: defaultMaxPrice,
      sort: "",
      order: "",
      transactionType: "",
      search: "",
    });
  };
  const isFilterActive = () => {
    return (
      priceRange[0] !== defaultMinPrice ||
      priceRange[1] !== defaultMaxPrice ||
      sort !== "" ||
      order !== "" ||
      transactionType !== "" ||
      search !== ""
    );
  };

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-2 flex-wrap">
        {isFilterActive() ? (
          <Button
            onPress={clearFilters}
            className="text-sm cursor-pointer bg-red-600 text-white p-5 rounded-lg transition"
          >
            پاک کردن فیلترها
          </Button>
        ) : (
          <Button
            onPress={onOpen}
            className="text-sm cursor-pointer bg-color1 text-white p-5 rounded-lg transition"
          >
            فیلترها
          </Button>
        )}

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
                  <div>
                    <label
                      htmlFor="transaction-type"
                      className="block text-sm font-medium mb-1"
                    >
                      نوع معامله
                    </label>
                    <Select
                      id="transaction-type"
                      aria-labelledby="transaction-type"
                      placeholder="انتخاب نوع معامله"
                      selectedKeys={[transactionType]}
                      onChange={(e) => {
                        const val = e.target.value;
                        setTransactionType(val);
                        debouncedUpdateQuery({
                          transactionType: val,
                          sort,
                          order,
                          minPrice: priceRange[0],
                          maxPrice: priceRange[1],
                          search,
                        });
                      }}
                      items={transactionTypes}
                    >
                      {(item) => (
                        <SelectItem key={item.value}>{item.label}</SelectItem>
                      )}
                    </Select>
                  </div>

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
                      id="sort-price"
                      aria-label="مرتب‌سازی بر اساس قیمت"
                      aria-labelledby="sort-price"
                      label="بازه قیمت (تومان)"
                      className="max-w-full"
                      color="warning"
                      value={priceRange}
                      onChange={(val) => {
                        const [min, max] = val as number[];
                        setPriceRange([min, max]);
                        debouncedUpdateQuery({
                          minPrice: min,
                          maxPrice: max,
                          sort,
                          order,
                          transactionType,
                          search,
                        });
                      }}
                      minValue={1000000}
                      maxValue={10000000}
                      step={50000}
                      getValue={(val) => `${val.toLocaleString()} تومان`}
                    />
                  </div>

                  <div>
                    <label htmlFor="sort-rate" className="block text-sm font-medium mb-1">
                      مرتب‌سازی بر اساس امتیاز
                    </label>
                    <Select
                    id="sort-rate"
                    aria-labelledby="sort-rate"
                      placeholder="انتخاب نوع"
                      selectedKeys={sort === "rate" ? [order] : []}
                      onChange={(e) => {
                        const val = e.target.value as "asc" | "desc";
                        setSort("rate");
                        setOrder(val);
                        debouncedUpdateQuery({
                          sort: "rate",
                          order: val,
                          minPrice: priceRange[0],
                          maxPrice: priceRange[1],
                          transactionType,
                          search,
                        });
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

                  <div>
                    <label htmlFor="sort-price" className="block text-sm font-medium mb-1">
                      مرتب‌سازی بر اساس قیمت
                    </label>
                    <Select
                    id="sort-price"
                    aria-labelledby="sort-price"
                      placeholder="انتخاب نوع"
                      selectedKeys={sort === "price" ? [order] : []}
                      onChange={(e) => {
                        const val = e.target.value as "asc" | "desc";
                        setSort("price");
                        setOrder(val);
                        debouncedUpdateQuery({
                          sort: "price",
                          order: val,
                          minPrice: priceRange[0],
                          maxPrice: priceRange[1],
                          transactionType,
                          search,
                        });
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

        <div className="relative flex-1 min-w-[180px]">
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <RiMenuSearchLine size={25} />
          </span>
          <input
            type="text"
            placeholder="جستجو کنید..."
            value={search}
            onChange={(e) => {
              const val = e.target.value;
              setSearch(val);
              debouncedUpdateQuery({
                search: val,
                sort,
                order,
                minPrice: priceRange[0],
                maxPrice: priceRange[1],
                transactionType,
              });
            }}
            className="w-full p-3 pr-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-color2"
          />
        </div>
      </div>
    </>
  );
};

export default FilterData;

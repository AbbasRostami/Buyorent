"use client";
import React from "react";
import image from "./../../../../assets/Avatar1.png";
import image2 from "./../../../../assets/Avatar2.png";
import image3 from "./../../../../assets/Avatar3.png";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Pagination,
  Select,
  SelectItem,
  useDisclosure,
} from "@heroui/react";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { CgAdd } from "react-icons/cg";
import { TiDeleteOutline } from "react-icons/ti";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaFileExcel, FaPrint, FaFilePdf, FaHeart } from "react-icons/fa";
import Image from "next/image";
import { PiSealWarningBold } from "react-icons/pi";
import FavoriteFilter from "./Filter/FavoriteFilter";
import { useCustomTable } from "@/utils/hooks/useCustomTable";
export interface BookingDataFavo {
  id: number;
  title: string;
  addres: string;
  price: number;
  image: string;
}
const data: BookingDataFavo[] = [
  {
    id: 1,
    title: "هتل سراوان",
    addres: " گیلان ، رشت ، میدان آزادی ، جنب چهار راه عظ....گیلان ، رشت...",
    price: 150000000,
    image: image.src,
  },
  {
    id: 2,
    title: "شیراز پارک",
    addres: " گیلان ، رشت ، میدان آزادی ، جنب چهار راه عظ....گیلان ، رشت...",
    price: 150000000,
    image: image2.src,
  },
  {
    id: 3,
    title: "تراول پارک",
    addres: " گیلان ، رشت ، میدان آزادی ، جنب چهار راه عظ....گیلان ، رشت...",
    price: 160000000,
    image: image3.src,
  },
  {
    id: 4,
    title: "میدان جمهریه",
    addres: " گیلان ، رشت ، میدان آزادی ، جنب چهار راه عظ....گیلان ، رشت...",
    price: 180000000,
    image: image2.src,
  },
  {
    id: 5,
    title: "ماهی پارک",
    addres: " گیلان ، رشت ، میدان آزادی ، جنب چهار راه عظ....گیلان ، رشت...",
    price: 170000000,
    image: image3.src,
  },
  {
    id: 6,
    title: "کوه سراوان",
    addres: " گیلان ، رشت ، میدان آزادی ، جنب چهار راه عظ....گیلان ، رشت...",
    price: 170000000,
    image: image2.src,
  },
  {
    id: 7,
    title: "ساحل سراوان",
    addres: " گیلان ، رشت ، میدان آزادی ، جنب چهار راه عظ....گیلان ، رشت...",
    price: 100000,
    image: image.src,
  },
  {
    id: 8,
    title: "ماهی پارک",
    addres: " گیلان ، رشت ، میدان آزادی ، جنب چهار راه عظ....گیلان ، رشت...",
    price: 160000000,
    image: image2.src,
  },
  {
    id: 9,
    title: "ماهی پارک",
    addres: " گیلان ، رشت ، میدان آزادی ، جنب چهار راه عظ....گیلان ، رشت...",
    price: 190000000,
    image: image3.src,
  },
  {
    id: 10,
    title: "نسرین پارک",
    addres: " گیلان ، رشت ، میدان آزادی ، جنب چهار راه عظ....گیلان ، رشت...",
    price: 170000000,
    image: image2.src,
  },
  {
    id: 11,
    title: "ماهی پارک",
    addres: " گیلان ، رشت ، میدان آزادی ، جنب چهار راه عظ....گیلان ، رشت...",
    price: 170000000,
    image: image.src,
  },
  {
    id: 12,
    title: "ساحل سراوان",
    addres: " گیلان ، رشت ، میدان آزادی ، جنب چهار راه عظ....گیلان ، رشت...",
    price: 170000000,
    image: image3.src,
  },
  {
    id: 13,
    title: "ماهی بهشهر",
    addres: " گیلان ، رشت ، میدان آزادی ، جنب چهار راه عظ....گیلان ، رشت...",
    price: 186600000,
    image: image2.src,
  },
  {
    id: 14,
    title: "ماهی پارک",
    addres: " گیلان ، رشت ، میدان آزادی ، جنب چهار راه عظ....گیلان ، رشت...",
    price: 170000000,
    image: image.src,
  },
];
export default function FavoriteTable() {
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo<ColumnDef<BookingDataFavo>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ردیف",
        cell: (info) => info.row.original.id,
        sortingFn: (rowA, rowB) => rowA.original.id - rowB.original.id,
      },
      {
        accessorKey: "image",
        header: "تصویر",
        cell: (info) => {
          const value = info.getValue();
          if (typeof value !== "string") return null;
          return (
            <Image
              src={value}
              alt="image"
              width={42}
              height={42}
              className="rounded-full"
            />
          );
        },
      },
      {
        accessorKey: "title",
        header: "نام اقامتگاه",
        cell: (info) => {
          const value = info.getValue();
          return typeof value === "string" ? value : "";
        },
        enableSorting: true,
      },
      {
        accessorKey: "price",
        header: "قیمت",
        cell: (info) => {
          const value = info.getValue();
          const numValue = typeof value === "number" ? value : Number(value);
          return `${numValue.toLocaleString()} تومان`;
        },
        enableSorting: true,
        sortingFn: (rowA, rowB, columnId) => {
          const a = rowA.getValue(columnId);
          const b = rowB.getValue(columnId);
          const numA = typeof a === "number" ? a : Number(a);
          const numB = typeof b === "number" ? b : Number(b);
          return numA - numB;
        },
      },
      {
        accessorKey: "addres",
        header: " آدرس",
        cell: (info) => info.getValue(),
        enableSorting: false,
      },
      {
        accessorKey: "actions",
        header: "عملیات",
        cell: (info) => {
          return (
            <Dropdown>
              <DropdownTrigger>
                <Button variant="light">
                  <HiDotsHorizontal size={20} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem
                  onPress={() => {
                    console.log("info.row.original:", info.row.original.id);
                  }}
                  color="success"
                  key="details"
                  textValue="رزرو"
                >
                  <div className="flex items-center gap-2">
                    <CgAdd size={20} />
                    رزرو
                  </div>
                </DropdownItem>
                <DropdownItem
                  textValue="حذف"
                  key="delete"
                  className="text-danger"
                  color="danger"
                  onPress={() => {
                    console.log("info.row.original:", info.row.original.id);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <TiDeleteOutline size={20} />
                    حذف
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          );
        },
        enableSorting: false,
      },
    ],
    []
  );

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const { table, exportToExcel, exportToPDF, printTable } =
    useCustomTable<BookingDataFavo>({
      data,
      columns,
      enableSorting: true,
      enableFiltering: true,
      enablePagination: true,
      manualPagination: true,
      pagination,
      onPaginationChange: setPagination,
    });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="space-y-4 bg-white/90 shadow-2xl dark:bg-gray-800 p-4 rounded-2xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 pb-6 border-b-2 border-dashed border-amber-500">
        <div className="flex items-center gap-2  w-full md:w-1/3">
          <FaHeart className="text-amber-900 dark:text-amber-200" size={30} />
          <span className="text-amber-500 text-xl font-bold  dark:text-amber-200 pb-3 border-b-4 border-amber-500 relative group transition-all duration-300 ease-in-out">
            لیست رزرو های ذخیره شده
          </span>
        </div>
        <div className="flex flex-col md:flex-row justify-end items-center mt-4 md:mt-0 gap-2 w-full md:w-1/3">
          <input
            type="text"
            placeholder="نام هتل مورد نظر را جستجو کنید..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className=" p-2 rounded-md border-2 border-amber-500 w-full md:w-2/3"
          />
          <FavoriteFilter
            isOpen={isOpen}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
          />
        </div>
      </div>

      <div className="overflow-x-auto  rounded-xl">
        <table className="min-w-full  table-auto text-sm">
          <thead className="bg-gradient-to-l from-[#915201] to-[#D27700] text-amber-50 dark:bg-gray-500 text-center">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="p-4  font-bold cursor-pointer text-center select-none"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted() === "asc" && (
                      <BsArrowUp className="inline w-4 h-4 ml-1" />
                    )}
                    {header.column.getIsSorted() === "desc" && (
                      <BsArrowDown className="inline w-4 h-4 ml-1" />
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {table.getRowModel().rows.length === 0 ? (
              <tr className="bg-white dark:bg-gray-800">
                <td
                  colSpan={columns.length}
                  className="text-center py-12 text-gray-500 dark:text-gray-400"
                >
                  <div className="flex flex-col items-center justify-center">
                    <PiSealWarningBold
                      size={80}
                      className=" text-amber-500 mb-4"
                    />
                    <p className="text-xl font-bold text-gray-700 dark:text-gray-300">
                      موردی یافت نشد
                    </p>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                      هیچ رزروی با مشخصات جستجو شده یافت نشد
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`
            ${
              index % 2 === 0
                ? "bg-[#ebebe9] dark:bg-gray-800/80"
                : "bg-[#F8F8F8] dark:bg-gray-700/80"
            }
            hover:bg-amber-100/70 dark:hover:bg-gray-600
            transition-colors duration-200
            text-center
          `}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="p-3 text-gray-700 dark:text-gray-300 whitespace-nowrap text-center"
                    >
                      <div className="flex items-center justify-center">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {table.getRowModel().rows.length > 0 && (
        <div className="w-full flex flex-col-reverse md:flex-row justify-between items-center gap-5 md:gap-2">
          <div className="w-full flex flex-col sm:flex-row items-start gap-2">
            <Button variant="flat" color="success" onPress={exportToExcel}>
              <FaFileExcel size={20} />
              خروجی Excel
            </Button>
            <Button variant="flat" color="danger" onPress={exportToPDF}>
              <FaFilePdf size={20} />
              خروجی PDF
            </Button>
            <Button variant="flat" color="primary" onPress={printTable}>
              <FaPrint size={20} />
              چاپ
            </Button>
          </div>
          <div className=" flex flex-col xl:flex-row items-center gap-3">
            <Select
              variant="faded"
              color="warning"
              className="w-28"
              aria-label="تعداد آیتم‌ها"
              renderValue={(items) => {
                return `نمایش: ${items[0].key}`;
              }}
              value={pagination.pageSize.toString()}
              selectedKeys={[pagination.pageSize.toString()]}
              onChange={(e) => {
                const newSize = Number(e.target.value);
                setPagination((prev) => ({
                  ...prev,
                  pageSize: newSize,
                  pageIndex: 0,
                }));
              }}
            >
              {[5, 10, 15].map((size) => (
                <SelectItem textValue="نمایش" key={size}>
                  {size}
                </SelectItem>
              ))}
            </Select>
            <Pagination
              dir="ltr"
              color="warning"
              isCompact
              showControls
              total={table.getPageCount()}
              page={pagination.pageIndex + 1}
              onChange={(page) => {
                setPagination((prev) => ({
                  ...prev,
                  pageIndex: page - 1,
                }));
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

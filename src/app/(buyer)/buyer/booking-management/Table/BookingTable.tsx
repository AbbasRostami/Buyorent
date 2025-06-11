"use client";

import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Pagination,
  SelectItem,
  Select,
  useDisclosure,
} from "@heroui/react";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { TiDeleteOutline } from "react-icons/ti";
import { PiSealWarningBold, PiWarningCircleBold } from "react-icons/pi";
import { GiWallet } from "react-icons/gi";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaFileExcel, FaFilePdf, FaPlusCircle, FaPrint } from "react-icons/fa";

import Image from "next/image";
import ModalDetails from "../Details/ModalDetails";
import BookingBuyerFilter from "../Filter/BookingFilter";
import { useCustomTable } from "@/utils/hooks/useCustomTable";

export interface BookingData {
  id: number;
  title: string;
  date: string;
  price: number;
  guests: number;
  status: "تایید شده" | "در انتظار" | "لغو شده";
  payment_status: "تایید شده" | "لغو شده";
  image: string;
}

export default function BookingTable({
  bookingData,
}: {
  bookingData: BookingData[];
}) {
  const {
    isOpen: isOpenFilter,
    onOpen: onOpenFilter,
    onOpenChange: onOpenChangeFilter,
  } = useDisclosure();
  const {
    isOpen,
    onOpen: onOpen,
    onOpenChange: onOpenChange,
  } = useDisclosure();
  const [selectedRow, setSelectedRow] = useState<BookingData | null>(null);

  const columns = useMemo<ColumnDef<BookingData>[]>(
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
        meta: { isImage: true },
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
        accessorKey: "date",
        header: "تاریخ رزرو",
        cell: (info) => {
          const value = info.getValue();
          return typeof value === "string" ? value : "";
        },
        enableSorting: false,
      },
      {
        accessorKey: "price",
        header: "قیمت کل",
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
        accessorKey: "guests",
        header: "تعداد مسافر",
        cell: (info) => {
          const value = info.getValue();
          return typeof value === "number" ? value : Number(value);
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
        accessorKey: "status",
        header: "وضعیت رزرو",
        cell: (info) => {
          const value = info.getValue();
          if (typeof value !== "string") return null;
          return (
            <Chip
              color={
                value === "تایید شده"
                  ? "success"
                  : value === "در انتظار"
                  ? "warning"
                  : "danger"
              }
              variant="flat"
              className="text-sm px-2 py-1 rounded-xl font-normal"
            >
              {value}
            </Chip>
          );
        },
        enableSorting: true,
      },
      {
        accessorKey: "payment_status",
        header: "وضعیت پرداخت",
        cell: (info) => {
          const value = info.getValue();
          if (typeof value !== "string") return null;
          return (
            <Chip
              color={value === "تایید شده" ? "success" : "danger"}
              variant="flat"
              className="text-sm px-2 py-1 rounded-xl font-normal"
            >
              {value}
            </Chip>
          );
        },
        enableSorting: true,
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
                  textValue="پرداخت"
                  color="success"
                  key="payment"
                >
                  <div className="flex items-center gap-2">
                    <GiWallet size={20} />
                    پرداخت
                  </div>
                </DropdownItem>
                <DropdownItem
                  textValue="جزئیات"
                  color="warning"
                  key="details"
                  onPress={() => {
                    setSelectedRow(info.row.original);
                    onOpen();
                  }}
                >
                  <div className="flex items-center gap-2">
                    <PiWarningCircleBold size={20} />
                    جزئیات
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

  const {
    table,
    columnFilters,
    pagination,
    setPageSize,
    exportToExcel,
    exportToPDF,
    printTable,
  } = useCustomTable<BookingData>({
    data: bookingData,
    columns,
    enableSorting: true,
    enableFiltering: true,
    enablePagination: true,
    defaultPageSize: 5,
  });

  return (
    <div className="space-y-4 bg-white/90 shadow-2xl dark:bg-gray-800 p-4 rounded-2xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 pb-6 border-b-2 border-dashed border-amber-500">
        <div className="flex items-center gap-2  w-full md:w-1/3">
          <FaPlusCircle
            className="text-amber-900 dark:text-amber-200"
            size={30}
          />
          <span className="text-amber-500 text-xl font-bold  dark:text-amber-200 pb-3 border-b-4 border-amber-500 relative group transition-all duration-300 ease-in-out">
            لیست رزرو های شما
          </span>
        </div>
        <div className="flex flex-col md:flex-row justify-end items-center mt-4 md:mt-0 gap-2 w-full md:w-1/3">
          <input
            type="text"
            placeholder="نام هتل مورد نظر را جستجو کنید..."
            value={
              (columnFilters.find((f) => f.id === "title")?.value as string) ??
              ""
            }
            onChange={(e) =>
              table.setColumnFilters([{ id: "title", value: e.target.value }])
            }
            className="p-2 rounded-md border-2 border-amber-500 w-full md:w-2/3"
          />
          <BookingBuyerFilter
            isOpenFilter={isOpenFilter}
            onOpenFilter={onOpenFilter}
            onOpenChangeFilter={onOpenChangeFilter}
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
            {table.getRowModel().rows.length > 0 ? (
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
                      className="p-3 text-gray-700 dark:text-gray-300 whitespace-nowrap"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
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
              selectedKeys={[pagination.pageSize.toString()]}
              renderValue={(items) => {
                return `نمایش: ${items[0].key}`;
              }}
              onChange={(e) => {
                const newSize = Number(e.target.value);
                setPageSize(newSize);
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
              onChange={(page) =>
                table.setPagination((prev) => ({
                  ...prev,
                  pageIndex: page - 1,
                  pageSize: pagination.pageSize,
                }))
              }
            />
          </div>
        </div>
      )}
      <ModalDetails
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        selectedRow={selectedRow as BookingData}
      />
    </div>
  );
}

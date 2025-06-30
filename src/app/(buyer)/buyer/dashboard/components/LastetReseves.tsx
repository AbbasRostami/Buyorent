"use client";

import { ColumnDef, flexRender } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { FaPlusCircle } from "react-icons/fa";
import image from "./../../../../../assets/noimage.png";
import Image from "next/image";
import { CgArrowTopLeftO } from "react-icons/cg";
import { Chip } from "@heroui/react";
import { useCustomTable } from "@/utils/hooks/useCustomTable";
import { useBookingWithHouses } from "@/services/Bookings/getBooking";
import moment from "moment-jalaali";
import Link from "next/link";
import { BookingDataBuyer } from "@/app/(buyer)/buyer/booking-management/page";
export interface LastetResevesType {
  id: number;
  title: string;
  date: string;
  price: number;
  status: "تایید شده" | "در انتظار" | "لغو شده";
  image: string;
}

export default function LastetReseves() {
  const { combinedData: lastetResevesData } =
    useBookingWithHouses<BookingDataBuyer>({
      endpoint: "/bookings",
      queryKeyPrefix: "bookingBuyer",
      pageIndex: 0,
      pageSize: 5,
    });
  const columns = useMemo<ColumnDef<BookingDataBuyer>[]>(
    () => [
      {
        accessorKey: "rowIndex",
        header: "ردیف",
        cell: (info) => info.row.index + 1,
        sortingFn: (rowA, rowB) => rowA.original.id - rowB.original.id,
        enableSorting: true,
      },
      {
        accessorKey: "house.photos",
        header: "تصویر",
        cell: (info) => {
          const value = info.getValue();

          if (!Array.isArray(value) || !value[0]) return null;

          return (
            <Image
              src={value[0] || image}
              alt="house"
              width={48}
              height={48}
              unoptimized
              className="w-12 h-12 rounded-full object-cover"
            />
          );
        },
      },
      {
        accessorKey: "house.title",
        header: "نام اقامتگاه",
        cell: (info) => {
          const value = info.getValue();
          return (
            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
              {typeof value === "string" ? value : ""}
            </span>
          );
        },
        enableSorting: true,
      },
      {
        accessorKey: "createdAt",
        header: "تاریخ رزرو",
        enableSorting: false,
        cell: (info) => {
          const value = info.getValue();
          const formattedDate = moment(value as string).format(
            "jYYYY/jMM/jDD - HH:mm"
          );
          return (
            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
              {formattedDate}
            </span>
          );
        },
      },
      {
        accessorKey: "house.price",
        header: "قیمت",
        cell: (info) => {
          const value = info.getValue();
          const numValue = typeof value === "number" ? value : Number(value);
          return (
            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
              {numValue.toLocaleString("fa-IR")} تومان
            </span>
          );
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
          const value = info.getValue() as string;

          const label =
            value === "confirmed"
              ? "تأیید شده"
              : value === "pending"
              ? "در انتظار"
              : value === "canceled"
              ? "لغو شده"
              : value;

          return (
            <Chip
              color={
                value === "confirmed"
                  ? "success"
                  : value === "pending"
                  ? "warning"
                  : "danger"
              }
              variant="shadow"
              className="text-sm px-2 py-1 rounded-xl font-normal"
            >
              {label}
            </Chip>
          );
        },
        enableSorting: true,
      },
    ],
    []
  );

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const { table } = useCustomTable({
    data: lastetResevesData || [],
    columns,
    enableSorting: true,
    enableFiltering: true,
    enablePagination: true,
    manualPagination: true,
    pagination,
    onPaginationChange: setPagination,
  });

  return (
    <div className="shadow-xl transition-all duration-300 items-center justify-center h-full rounded-2xl bg-white/90 border hover:bg-gray-100 border-gray-200 dark:border-gray-800  dark:hover:bg-gray-700/80 dark:bg-gray-900 p-4 space-y-4">
      <div className="flex items-center justify-between gap-2 pb-6 border-b-2 border-dashed border-amber-500">
        <div className="flex items-center gap-2">
          <FaPlusCircle
            className="text-amber-900 dark:text-amber-200"
            size={28}
          />
          <span className="text-amber-500 text-lg font-bold  dark:text-amber-200 pb-3 border-b-4 border-amber-500 relative group transition-all duration-300 ease-in-out">
            رزرو های اخیر مشتریان
          </span>
        </div>
        <Link
          href="/buyer/booking-management"
          className=" text-sm md:text-lg font-bold  dark:text-amber-200 relative group transition-all duration-300 ease-in-out flex items-center gap-2"
        >
          مشاهده همه رزرو ها
          <CgArrowTopLeftO size={25} className="text-amber-500" />
        </Link>
      </div>

      <div className="overflow-x-auto  rounded-xl">
        <table className="min-w-full  table-auto text-sm">
          <thead className="bg-gradient-to-r from-[#915201] to-[#D27700] dark:bg-gray-500 text-amber-50 text-center">
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
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                className={`
            ${
              index % 2 === 0
                ? "bg-[#F5F5F5] dark:bg-gray-800/80"
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

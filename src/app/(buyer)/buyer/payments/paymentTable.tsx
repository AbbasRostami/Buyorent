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
} from "@heroui/react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  getPaginationRowModel,
  OnChangeFn,
  SortingState,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";

import Image from "next/image";
import { MdOutlinePayments } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { PiSealWarningBold } from "react-icons/pi";
export interface BookingData {
  id: number;
  title: string;
  date: string;
  trackingNumber: string;
  price: number;
  guests: "شارژ کیف پول" | "رزرو";
  status: "تایید شده" | "تایید نشده";
  image: string;
}

export default function PaymentTable({ data }: { data: BookingData[] }) {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

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
        cell: (info) => (
          <Image
            src={info.getValue() as string}
            alt="image"
            width={42}
            height={42}
            className="rounded-full"
          />
        ),
      },

      {
        accessorKey: "date",
        header: "تاریخ پرداخت",
        enableSorting: false,
      },
      {
        accessorKey: "trackingNumber",
        header: "شماره پیگیری",
        enableSorting: false,
      },
      {
        accessorKey: "price",
        header: " مبلغ",
        cell: (info) => `${(+info.getValue()).toLocaleString()} تومان`,
        enableSorting: true,
        sortingFn: (rowA, rowB, columnId) =>
          (rowA.getValue(columnId) as number) -
          (rowB.getValue(columnId) as number),
      },

      {
        accessorKey: "status",
        header: "وضعیت پرداخت",
        cell: (info) => {
          const value = info.getValue();

          return (
            <Chip
              color={value === "تایید نشده" ? "danger" : "success"}
              variant="flat"
              className="text-sm px-2 py-1 rounded-xl font-normal"
            >
              {value as string}
            </Chip>
          );
        },
        enableSorting: true,
      },
      {
        accessorKey: "guests",
        header: "نوع تراکنش",
        enableSorting: true,
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "actions",
        header: "مشاهده رسید",
        enableSorting: false,
        cell: (info) => {
          return (
            <Button variant="light" color="warning">
              <IoEyeSharp size={20} />
            </Button>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter, pagination },
    onSortingChange: setSorting as OnChangeFn<SortingState>,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    autoResetPageIndex: false,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2 pb-6 border-b-2 border-dashed border-amber-500">
        <div className="flex items-center gap-2">
          <MdOutlinePayments
            className="text-amber-900 dark:text-amber-200"
            size={30}
          />
          <span className="text-amber-500 text-xl font-bold  dark:text-amber-200 pb-3 border-b-4 border-amber-500 relative group transition-all duration-300 ease-in-out">
            لیست تراکنش های شما
          </span>
        </div>
        <input
          type="text"
          placeholder="نام اقامتگاه مورد نظر را جستجو کنید..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="w-1/3 p-2 rounded-md border-2 border-amber-500"
        />
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
            )}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col-reverse md:flex-row justify-end items-center gap-6 md:gap-2">
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
            setPagination({
              pageIndex: 0,
              pageSize: newSize,
            });
          }}
        >
          {[5, 10, 15].map((size) => (
            <SelectItem key={size}>{size}</SelectItem>
          ))}
        </Select>
        <Pagination
          dir="ltr"
          color="warning"
          isCompact
          showControls
          total={table.getPageCount()}
          page={table.getState().pagination.pageIndex + 1}
          onChange={(page) => table.setPageIndex(page - 1)}
        />
      </div>
    </div>
  );
}

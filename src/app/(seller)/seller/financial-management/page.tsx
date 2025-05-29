"use client";

import {
  Button,
  Chip,
  Pagination,
  Select,
  SelectItem,
  SharedSelection,
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
import {
  FaMoneyBillTransfer,
  FaMoneyBillTrendUp,
  FaMoneyBillWheat,
} from "react-icons/fa6";
import { PiSealWarningBold } from "react-icons/pi";
import { SiMoneygram } from "react-icons/si";

export interface BookingData {
  id: number;
  numbertransaction: string;
  date: string;
  price: number;
  type: "شارژ کیف پول" | "رزرو";
  status: "تایید شده" | "تایید نشده";
}

export default function FinancialManagementPage() {
  const [sorting, setSorting] = useState([]);
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
        size: 2,
      },
      {
        accessorKey: "date",
        header: "تاریخ رزرو",
        cell: (info) => info.getValue(),
        enableSorting: true,
      },
      {
        accessorKey: "numbertransaction",
        header: "شماره تراکنش",
        enableSorting: true,
        sortingFn: (rowA, rowB, columnId) =>
          (rowA.getValue(columnId) as number) -
          (rowB.getValue(columnId) as number),
      },
      {
        accessorKey: "price",
        header: "مبلغ",
        enableSorting: true,
        sortingFn: (rowA, rowB, columnId) =>
          (rowA.getValue(columnId) as number) -
          (rowB.getValue(columnId) as number),
      },
      {
        accessorKey: "status",
        header: "وضعیت",
        cell: (info) => {
          const value = info.getValue();
          return (
            <Chip
              color={
                value === "تایید شده"
                  ? "success"
                  : value === "تایید نشده"
                  ? "warning"
                  : "danger"
              }
              variant="shadow"
              className="text-sm px-2 py-1 rounded-xl font-normal"
            >
              {value as string}
            </Chip>
          );
        },
        filterFn: "includesString",
        enableSorting: true,
      },
      {
        accessorKey: "type",
        header: "نوع تراکنش",
        cell: (info) => {
          const value = info.getValue();
          return (
            <Chip
              color={
                value === "شارژ کیف پول"
                  ? "primary"
                  : value === "رزرو"
                  ? "danger"
                  : "warning"
              }
              variant="shadow"
              className="text-sm px-2 py-1 rounded-xl font-normal"
            >
              {value as string}
            </Chip>
          );
        },
        filterFn: "includesString",
        enableSorting: true,
      },

      {
        accessorKey: "actions",
        header: "عملیات",
        cell: (info) => {
          return (
            <Button
              variant="light"
              color="default"
              size="sm"
              className="text-gray-800 dark:text-amber-500"
            >
              مشاهده رسید
            </Button>
          );
        },
        enableSorting: false,
      },
    ],
    []
  );

  const data: BookingData[] = [
    {
      id: 1,
      numbertransaction: "1234567890",
      date: "1403/02/01/ 10:00",
      price: 150000000,
      status: "تایید شده",
      type: "شارژ کیف پول",
    },
    {
      id: 2,
      numbertransaction: "1234567890",
      date: "1403/02/01/ 10:00",
      price: 150000000,
      status: "تایید نشده",
      type: "رزرو",
    },
    {
      id: 3,
      numbertransaction: "1234567890",
      date: "1403/02/01/ 10:00",
      price: 160000000,
      status: "تایید نشده",
      type: "رزرو",
    },
    {
      id: 4,
      numbertransaction: "1234567890",
      date: "1403/02/01/ 10:00",
      price: 180000000,
      status: "تایید شده",
      type: "رزرو",
    },
    {
      id: 5,
      numbertransaction: "1234567890",
      date: "1403/02/01/ 10:00",
      price: 170000000,
      status: "تایید نشده",
      type: "رزرو",
    },
    {
      id: 6,
      numbertransaction: "1234567890",
      date: "1403/02/01/ 10:00",
      price: 170000000,
      status: "تایید نشده",
      type: "رزرو",
    },
    {
      id: 7,
      numbertransaction: "1234567890",
      date: "1403/02/01/ 10:00",
      price: 100000,
      status: "تایید شده",
      type: "شارژ کیف پول",
    },
    {
      id: 8,
      numbertransaction: "1234567890",
      date: "1403/02/01/ 10:00",
      price: 160000000,
      status: "تایید نشده",
      type: "رزرو",
    },
    {
      id: 9,
      numbertransaction: "1234567890",
      date: "1403/02/01/ 10:00",
      price: 190000000,
      status: "تایید شده",
      type: "شارژ کیف پول",
    },
    {
      id: 10,
      numbertransaction: "1234567890",
      date: "1403/02/01/ 10:00",
      price: 170000000,
      status: "تایید شده",
      type: "رزرو",
    },
    {
      id: 11,
      numbertransaction: "1234567890",
      date: "1403/02/01/ 10:00",
      price: 170000000,
      status: "تایید نشده",
      type: "شارژ کیف پول",
    },
    {
      id: 12,
      numbertransaction: "1234567890",
      date: "1403/02/01/ 10:00",
      price: 170000000,
      status: "تایید شده",
      type: "رزرو",
    },
    {
      id: 13,
      numbertransaction: "1234567890",
      date: "1403/02/01/ 10:00",
      price: 186600000,
      type: "رزرو",
      status: "تایید نشده",
    },
  ];

  const [statusFilter, setStatusFilter] = useState<string>("همه");
  const [typeFilter, setTypeFilter] = useState<string>("همه");

  const handleStatusFilterChange = (keys: SharedSelection) => {
    const selected = keys.currentKey as string;
    setStatusFilter(selected);

    if (selected === "همه") {
      table.getColumn("status")?.setFilterValue(undefined);
    } else {
      table.getColumn("status")?.setFilterValue(selected);
    }
  };

  const handleTypeFilterChange = (keys: SharedSelection) => {
    const selected = keys.currentKey as string;
    setTypeFilter(selected);

    if (selected === "همه") {
      table.getColumn("type")?.setFilterValue(undefined);
    } else {
      table.getColumn("type")?.setFilterValue(selected);
    }
  };

  const table = useReactTable({
    data,
    columns,
    state: { sorting, pagination },
    onSortingChange: setSorting as OnChangeFn<SortingState>,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: false,
  });

  return (
    <>
      <div className="   items-center grid grid-cols-1 sm:grid-cols-2   md:grid-cols-3 lg:grid-cols-4 gap-10   rounded-2xl">
        <div className="flex flex-col items-center justify-center gap-6 rounded-xl bg-gray-100 dark:bg-gray-800 px-9 py-6 shadow-xl">
          <p className="font-bold text-lg flex items-center gap-3">
            <SiMoneygram size={28} className="inline text-amber-600" />
            درآمد ماه جاری
          </p>
          <p className="w-full border-t-2 border-dashed border-gray-300 text-center pt-4 font-normal text-xl">
            115،000،000 تومان
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-6 rounded-xl bg-gray-100 dark:bg-gray-800 px-9 py-6 shadow-2xl">
          <p className="font-bold text-lg flex items-center gap-3">
            <FaMoneyBillWheat size={28} className="inline text-amber-600" />
            درآمد ماه قبل
          </p>
          <p className="w-full border-t-2 border-dashed border-gray-300 text-center pt-4 font-normal text-xl">
            115،000،000 تومان
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-6 rounded-xl bg-gray-100 dark:bg-gray-800 px-9 py-6 shadow-2xl">
          <p className="font-bold text-lg flex items-center gap-3">
            <FaMoneyBillTrendUp size={28} className="inline text-amber-600" />
            درآمد کل
          </p>
          <p className="w-full border-t-2 border-dashed border-gray-300 text-center pt-4 font-normal text-xl">
            115،000،000 تومان
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-6 rounded-xl bg-gray-100 dark:bg-gray-800 px-9 py-6 shadow-2xl">
          <p className="font-bold text-sm md:text-medium flex items-center gap-3">
            <FaMoneyBillTransfer size={28} className="inline text-amber-600" />
            موجودی قابل برداشت
          </p>
          <p className="w-full border-t-2 border-dashed border-gray-300 text-center pt-4 font-normal text-xl">
            115،000،000 تومان
          </p>
        </div>
      </div>

      <div className="space-y-4 bg-white/90 shadow-2xl dark:bg-gray-800 p-4 mt-8 rounded-2xl">
        <div className="flex items-center justify-between gap-2 pb-6 border-b-2 border-dashed border-amber-500">
          <div className="flex items-center gap-2 w-full">
            <FaMoneyBillTransfer
              className="text-amber-900 dark:text-amber-200"
              size={30}
            />
            <span className="text-amber-500 text-xl font-bold  dark:text-amber-200 pb-3 border-b-4 border-amber-500 relative group transition-all duration-300 ease-in-out">
              لیست تراکنش های مشتریان (25)
            </span>
          </div>
          <div className="flex items-center gap-2 w-full">
            <Select
              selectionMode="single"
              onSelectionChange={handleStatusFilterChange}
              selectedKeys={[statusFilter]}
              aria-label="Status Filter"
              disallowEmptySelection
              color="warning"
              variant="faded"
            >
              <SelectItem key="همه">همه</SelectItem>
              <SelectItem key="تایید شده">تایید شده</SelectItem>
              <SelectItem key="تایید نشده">تایید نشده</SelectItem>
            </Select>
            <Select
              selectionMode="single"
              onSelectionChange={handleTypeFilterChange}
              selectedKeys={[typeFilter]}
              aria-label="Type Filter"
              disallowEmptySelection
              color="warning"
              variant="faded"
            >
              <SelectItem key="همه">همه</SelectItem>
              <SelectItem key="شارژ کیف پول">شارژ کیف پول</SelectItem>
              <SelectItem key="رزرو">رزرو</SelectItem>
            </Select>
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
    </>
  );
}

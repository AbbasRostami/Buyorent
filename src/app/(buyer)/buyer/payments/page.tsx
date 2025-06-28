"use client";

import {
  Button,
  Chip,
  Pagination,
  SelectItem,
  Select,
  SharedSelection,
} from "@heroui/react";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";

import { MdOutlinePayments } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { PiSealWarningBold } from "react-icons/pi";
import { useCustomTable } from "@/utils/hooks/useCustomTable";
import { FaPrint, FaFilePdf } from "react-icons/fa";
import { FaFileExcel } from "react-icons/fa";
const data: any = [
  {
    id: 1,
    date: "1403/02/01/ 10:00",
    trackingNumber: "123456789123456",
    price: 150000000,
    guests: "رزرو",
    status: "تایید شده",
  },
  {
    id: 2,
    date: "1403/02/01/ 10:00",
    trackingNumber: "123456789123456",
    price: 150000000,
    guests: "شارژ کیف پول",
    status: "تایید نشده",
  },
  {
    id: 3,
    date: "1403/02/01/ 10:00",
    trackingNumber: "123456789123456",
    price: 160000000,
    guests: "شارژ کیف پول",
    status: "تایید نشده",
  },
  {
    id: 4,
    date: "1403/02/01/ 10:00",
    trackingNumber: "123456789123456",
    price: 180000000,
    guests: "رزرو",
    status: "تایید شده",
  },
  {
    id: 5,
    date: "1403/02/01/ 10:00",
    trackingNumber: "123456789123456",
    price: 170000000,
    guests: "شارژ کیف پول",
    status: "تایید نشده",
  },
  {
    id: 6,
    date: "1403/02/01/ 10:00",
    trackingNumber: "123456789123456",
    price: 170000000,
    guests: "شارژ کیف پول",
    status: "تایید شده",
  },
  {
    id: 7,
    date: "1403/02/01/ 10:00",
    trackingNumber: "123456789123456",
    price: 100000,
    guests: "شارژ کیف پول",
    status: "تایید نشده",
  },
  {
    id: 8,
    date: "1403/02/01/ 10:00",
    trackingNumber: "123456789123456",
    price: 160000000,
    guests: "رزرو",
    status: "تایید نشده",
  },
  {
    id: 9,
    date: "1403/02/01/ 10:00",
    trackingNumber: "123456789123456",
    price: 190000000,
    guests: "شارژ کیف پول",
    status: "تایید شده",
  },
  {
    id: 10,
    date: "1403/02/01/ 10:00",
    trackingNumber: "123456789123456",
    price: 170000000,
    guests: "رزرو",
    status: "تایید نشده",
  },
  {
    id: 11,
    date: "1403/02/01/ 10:00",
    trackingNumber: "123456789123456",
    price: 170000000,
    guests: "رزرو",
    status: "تایید نشده",
  },
  {
    id: 12,
    date: "1403/02/01/ 10:00",
    trackingNumber: "123456789123456",
    price: 170000000,
    guests: "شارژ کیف پول",
    status: "تایید نشده",
  },
  {
    id: 13,
    date: "1403/02/01/ 10:00",
    trackingNumber: "123456789123456",
    price: 186600000,
    guests: "رزرو",
    status: "تایید شده",
  },
];
export interface PaymentData {
  id: number;
  date: string;
  trackingNumber: string;
  price: number;
  status: "تایید شده" | "لغو شده";
  guests: string;
}

export default function PaymentManagement() {
  const columns = useMemo<ColumnDef<PaymentData>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ردیف",
        cell: (info) => info.row.original.id,
        sortingFn: (rowA, rowB) => rowA.original.id - rowB.original.id,
      },

      {
        accessorKey: "date",
        header: "تاریخ پرداخت",
        cell: (info) => {
          const value = info.getValue();
          return typeof value === "string" ? value : "";
        },
        enableSorting: false,
      },
      {
        accessorKey: "trackingNumber",
        header: "شماره پیگیری",
        enableSorting: false,
      },
      {
        accessorKey: "price",
        header: "مبلغ",
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
        accessorKey: "status",
        header: "وضعیت",
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
            <Button
              variant="light"
              color="warning"
              onPress={() => {
                console.log("info.row.original:", info.row.original.id);
              }}
            >
              <IoEyeSharp size={20} />
            </Button>
          );
        },
      },
    ],
    []
  );

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const { table, setPageSize, exportToExcel, exportToPDF, printTable } =
    useCustomTable<PaymentData>({
      data,
      columns,
      enableSorting: true,
      enableFiltering: true,
      enablePagination: true,
      manualPagination: true,
      pagination,
      onPaginationChange: setPagination,
    });

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
      table.getColumn("guests")?.setFilterValue(undefined);
    } else {
      table.getColumn("guests")?.setFilterValue(selected);
    }
  };

  return (
    <div className="space-y-4 bg-white/90 shadow-2xl dark:bg-gray-800 p-4 rounded-2xl">
      <div className="flex items-center justify-between gap-2 pb-6 border-b-2 border-dashed border-amber-500">
        <div className="flex items-center gap-2 ">
          <MdOutlinePayments
            className="text-amber-900 dark:text-amber-200"
            size={30}
          />
          <span className="text-amber-500 text-xl font-bold  dark:text-amber-200 pb-3 border-b-4 border-amber-500 relative group transition-all duration-300 ease-in-out">
            لیست تراکنش های شما
          </span>
        </div>
        <div className="flex items-center gap-2 w-1/3">
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
    </div>
  );
}

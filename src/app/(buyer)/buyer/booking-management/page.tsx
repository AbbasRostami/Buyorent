"use client";

import {
  Badge,
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Pagination,
  useDisclosure,
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
import { TiDeleteOutline } from "react-icons/ti";
import { PiWarningCircleBold } from "react-icons/pi";
import { GiWallet } from "react-icons/gi";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaPlusCircle } from "react-icons/fa";
import image from "./../../../../assets/Avatar1.png";
import image2 from "./../../../../assets/Avatar2.png";
import image3 from "./../../../../assets/Avatar3.png";
import Image from "next/image";
import ModalDetails from "./ModalDetails";

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

export default function BookingTable() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [sorting, setSorting] = useState([]);
  const [selectedRow, setSelectedRow] = useState<BookingData | null>(null);
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
        accessorKey: "title",
        header: "نام اقامتگاه",
        cell: (info) => info.getValue(),
        enableSorting: true,
      },
      {
        accessorKey: "date",
        header: "تاریخ رزرو",
        enableSorting: false,
      },
      {
        accessorKey: "price",
        header: "قیمت کل",
        cell: (info) => `${(+info.getValue()).toLocaleString()} تومان`,
        enableSorting: true,
        sortingFn: (rowA, rowB, columnId) =>
          (rowA.getValue(columnId) as number) -
          (rowB.getValue(columnId) as number),
      },
      {
        accessorKey: "guests",
        header: "تعداد مسافر",
        enableSorting: true,
        sortingFn: (rowA, rowB, columnId) =>
          (rowA.getValue(columnId) as number) -
          (rowB.getValue(columnId) as number),
      },
      {
        accessorKey: "status",
        header: "وضعیت رزرو",
        cell: (info) => {
          const value = info.getValue();
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
              {value as string}
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

          return (
            <Chip
              color={
                value === "تایید شده" ? "success" : "danger"
              }
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
                <DropdownItem color="success" key="payment">
                  <div className="flex items-center gap-2">
                    <GiWallet size={20} />
                    پرداخت
                  </div>
                </DropdownItem>
                <DropdownItem
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
                  key="delete"
                  className="text-danger"
                  color="danger"
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

  const data: BookingData[] = [
    {
      id: 1,
      title: "هتل سراوان",
      date: "1403/02/01/ 10:00",
      price: 150000000,
      guests: 88,
      status: "تایید شده",
      payment_status: "لغو شده",
      image: image.src,
    },
    {
      id: 2,
      title: "شیراز پارک",
      date: "1403/02/01/ 10:00",
      price: 150000000,
      guests: 70,
      status: "در انتظار",
      payment_status: "تایید شده",
      image: image2.src,
    },
    {
      id: 3,
      title: "تراول پارک",
      date: "1403/02/01/ 10:00",
      price: 160000000,
      guests: 53,
      status: "در انتظار",
      payment_status: "لغو شده",
      image: image3.src,
    },
    {
      id: 4,
      title: "میدان جمهریه",
      date: "1403/02/01/ 10:00",
      price: 180000000,
      guests: 10,
      status: "تایید شده",
      payment_status: "لغو شده",
      image: image2.src,
    },
    {
      id: 5,
      title: "ماهی پارک",
      date: "1403/02/01/ 10:00",
      price: 170000000,
      guests: 7,
      status: "در انتظار",
      payment_status: "تایید شده",
      image: image3.src,
    },
    {
      id: 6,
      title: "کوه سراوان",
      date: "1403/02/01/ 10:00",
      price: 170000000,
      guests: 38,
      status: "در انتظار",
      payment_status: "لغو شده",
      image: image2.src,
    },
    {
      id: 7,
      title: "ساحل سراوان",
      date: "1403/02/01/ 10:00",
      price: 100000,
      guests: 85,
      status: "در انتظار",
      payment_status: "تایید شده",
      image: image.src,
    },
    {
      id: 8,
      title: "ماهی پارک",
      date: "1403/02/01/ 10:00",
      price: 160000000,
      guests: 741,
      status: "در انتظار",
      payment_status: "تایید شده",
      image: image2.src,
    },
    {
      id: 9,
      title: "ماهی پارک",
      date: "1403/02/01/ 10:00",
      price: 190000000,
      guests: 52,
      status: "تایید شده",
      payment_status: "لغو شده",
      image: image3.src,
    },
    {
      id: 10,
      title: "نسرین پارک",
      date: "1403/02/01/ 10:00",
      price: 170000000,
      guests: 976,
      status: "در انتظار",
      payment_status: "تایید شده",
      image: image2.src,
    },
    {
      id: 11,
      title: "ماهی پارک",
      date: "1403/02/01/ 10:00",
      price: 170000000,
      guests: 52,
      status: "در انتظار",
      payment_status: "لغو شده",
      image: image.src,
    },
    {
      id: 12,
      title: "ساحل سراوان",
      date: "1403/02/01/ 10:00",
      price: 170000000,
      guests: 5,
      status: "در انتظار",
      payment_status: "تایید شده",
      image: image3.src,
    },
    {
      id: 13,
      title: "ماهی بهشهر",
      date: "1403/02/01/ 10:00",
      price: 186600000,
      guests: 48,
      status: "تایید شده",
      payment_status: "لغو شده",
      image: image2.src,
    },
  ];

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
          <FaPlusCircle
            className="text-amber-900 dark:text-amber-200"
            size={30}
          />
          <span className="text-amber-500 text-xl font-bold  dark:text-amber-200 pb-3 border-b-4 border-amber-500 relative group transition-all duration-300 ease-in-out">
            لیست رزرو های شما
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
            {table.getRowModel().rows.map((row, index) => (
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
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
      <ModalDetails
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        selectedRow={selectedRow as BookingData}
      />
    </div>
  );
}

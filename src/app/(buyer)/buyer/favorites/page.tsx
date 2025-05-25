"use client";

import {
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Pagination,
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
import { CgAdd } from "react-icons/cg";
import { TiDeleteOutline } from "react-icons/ti";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";
import image from "./../../../../assets/Avatar1.png";
import image2 from "./../../../../assets/Avatar2.png";
import image3 from "./../../../../assets/Avatar3.png";
import Image from "next/image";
interface BookingData {
  id: number;
  title: string;
  addres: string;
  price: number;
  image: string;
}

export default function FavoritesPage() {
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
        accessorKey: "title",
        header: "نام اقامتگاه",
        cell: (info) => info.getValue(),
        enableSorting: true,
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
            
                <DropdownItem color="success" key="details" textValue="رزرو">
                  <div className="flex items-center gap-2">
                    <CgAdd  size={20} />
                    رزرو
                  </div>
                </DropdownItem>
                <DropdownItem
                  textValue="حذف"
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
          <FaHeart
            className="text-amber-900 dark:text-amber-200"
            size={30}
          />
          <span className="text-amber-500 text-xl font-bold  dark:text-amber-200 pb-3 border-b-4 border-amber-500 relative group transition-all duration-300 ease-in-out">
            لیست رزرو های ذخیره شده
          </span>
        </div>
        <input
          type="text"
          placeholder="نام هتل مورد نظر را جستجو کنید..."
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
    </div>
  );
}

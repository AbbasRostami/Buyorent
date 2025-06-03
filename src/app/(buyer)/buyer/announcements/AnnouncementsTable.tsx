"use client";

import { Button, Pagination, Select, SelectItem } from "@heroui/react";
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
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { CgCheck } from "react-icons/cg";
import { BsArrowUp } from "react-icons/bs";
import { BsArrowDown } from "react-icons/bs";
import { MdNotificationsActive } from "react-icons/md";
import { PiSealWarningBold } from "react-icons/pi";
import { Announcement } from "./page";

const filterOptions = [
  { key: "all", label: "همه" },
  { key: "read", label: "خوانده شده" },
  { key: "unread", label: "خوانده نشده" },
];

export default function AnnouncementsTable({
  data,
  setData,
}: {
  data: Announcement[];
  setData: Dispatch<SetStateAction<Announcement[]>>;
}) {
  const [filter, setFilter] = useState("all");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 4;

  const filteredData = data?.filter((item) => {
    if (filter === "all") return true;
    if (filter === "read") return item.isRead;
    if (filter === "unread") return !item.isRead;
    return true;
  });
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const columns = useMemo<ColumnDef<Announcement>[]>(
    () => [
      {
        accessorKey: "id",
        header: () => <span>ردیف</span>,
        cell: (info) => <span>{info.getValue() as string}</span>,
      },
      {
        accessorKey: "title",
        header: () => <span>اعلان</span>,
        cell: (info) => (
          <span className="text-right block">{info.getValue() as string}</span>
        ),
      },
      {
        accessorKey: "date",
        header: () => <span>تاریخ</span>,
        cell: (info) => <span>{info.getValue() as string}</span>,
      },
      {
        id: "actions",
        header: () => <span></span>,
        cell: ({ row }) =>
          row.original.isRead ? (
            <Button
              className="flex items-center gap-2 bg-green-200 text-green-900 hover:bg-green-300"
              color="success"
              size="sm"
              onPress={() => handleMarkAsUnread(row.original.id)}
            >
              <CgCheck size={18} /> علامت گذاری به عنوان خوانده نشده
            </Button>
          ) : (
            <Button
              className="flex items-center gap-2 bg-lime-400 text-black hover:bg-lime-500"
              color="warning"
              size="sm"
              onPress={() => handleMarkAsRead(row.original.id)}
            >
              <CgCheck size={18} /> علامت گذاری به عنوان خوانده شده
            </Button>
          ),
      },
    ],
    [data]
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting as OnChangeFn<SortingState>,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(filteredData.length / ITEMS_PER_PAGE),
  });

  function handleMarkAsRead(id: number) {
    Swal.fire({
      title:
        "آیا مطمئن هستید که می‌خواهید این اعلان را به عنوان خوانده شده علامت بزنید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله، علامت بزن",
      cancelButtonText: "انصراف",
      confirmButtonColor: "#43d854",
      cancelButtonColor: "#aaa",
      customClass: {
        popup: "rounded-2xl shadow-lg dark:bg-gray-800",
        title:
          "text-medium font-medium leading-none text-gray-800 dark:text-white",
        htmlContainer: "text-sm text-gray-600 dark:text-gray-300",
        cancelButton:
          "bg-color2/20 hover:bg-color3 text-black dark:text-white px-4 py-2 rounded-md ml-2",
        confirmButton: "bg-color1 text-white px-4 py-2 ml-2 rounded-md",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, isRead: true } : item
          )
        );
      }
    });
  }

  function handleMarkAsUnread(id: number) {
    setData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isRead: false } : item))
    );
  }

  function handleMarkAllAsRead() {
    Swal.fire({
      title:
        "آیا مطمئن هستید که می‌خواهید همه اعلان‌ها را به عنوان خوانده شده علامت بزنید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله، علامت بزن",
      cancelButtonText: "انصراف",
      confirmButtonColor: "#43d854",
      cancelButtonColor: "#aaa",
      customClass: {
        popup: "rounded-2xl shadow-lg dark:bg-gray-800",
        title:
          "text-medium font-medium leading-none text-gray-800 dark:text-white",
        htmlContainer: "text-sm text-gray-600 dark:text-gray-300",
        cancelButton:
          "bg-color2/20 hover:bg-color3 text-black dark:text-white px-4 py-2 rounded-md ml-2",
        confirmButton: "bg-color1 text-white px-4 py-2 ml-2 rounded-md",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prev) => prev.map((item) => ({ ...item, isRead: true })));
      }
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 pb-6 border-b-2 border-dashed border-amber-500">
        <div className="flex items-center gap-2">
          <MdNotificationsActive
            className="text-amber-900 dark:text-amber-200 "
            size={30}
          />
          <span className="text-amber-500 text-xl font-bold  dark:text-amber-200 pb-3 border-b-4 border-amber-500 relative group transition-all duration-300 ease-in-out">
            لیست اعلان های شما
          </span>
        </div>
        <div className="flex flex-col md:flex-row mt-4 gap-2 items-center w-1/2 justify-end">
          <Button
            className=" text-black rounded-md"
            color="warning"
            onPress={handleMarkAllAsRead}
          >
            علامت گذاری به عنوان خوانده شده
          </Button>
          <Select
            className="max-w-45 mr-4 rounded-md"
            items={filterOptions}
            label=""
            placeholder="همه"
            selectedKeys={[filter]}
            onSelectionChange={(keys) => {
              const val = Array.from(keys)[0] as string;
              setFilter(val);
              setPage(1);
            }}
            aria-label="Filter"
          >
            {(item) => <SelectItem>{item.label}</SelectItem>}
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gradient-to-l from-[#915201] to-[#D27700] text-amber-50 dark:bg-gray-500 text-center">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="p-4 font-bold cursor-pointer text-center select-none"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted() === "asc" && (
                      <BsArrowUp size={18} className="inline w-4 h-4 ml-1" />
                    )}
                    {header.column.getIsSorted() === "desc" && (
                      <BsArrowDown size={18} className="inline w-4 h-4 ml-1" />
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
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
              table.getRowModel().rows.map((row, idx) => (
                <tr
                  key={row.id}
                  className={`${
                    row.original.isRead
                      ? "bg-[#eaffd0] dark:bg-gray-700"
                      : "bg-white dark:bg-gray-800"
                  } hover:bg-amber-100/70 dark:hover:bg-gray-600 transition-colors duration-200 text-center`}
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

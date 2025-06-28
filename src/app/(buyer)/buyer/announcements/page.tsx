"use client";

import { Button, Pagination, Select, SelectItem } from "@heroui/react";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { CgCheck } from "react-icons/cg";
import { BsArrowUp } from "react-icons/bs";
import { BsArrowDown } from "react-icons/bs";
import { MdNotificationsActive } from "react-icons/md";
import { PiSealWarningBold } from "react-icons/pi";
import { confirm } from "@/components/common/ConfirmModal";
import { FaPrint } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa";
import { FaFileExcel } from "react-icons/fa";
import { useCustomTable } from "@/utils/hooks/useCustomTable";

const filterOptions = [
  { key: "all", label: "همه" },
  { key: "read", label: "خوانده شده" },
  { key: "unread", label: "خوانده نشده" },
];
export interface Announcement {
  id: number;
  title: string;
  date: string;
  isRead: boolean;
}

const initialData: Announcement[] = [
  {
    id: 1,
    title: "فروشنده امیر محمد ملایی یک خانه برای رزرو آگهی کرده است",
    date: "12 مرداد / 1401 – 13:33",
    isRead: false,
  },
  {
    id: 2,
    title: "به سایت دلتـا خوش آمدید",
    date: "04 مرداد / 1401 – 13:33",
    isRead: false,
  },
  {
    id: 3,
    title: "فروشنده امیر محمد ملایی یک خانه برای رزرو آگهی کرده است",
    date: "08 مرداد / 1401 – 13:33",
    isRead: true,
  },
  {
    id: 4,
    title: "به سایت دلتـا خوش آمدید",
    date: "07 مرداد / 1401 – 13:33",
    isRead: true,
  },
  {
    id: 5,
    title: "فروشنده امیر محمد ملایی یک خانه برای رزرو آگهی کرده است",
    date: "10 مرداد / 1401 – 13:33",
    isRead: false,
  },
  {
    id: 6,
    title: "به سایت دلتـا خوش آمدید",
    date: "22 مرداد / 1401 – 13:33",
    isRead: true,
  },
  {
    id: 7,
    title: "فروشنده امیر محمد ملایی یک خانه برای رزرو آگهی کرده است",
    date: "30 مرداد / 1401 – 13:33",
    isRead: false,
  },
  {
    id: 8,
    title: "به سایت دلتـا خوش آمدید",
    date: "13 مرداد / 1401 – 13:33",
    isRead: true,
  },
  {
    id: 9,
    title: "فروشنده امیر محمد ملایی یک خانه برای رزرو آگهی کرده است",
    date: "28 مرداد / 1401 – 13:33",
    isRead: false,
  },
  {
    id: 10,
    title: "به سایت دلتـا خوش آمدید",
    date: "19 مرداد / 1401 – 13:33",
    isRead: true,
  },
];

export default function AnnouncementsManagementBuyer() {
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);

  const [data, setData] = useState<Announcement[]>(initialData);
  const filteredData = data?.filter((item) => {
    if (filter === "all") return true;
    if (filter === "read") return item.isRead;
    if (filter === "unread") return !item.isRead;
    return true;
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
    []
  );

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const { table, exportToExcel, exportToPDF, printTable } =
    useCustomTable<Announcement>({
      data,
      columns,
      enableSorting: true,
      enableFiltering: true,
      enablePagination: true,
      manualPagination: true,
      pagination,
      onPaginationChange: setPagination,
    });

  async function handleMarkAsRead(id: number) {
    const isConfirmed = await confirm({
      title: "آیا از علامت گذاری این اعلان به عنوان خوانده شده مطمئن هستید؟",
      description: "این اعلان دیگر به عنوان خوانده نشده نمایش داده نخواهد شد.",
      confirmText: "تایید",
      cancelText: "لغو",
    });

    if (isConfirmed) {
      setData((prev) =>
        prev.map((item) => (item.id === id ? { ...item, isRead: true } : item))
      );
    }
  }

  function handleMarkAsUnread(id: number) {
    setData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isRead: false } : item))
    );
  }

  async function handleMarkAllAsRead() {
    const isConfirmed = await confirm({
      title: "آیا از علامت گذاری همه اعلان‌ها به عنوان خوانده شده مطمئن هستید؟",
      description: "آیا مطمئن هستید؟",
      confirmText: "تایید",
      cancelText: "انصراف",
    });

    if (isConfirmed) {
      setData((prev) => prev.map((item) => ({ ...item, isRead: true })));
    }
  }

  return (
    <div className="space-y-4 bg-white/90 shadow-2xl dark:bg-gray-800 p-4 rounded-2xl">
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

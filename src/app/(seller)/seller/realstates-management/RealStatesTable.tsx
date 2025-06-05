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
import { FaRegCircleCheck, FaUsersGear } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";
import { LuCirclePlus } from "react-icons/lu";
import { RiEdit2Fill } from "react-icons/ri";
import { TiDeleteOutline } from "react-icons/ti";
import {
  FaInfoCircle,
  FaMapMarkerAlt,
  FaList,
  FaImage,
  FaCheckCircle,
} from "react-icons/fa";
import Step2Address from "./steps/Step2Address";
import Step3Facilities from "./steps/Step3Facilities";
import Step4Images from "./steps/Step4Images";
import Step5Confirm from "./steps/Step5Confirm";
import Step1BasicInfo from "./steps/Step1BasicInfo";
import AddEstateStepper from "./steps/AddEstateStepper";
import { MdOutlineBuildCircle } from "react-icons/md";
import {
  PiArrowBendDoubleUpRightBold,
  PiSealWarningBold,
} from "react-icons/pi";
import { confirm, ConfirmModal } from "@/components/common/ConfirmModal";
import RealStatesFilter from "./RealStatesFilter";
export interface BookingDataRealState {
  id: number;
  title: string;
  date: string;
  trackingNumber: string;
  price: number;
  status: "فعال" | "غیرفعال" | "در انتظار";
  image: string;
  score: number;
  views: number;
  reserve: number;
}

export const stepsConfig = [
  { title: "مشخصات اولیه", icon: <FaInfoCircle />, component: Step1BasicInfo },
  { title: "آدرس", icon: <FaMapMarkerAlt />, component: Step2Address },
  { title: "امکانات", icon: <FaList />, component: Step3Facilities },
  { title: "تصاویر ملک", icon: <FaImage />, component: Step4Images },
  { title: "تایید نهایی", icon: <FaCheckCircle />, component: Step5Confirm },
];

export default function RealStatesTable({ data }: any) {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const columns = useMemo<ColumnDef<BookingDataRealState>[]>(
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
            src={String(info.getValue())}
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
      },
      {
        accessorKey: "price",
        header: " مبلغ",
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
        accessorKey: "score",
        header: "امتیاز",
        enableSorting: true,
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "views",
        header: "بازدیدها",
        enableSorting: true,
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "reserve",
        header: "رزروها",
        enableSorting: true,
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "status",
        header: "وضعیت",
        cell: (info) => {
          const value = String(info.getValue());
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
        enableSorting: false,
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
                    <FaRegCircleCheck size={20} />
                    فعال کردن
                  </div>
                </DropdownItem>

                <DropdownItem color="primary" key="details">
                  <div className="flex items-center gap-2">
                    <RiEdit2Fill size={20} />
                    ویرایش
                  </div>
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  onPress={async () => {
                    const isConfirmed = await confirm({
                      title: "آیا از حذف ملک مطمئن هستید؟",
                      description: "امکان بازگشت پس از حذف وجود ندارد!",
                      confirmText: "حذف",
                      cancelText: "انصراف",
                    });
                    if (isConfirmed) {
                      console.log("حذف شد");
                    }
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

  const [showStepper, setShowStepper] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="space-y-4 bg-white/90 shadow-2xl dark:bg-gray-800 p-4 rounded-2xl">
      {showStepper ? (
        <div className="w-full gap-2 ">
          <div className="flex items-center mb-4 pb-2 justify-between border-b-2 border-dashed border-amber-500">
            <div className="flex items-center gap-2">
              <MdOutlineBuildCircle
                className="text-amber-900 dark:text-amber-400"
                size={34}
              />
              <span className="text-amber-700 text-sm md:text-xl font-bold  dark:text-amber-200  relative group transition-all duration-300 ease-in-out">
                ساخت آگهی ملک جدید
              </span>
            </div>
            <Button
              variant="light"
              color="primary"
              className="font-normal text-medium"
              onPress={() => setShowStepper(false)}
            >
              <PiArrowBendDoubleUpRightBold size={20} />
              لیست املاک من
            </Button>
          </div>

          <AddEstateStepper
            steps={stepsConfig}
            onClose={() => setShowStepper(false)}
          />
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 pb-6 border-b-2 border-dashed border-amber-500">
            <div className="flex items-center gap-2  w-full md:w-1/3">
              <FaUsersGear
                className="text-amber-900 dark:text-amber-200"
                size={30}
              />
              <span className="text-amber-500 text-xl font-bold  dark:text-amber-200 pb-3 border-b-4 border-amber-500 relative group transition-all duration-300 ease-in-out">
                لیست املاک من
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
              <RealStatesFilter
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
          <div className="flex justify-between items-center flex-col-reverse md:flex-row gap-6 md:gap-2">
            <div className="flex items-center gap-2 ">
              <Button
                color="warning"
                variant="shadow"
                className="p-5 transition-all duration-300 delay-100 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-amber-500 "
                onPress={() => setShowStepper(true)}
              >
                <LuCirclePlus size={20} />
                افزودن ملک
              </Button>
            </div>
            <div className="flex  justify-center items-center gap-4 md:gap-2">
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
      )}
    </div>
  );
}

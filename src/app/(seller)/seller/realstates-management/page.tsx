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
  Skeleton,
} from "@heroui/react";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { useHouse } from "@/services/Houses/getHouse";
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
  FaPrint,
  FaFilePdf,
  FaFileExcel,
} from "react-icons/fa";
import Step1BasicInfo from "./Steps/Step1BasicInfo";
import Step2Address from "./Steps/Step2Address";
import Step3Facilities from "./Steps/Step3Facilities";
import Step4Images from "./Steps/Step4Images";
import Step5Confirm from "./Steps/Step5Confirm";
import AddEstateStepper from "./Steps/AddEstateStepper";
import RealStatesFilter from "./Filter/RealStatesFilter";
import { MdOutlineBuildCircle } from "react-icons/md";
import {
  PiArrowBendDoubleUpRightBold,
  PiSealWarningBold,
} from "react-icons/pi";
import { confirm } from "@/components/common/ConfirmModal";
import { useCustomTable } from "@/utils/hooks/useCustomTable";
export interface RealStateData {
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
  isActive: boolean;
  isDeleted: boolean;
  photos: string[];
}

export const stepsConfig = [
  { title: "مشخصات اولیه", icon: <FaInfoCircle />, component: Step1BasicInfo },
  { title: "آدرس", icon: <FaMapMarkerAlt />, component: Step2Address },
  { title: "امکانات", icon: <FaList />, component: Step3Facilities },
  { title: "تصاویر ملک", icon: <FaImage />, component: Step4Images },
  { title: "تایید نهایی", icon: <FaCheckCircle />, component: Step5Confirm },
];

export default function RealStatesTable() {
  const columns = useMemo<ColumnDef<RealStateData>[]>(
    () => [
      {
        accessorKey: "rowIndex",
        header: "ردیف",
        cell: (info) => info.row.index + 1,
        enableSorting: true,
        sortingFn: (rowA, rowB) => rowA.original.id - rowB.original.id,
      },
      {
        accessorKey: "photos",
        header: "تصویر",
        cell: (info) => (
          <Image
            src={info.row.original.photos[0]}
            alt={info.row.original.title}
            width={42}
            height={42}
            unoptimized
            loading="lazy"
            className=" w-10 h-10 rounded-full"
          />
        ),
      },
      {
        accessorKey: "title",
        header: "نام اقامتگاه",
        cell: (info) => (
          <span className=" font-bold">{info.getValue() as string}</span>
        ),
        filterFn: "includesString",
      },
      {
        accessorKey: "price",
        header: " مبلغ",
        cell: (info) => {
          const value = info.getValue();
          const numValue = typeof value === "number" ? value : Number(value);
          return (
            <span className=" font-bold">
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
        accessorKey: "rate",
        header: "امتیاز",
        enableSorting: true,
        cell: (info) => {
          const value = info.getValue();
          return (
            <span className="font-bold">
              {value != null ? (value as number) : "بدون امتیاز"}
            </span>
          );
        },
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
                <DropdownItem
                  textValue="فعال کردن"
                  color="success"
                  key="payment"
                  onPress={() => {
                    console.log("Active:", info.row.original.id);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <FaRegCircleCheck size={20} />
                    فعال کردن
                  </div>
                </DropdownItem>

                <DropdownItem
                  textValue="ویرایش"
                  color="primary"
                  key="details"
                  onPress={() => {
                    console.log("Edit:", info.row.original.id);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <RiEdit2Fill size={20} />
                    ویرایش
                  </div>
                </DropdownItem>
                <DropdownItem
                  textValue="حذف"
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
                      console.log("Delete:", info.row.original.id);
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
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const { data: realStateData, isLoading } = useHouse(
    pagination.pageIndex + 1,
    pagination.pageSize
  );
  console.log("realStateData", realStateData);
  const { table, computedPageCount, exportToExcel, exportToPDF, printTable } =
    useCustomTable<RealStateData>({
      data: realStateData ?? [],
      columns,
      enableSorting: true,
      enableFiltering: true,
      enablePagination: true,
      manualPagination: true,
      pagination,
      onPaginationChange: setPagination,
    });

  const [showStepper, setShowStepper] = useState(false);
  const [realStateSearch, setRealStateSearch] = useState("");
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
                value={realStateSearch}
                onChange={(e) => {
                  const value = e.target.value;
                  setRealStateSearch(value);
                  table.getColumn("title")?.setFilterValue(value);
                }}
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
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}>
                      {Array.from({ length: columns.length }).map((_, j) => (
                        <td key={j} className="p-2">
                          <Skeleton
                            classNames={{
                              base: "animate-pulse bg-gray-200 dark:bg-gray-700",
                            }}
                            className="h-10 w-full rounded-lg"
                          />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : table.getRowModel().rows.length === 0 ? (
                  <tr>
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
                          هیچ کامنتی با مشخصات جستجو شده یافت نشد
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  table.getRowModel().rows.map((row, index) => (
                    <tr
                      key={row.id}
                      className={`${
                        index % 2 === 0
                          ? "bg-[#ebebe9] dark:bg-gray-800/80"
                          : "bg-[#F8F8F8] dark:bg-gray-700/80"
                      } hover:bg-amber-100/70 dark:hover:bg-gray-600 transition-colors duration-200 text-center`}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="p-3 text-gray-700 dark:text-gray-300 text-center align-middle   whitespace-nowrap"
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
          <div className="w-full flex flex-col-reverse md:flex-row justify-between items-center gap-5 md:gap-2">
            <div className="w-full flex flex-col sm:flex-row items-start gap-2">
              <Button
                color="warning"
                variant="shadow"
                className="p-5 transition-all duration-300 delay-100 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-amber-500 "
                onPress={() => setShowStepper(true)}
              >
                <LuCirclePlus size={20} />
                افزودن ملک
              </Button>
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
                total={computedPageCount ?? 0}
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
        </>
      )}
    </div>
  );
}

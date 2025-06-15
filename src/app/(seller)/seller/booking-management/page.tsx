"use client";

import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Pagination,
  Select,
  SelectItem,
  Skeleton,
  useDisclosure,
} from "@heroui/react";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { TiDeleteOutline } from "react-icons/ti";
import { PiSealWarningBold, PiWarningCircleBold } from "react-icons/pi";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaPrint, FaFilePdf, FaFileExcel, FaUsers } from "react-icons/fa";

import { SlBan } from "react-icons/sl";
import { GiConfirmed } from "react-icons/gi";
import BookingSellerFilter from "./components/Filter/BookingFilter";
import ModalDetails from "./components/Details/ModalDetails";
import { useCustomTable } from "@/utils/hooks/useCustomTable";
import { useGet, useDelete } from "@/utils/hooks/useReactQueryHooks";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { confirm } from "@/components/common/ConfirmModal";
export interface BookingDataSeller {
  id: number;
  title: string;
  bioPerson: string;
  date: string;
  price: number;
  passengers: string;
  status: "pending" | "canceled" | "لغو شده";
  payment_status: "تایید شده" | "لغو شده";
  image: string;
  totalCount: number;
}
export interface ReservedDate {
  value: string; 
  inclusive: boolean;
}

export interface TravelerDetail {
  birthDate: string;
  firstName: string;
  lastName: string;
  gender: "male" | "female";
  nationalId: string;
}

export interface BookingDataSeller {
  id: number;
  user_id: number;
  houseId: number;
  sharedEmail: string;
  sharedMobile: string;
  status: "pending" | "canceled" | "لغو شده";
  createdAt: string;
  updatedAt: string;
  reservedDates: ReservedDate[];
  traveler_details: TravelerDetail[];
}
export interface BookingSellerResponse {
  data: BookingDataSeller[];
  totalCount: number;
}

export default function BookingTable() {
  const {
    isOpen: isOpenFilter,
    onOpen: onOpenFilter,
    onOpenChange: onOpenChangeFilter,
  } = useDisclosure();
  const {
    isOpen: isOpen,
    onOpen: onOpen,
    onOpenChange: onOpenChange,
  } = useDisclosure();
  const [selectedRow, setSelectedRow] = useState<BookingDataSeller | null>(
    null
  );
  const { data: session } = useSession();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const { data: bookingSeller, isLoading } = useGet<{
    data: BookingSellerResponse;
    totalCount: number;
  }>(
    "/bookings",
    {
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
      sort: "created_at",
      order: "DESC",
      user_id: session?.id,
    },
    {
      queryKey: [
        "bookingSeller",
        {
          page: pagination.pageIndex + 1,
          limit: pagination.pageSize,
          sort: "created_at",
          order: "DESC",
          user_id: session?.id,
        },
      ],
      enabled: !!session?.id,
    }
  );

  console.log("bookingSeller:", bookingSeller);
  const queryClient = useQueryClient();

  const { mutate: deleteBooking } = useDelete(
    (id: number) => `/bookings/${id}`,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["bookingSeller"] });
        toast.success("ایتم انتخابی با موفقیت حذف شد");
      },
      onError: () => {
        toast.error("خطا در حذف رزرو");
      },
    }
  );
  const columns = useMemo<ColumnDef<BookingDataSeller>[]>(
    () => [
      {
        accessorKey: "rowIndex",
        header: "ردیف",
        cell: (info) => info.row.index + 1,
        enableSorting: true,
      },

      {
        accessorKey: "title",
        header: "نام ملک",
        cell: (info) => info.getValue(),
        enableSorting: true,
        filterFn: "includesString",
      },
      {
        accessorKey: "bioPerson",
        header: "اطلاعات مسافر",
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
        header: "وضعیت رزرو",
        cell: (info) => {
          const value = info.getValue();
          return (
            <Chip
              color={
                value === "canceled"
                  ? "success"
                  : value === "pending"
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
        enableSorting: true,
      },
      {
        accessorKey: "payment_status",
        header: "وضعیت پرداخت",
        cell: (info) => {
          const value = info.getValue();

          return (
            <Chip
              color={value === "تایید شده" ? "success" : "danger"}
              variant="shadow"
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
                <DropdownItem
                  textValue="تایید رزرو"
                  color="success"
                  key="success"
                  onPress={() => {
                    console.log("info.row.original:", info.row.original.id);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <GiConfirmed size={20} />
                    تایید رزرو
                  </div>
                </DropdownItem>
                <DropdownItem
                  textValue="لغو رزرو"
                  color="danger"
                  key="danger"
                  onPress={() => {
                    console.log("info.row.original:", info.row.original.id);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <SlBan size={20} />
                    لغو رزرو
                  </div>
                </DropdownItem>
                <DropdownItem
                  textValue="جزئیات"
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
                  textValue="حذف"
                  key="delete"
                  className="text-danger"
                  color="danger"
                  onPress={async () => {
                    const isConfirmed = await confirm({
                      title: "حذف رزرو",
                      description:
                        "آیا مطمئن هستید که می‌خواهید این رزرو را حذف کنید؟",
                      confirmText: "حذف",
                      cancelText: "انصراف",
                    });

                    if (isConfirmed) {
                      deleteBooking(info.row.original.id);
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
        enableSorting: false,
      },
    ],
    []
  );

  const { table, exportToExcel, exportToPDF, printTable, computedPageCount } =
    useCustomTable<BookingDataSeller>({
      data: bookingSeller?.data || [],
      columns,
      manualPagination: true,
      enablePagination: true,
      pagination,
      totalCount: bookingSeller?.totalCount,
      onPaginationChange: setPagination,
    });
  const [bookingSearch, setBookingSearch] = useState("");

  return (
    <div className="space-y-4 bg-white/90 shadow-2xl dark:bg-gray-800 p-4 rounded-2xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 pb-6 border-b-2 border-dashed border-amber-500">
        <div className="flex items-center gap-2  w-full md:w-1/3">
          <FaUsers className="text-amber-900 dark:text-amber-200" size={30} />
          <span className="text-amber-500 text-xl font-bold  dark:text-amber-200 pb-3 border-b-4 border-amber-500 relative group transition-all duration-300 ease-in-out">
            لیست رزرو های مشتریان
          </span>
        </div>
        <div className="flex flex-col md:flex-row justify-end items-center mt-4 md:mt-0 gap-2 w-full md:w-1/3">
          <input
            type="text"
            value={bookingSearch}
            onChange={(e) => {
              const value = e.target.value;
              setBookingSearch(value);
              table.getColumn("title")?.setFilterValue(value);
            }}
            placeholder="نام هتل مورد نظر را جستجو کنید..."
            className=" p-2 rounded-md border-2 border-amber-500 w-full md:w-2/3"
          />
          <BookingSellerFilter
            isOpenFilter={isOpenFilter}
            onOpenFilter={onOpenFilter}
            onOpenChangeFilter={onOpenChangeFilter}
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
            total={computedPageCount ?? 1}
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
      <ModalDetails
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        selectedRow={selectedRow as unknown as BookingDataSeller}
      />
    </div>
  );
}

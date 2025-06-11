"use client";

import { useCustomTable } from "@/utils/hooks/useCustomTable";
import {
  Button,
  Chip,
  DropdownItem,
  DropdownMenu,
  Dropdown,
  DropdownTrigger,
  Pagination,
  Select,
  SelectItem,
  SharedSelection,
  useDisclosure,
} from "@heroui/react";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { FaFileExcel, FaFilePdf } from "react-icons/fa";
import { FaMoneyBillTransfer, FaPrint } from "react-icons/fa6";
import { PiSealWarningBold, PiWarningCircleBold } from "react-icons/pi";
import { TiDeleteOutline } from "react-icons/ti";

import { HiDotsHorizontal } from "react-icons/hi";
import { FilterComment } from "../Filter/FilterComment";

export interface CommentsData {
  id: number;
  numbertransaction: string;
  date: string;
  comment: string;
  status: "تایید شده" | "تایید نشده";
}

export default function CommentsTable({
  commentsData,
}: {
  commentsData: CommentsData[];
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const columns = useMemo<ColumnDef<CommentsData>[]>(
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
        header: "تاریخ کامنت",
        cell: (info) => info.getValue(),
        enableSorting: true,
      },
      {
        accessorKey: "numbertransaction",
        header: "شماره کامنت",
        enableSorting: true,
        sortingFn: (rowA, rowB, columnId) =>
          (rowA.getValue(columnId) as number) -
          (rowB.getValue(columnId) as number),
      },
      {
        accessorKey: "comment",
        header: "کامنت",
        cell: (info) => info.getValue(),
        enableSorting: true,
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
            <>
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="light">
                    <HiDotsHorizontal size={20} />
                  </Button>
                </DropdownTrigger>

                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem
                    textValue="ویرایش"
                    color="primary"
                    key="details"
                    onPress={() => {
                      onOpen();
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <PiWarningCircleBold size={20} />
                      ویرایش
                    </div>
                  </DropdownItem>
                  <DropdownItem
                    textValue="حذف"
                    key="delete"
                    className="text-danger"
                    color="danger"
                    onPress={() => {
                      console.log(info.row.original.id);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <TiDeleteOutline size={20} />
                      حذف
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </>
          );
        },
        enableSorting: false,
      },
    ],
    []
  );

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

  const {
    table,
    pagination,
    setPageSize,
    exportToExcel,
    exportToPDF,
    printTable,
  } = useCustomTable<CommentsData>({
    data: commentsData,
    columns,
    enableSorting: true,
    enableFiltering: true,
    enablePagination: true,
    defaultPageSize: 5,
  });

  return (
    <>
      <div className="space-y-4 bg-white/90 shadow-2xl dark:bg-gray-800 p-4 rounded-2xl">
        <div className="flex items-center justify-between gap-2 pb-6 border-b-2 border-dashed border-amber-500">
          <div className="flex items-center gap-2 w-full">
            <FaMoneyBillTransfer
              className="text-amber-900 dark:text-amber-200"
              size={30}
            />
            <span className="text-amber-500 text-xl font-bold  dark:text-amber-200 pb-3 border-b-4 border-amber-500 relative group transition-all duration-300 ease-in-out">
              لیست کامنت ها
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
        <FilterComment isOpen={isOpen} onOpenChange={onOpenChange} />

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
              selectedKeys={[pagination.pageSize.toString()]}
              renderValue={(items) => {
                return `نمایش: ${items[0].key}`;
              }}
              onChange={(e) => {
                const newSize = Number(e.target.value);
                setPageSize(newSize);
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
              onChange={(page) =>
                table.setPagination((prev) => ({
                  ...prev,
                  pageIndex: page - 1,
                  pageSize: pagination.pageSize,
                }))
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}

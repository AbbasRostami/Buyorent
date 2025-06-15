"use client";

import { useCustomTable } from "@/utils/hooks/useCustomTable";
import {
  Button,
  DropdownItem,
  DropdownMenu,
  Dropdown,
  DropdownTrigger,
  Pagination,
  Select,
  SelectItem,
  useDisclosure,
  Skeleton,
} from "@heroui/react";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { FaFileExcel, FaFilePdf } from "react-icons/fa";
import { FaMoneyBillTransfer, FaPrint } from "react-icons/fa6";
import { PiSealWarningBold, PiWarningCircleBold } from "react-icons/pi";
import { TiDeleteOutline } from "react-icons/ti";
import { HiDotsHorizontal } from "react-icons/hi";
import { confirm } from "@/components/common/ConfirmModal";
import { useSession } from "next-auth/react";
import { FilterComment } from "./Filter/FilterComment";
import { useDeleteComment } from "@/services/Seller/comments-management/deleteComment";
import { useGetComment } from "@/services/Seller/comments-management/getComment";
import { Session } from "next-auth";
import { CommentsData } from "@/types/Seller/comments-management/CommentTypes";

export default function CommentsTable() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [commentSearch, setCommentSearch] = useState("");
  const [selectedCommentId, setSelectedCommentId] = useState<number>();
  const { data: session } = useSession();

  const columns = useMemo<ColumnDef<CommentsData>[]>(
    () => [
      {
        accessorKey: "rowIndex",
        header: "ردیف",
        cell: (info) => info.row.index + 1,
        enableSorting: true,
      },
      {
        accessorKey: "title",
        header: "کامنت",
        cell: (info) => {
          return (
            <div className="flex items-center gap-2">
              <span className="truncate max-w-[200px]">
                {info.getValue() as string}
              </span>
            </div>
          );
        },
        enableSorting: true,
        filterFn: "includesString",
      },
      {
        accessorKey: "caption",
        header: "توضیحات",
        cell: (info) => (
          <div className="flex items-center gap-2">
            <span className="truncate max-w-[200px]">
              {info.getValue() as string}
            </span>
          </div>
        ),
        enableSorting: true,
        filterFn: "includesString",
      },
      {
        accessorKey: "created_at",
        header: "تاریخ کامنت",
        cell: (info) => info.getValue() as string,
        enableSorting: true,
      },
      {
        accessorKey: "rating",
        header: "امتیاز",
        enableSorting: true,
        sortingFn: (rowA, rowB, columnId) =>
          (rowA.getValue(columnId) as number) -
          (rowB.getValue(columnId) as number),
      },
      {
        accessorKey: "id",
        header: "شماره کامنت",
        enableSorting: true,
        sortingFn: (rowA, rowB, columnId) =>
          (rowA.getValue(columnId) as number) -
          (rowB.getValue(columnId) as number),
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
                      setSelectedCommentId(info.row.original.id);
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
                    onPress={async () => {
                      const isConfirmed = await confirm({
                        title: "حذف کامنت",
                        description:
                          "آیا مطمئن هستید که می‌خواهید این کامنت را حذف کنید؟",
                        confirmText: "حذف",
                        cancelText: "انصراف",
                      });

                      if (isConfirmed) {
                        deleteComment.mutate(info.row.original.id);
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
            </>
          );
        },
        enableSorting: false,
      },
    ],
    []
  );

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const { comments, isLoading } = useGetComment(pagination, session as Session);
  const deleteComment = useDeleteComment();

  const { table, exportToExcel, exportToPDF, printTable, computedPageCount } =
    useCustomTable<CommentsData>({
      data: comments?.data || [],
      columns,
      manualPagination: true,
      enablePagination: true,
      pagination,
      totalCount: comments?.totalCount,
      onPaginationChange: setPagination,
    });

  return (
    <>
      <div className="space-y-4 bg-white/90 shadow-2xl dark:bg-gray-800 p-4 rounded-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 pb-6 border-b-2 border-dashed border-amber-500">
          <div className="flex items-center gap-2 w-full">
            <FaMoneyBillTransfer
              className="text-amber-900 dark:text-amber-200"
              size={30}
            />
            <span className="text-amber-500 text-xl font-bold  dark:text-amber-200 pb-3 border-b-4 border-amber-500 relative group transition-all duration-300 ease-in-out">
              لیست کامنت ها
            </span>
          </div>
          <input
            type="text"
            value={commentSearch}
            onChange={(e) => {
              const value = e.target.value;
              setCommentSearch(value);
              table.getColumn("ti")?.setFilterValue(value);
            }}
            placeholder="کامنت مورد نظر را جستجو کنید..."
            className="p-2 rounded-lg border-2 border-amber-500 w-full md:w-2/3"
          />
        </div>
        <FilterComment
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          commentId={selectedCommentId || 0}
          data={comments?.data || []}
        />

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
      </div>
    </>
  );
}

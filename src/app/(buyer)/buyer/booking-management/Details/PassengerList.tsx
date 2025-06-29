"use client";
import { Modal, ModalContent, ModalBody } from "@heroui/react";
import { IoMdClose } from "react-icons/io";
import { ColumnDef, flexRender, SortingState } from "@tanstack/react-table";
import { useState } from "react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { MdFamilyRestroom } from "react-icons/md";
import { PiSealWarningBold } from "react-icons/pi";
import { useCustomTable } from "@/utils/hooks/useCustomTable";
interface ModalReserveProps {
  isOpen: boolean;
  onOpenChange: () => void;
  selectedRow?: any;
}

interface ReservationData {
  id: number;
  name: string;
  nationalCode: string;
  gender: string;
  birthDate: string;
}

export default function ModalPassengerList({
  isOpen,
  onOpenChange,
  selectedRow,
}: ModalReserveProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const reservations: ReservationData[] = [
    {
      id: 1,
      name: "محمد حسین حسینی",
      nationalCode: "1837567890",
      gender: "مرد",
      birthDate: "1403/02/20",
    },
    {
      id: 2,
      name: "محمد عباسی",
      nationalCode: "1234567890",
      gender: "زن",
      birthDate: "1403/02/20",
    },
  ];

  const columns: ColumnDef<ReservationData>[] = [
    {
      accessorKey: "id",
      header: "ردیف",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "name",
      header: "نام و نام خانوادگی",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "nationalCode",
      header: "کد ملی",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "gender",
      header: "جنسیت",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "birthDate",
      header: "تاریخ تولد",
      cell: (info) => info.getValue(),
    },
  ];

                    
  const { table } = useCustomTable<ReservationData>({
    data: reservations,
    columns,
    enableSorting: true,
  });

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      size="4xl"
      hideCloseButton
    >
      <ModalContent>
        {(onClose) => (
          <div className="bg-[#F9F9F9] rounded-2xl p-6 dark:bg-gray-800">
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <h2 className="text-2xl font-black text-right flex items-center gap-2">
                <MdFamilyRestroom className="dark:text-amber-200" size={30} />
                لیست مسافران {selectedRow?.title}
              </h2>
              <button
                className="flex items-center gap-2 border border-red-400 text-red-500 rounded-full px-6 py-2 text-lg font-bold hover:bg-red-50 dark:hover:bg-red-500 dark:text-white transition"
                onClick={onClose}
              >
                بستن <IoMdClose size={24} />
              </button>
            </div>

            <ModalBody>
              <div className="overflow-x-auto rounded-xl">
                <table className="min-w-full table-auto text-sm">
                  <thead className="bg-amber-200/70 dark:bg-gray-500 text-center">
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
                              ? "bg-blue-50 dark:bg-gray-800/80"
                              : "bg-white dark:bg-gray-700/80"
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
            </ModalBody>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}

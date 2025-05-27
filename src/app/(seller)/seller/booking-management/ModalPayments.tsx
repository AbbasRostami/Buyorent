import { Modal, ModalContent, ModalBody } from "@heroui/react";
import { BookingData } from "./page";
import { IoMdClose } from "react-icons/io";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  SortingState,
} from "@tanstack/react-table";
import { useState } from "react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { MdPayment } from "react-icons/md";

interface ModalPaymentsProps {
  isOpen: boolean;
  onOpenChange: () => void;
  selectedRow?: BookingData;
}

interface PaymentData {
  id: number;
  date: string;
  amount: string;
  transactionId: string;
}

export default function ModalPayments({
  isOpen,
  onOpenChange,
}: ModalPaymentsProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const payments: PaymentData[] = [
    {
      id: 1,
      date: "1403/02/01",
      amount: "2,500,000",
      transactionId: "123456789123456",
    },
    {
      id: 2,
      date: "1403/02/15",
      amount: "1,500,000",
      transactionId: "123456789123456",
    },
  ];

  const columns: ColumnDef<PaymentData>[] = [
    {
      accessorKey: "id",
      header: "ردیف",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "date",
      header: "تاریخ پرداخت",
      cell: (info) => info.getValue(),
    },
     {
      accessorKey: "transactionId",
      header: "شماره پیگیری",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "amount",
      header: "مبلغ",
      cell: (info) => `${info.getValue()} تومان`,
    },
   

    {
      accessorKey: "action",
      header: "عملیات",
      cell: (info) => (
        <div className="flex items-center justify-center gap-2">
          <button className="bg-amber-500 text-black px-4 py-2 rounded-md">
            مشاهده رسید
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: payments,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    autoResetPageIndex: false,
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
              <h2 className="text-3xl font-black text-right flex items-center gap-2">
                <MdPayment size={30} />
                لیست پرداخت‌های 
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
                    {table.getRowModel().rows.map((row, index) => (
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
                    ))}
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

import { GiWallet } from "react-icons/gi";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Tooltip,
} from "@heroui/react";
import { FaPlusCircle } from "react-icons/fa";
import { PiCurrencyDollarFill } from "react-icons/pi";
import { FaMoneyBillTransfer } from "react-icons/fa6";

import { flexRender, ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useSidebar } from "../../context/SidebarContext";
import { useCustomTable } from "@/utils/hooks/useCustomTable";

interface Transaction {
  date: string;
  trackingId: string;
  amount: number;
}

const WalletCard = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  const columns = useMemo<ColumnDef<Transaction>[]>(
    () => [
      {
        accessorKey: "rowIndex",
        header: "#",
        cell: (info) => info.row.index + 1,
      },
      {
        accessorKey: "date",
        header: "تاریخ",
        cell: (info) => info.getValue(),
        sortingFn: "alphanumeric",
      },
      {
        accessorKey: "trackingId",
        header: "شماره پیگیری",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "amount",
        header: "مبلغ",
        cell: (info) => {
          const value = info.getValue();
          const numValue = typeof value === "number" ? value : Number(value);
          return `${numValue.toLocaleString()} تومان`;
        },
        sortingFn: "basic",
      },
      {
        accessorKey: "actions",
        header: "مشاهده رسید",
        cell: () => (
          <button className="text-primary hover:underline text-sm">
            مشاهده
          </button>
        ),
      },
    ],
    []
  );

  const transactions: Transaction[] = [
    { date: "1403/02/01/ 10:00", trackingId: "123456", amount: 150000 },
    { date: "1403/02/05/ 10:00", trackingId: "987654", amount: 450000 },
    { date: "1403/02/01/ 10:00", trackingId: "123456", amount: 150000 },
    { date: "1403/02/05/ 10:00", trackingId: "987654", amount: 450000 },
    { date: "1403/02/01/ 10:00", trackingId: "123456", amount: 150000 },
    { date: "1403/02/05/ 10:00", trackingId: "987654", amount: 450000 },
  ];

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const { table } = useCustomTable<Transaction>({
    data: transactions,
    columns,
    manualPagination: true,
    pagination,
    onPaginationChange: setPagination,
  });

  if (!isExpanded && !isHovered && !isMobileOpen) {
    return (
      <Dropdown placement="top-end" backdrop="opaque">
        <DropdownTrigger>
          <div className="w-full flex-shrink-0 px-2 pb-6 mt-auto flex justify-center cursor-pointer">
            <Tooltip
              content="کیف پول"
              placement="left"
              color="warning"
              showArrow={true}
              className="rounded-lg"
            >
              <GiWallet
                className="text-gray-700 dark:text-gray-200"
                size={32}
              />
            </Tooltip>
          </div>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Wallet Actions"
          className="min-w-[220px] text-right"
        >
          <DropdownItem key="settings" textValue="شارژ کردن کیف پول">
            <div className="flex items-center gap-2 text-medium">
              <FaPlusCircle />
              شارژ کردن کیف پول
            </div>
          </DropdownItem>
          <DropdownItem
            key="transactions"
            textValue="لیست تراکنش ها"
            className="justify-start"
            onPress={onOpen}
          >
            <div className="flex items-center gap-2 text-medium">
              <PiCurrencyDollarFill />
              لیست تراکنش ها
            </div>
          </DropdownItem>
          <DropdownItem
            key="withdraw"
            textValue="برداشت وجه"
            className="justify-start"
          >
            <div className="flex items-center gap-2 text-medium">
              <FaMoneyBillTransfer />
              برداشت وجه
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  return (
    <>
      <Dropdown placement="top-end" backdrop="opaque">
        <DropdownTrigger>
          <div
            className="w-full flex-shrink-0 px-2 pb-6 mt-auto cursor-pointer transition-all duration-300"
            style={{ direction: "rtl" }}
          >
            <div className="flex items-center justify-between  border border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 px-4 py-3 shadow-sm transition-all duration-300 w-full min-h-[70px]">
              <div className="flex flex-col items-start gap-1">
                <span className="font-bold text-lg text-gray-900 dark:text-white">
                  کیف پول
                </span>
                <span className="text-xs text-gray-400 mt-1">عدم موجودی</span>
              </div>
              <Tooltip content="کیف پول">
                <GiWallet
                  className="text-gray-700 dark:text-gray-200"
                  size={28}
                />
              </Tooltip>
            </div>
          </div>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Wallet Actions"
          className="min-w-[220px] text-right"
        >
          <DropdownItem key="settings" textValue="شارژ کردن کیف پول">
            <div className="flex items-center gap-2 text-medium">
              <FaPlusCircle />
              شارژ کردن کیف پول
            </div>
          </DropdownItem>
          <DropdownItem
            key="transactions"
            textValue="لیست تراکنش ها"
            className="justify-start"
            onPress={onOpen}
          >
            <div className="flex items-center gap-2 text-medium">
              <PiCurrencyDollarFill />
              لیست تراکنش ها
            </div>
          </DropdownItem>
          <DropdownItem
            key="withdraw"
            textValue="برداشت وجه"
            className="justify-start"
          >
            <div className="flex items-center gap-2 text-medium">
              <FaMoneyBillTransfer />
              برداشت وجه
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xl font-bold">
              <FaMoneyBillTransfer size={26} className="text-color1" />
              لیست تراکنش ها
            </div>
          </ModalHeader>
          <ModalBody className="overflow-x-auto">
            <table className="w-full dark:border-gray-700 text-sm">
              <thead className="bg-color3 dark:bg-color3 text-gray-800 dark:text-gray-800">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="p-2 text-center whitespace-nowrap cursor-pointer select-none"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <div className="flex items-center justify-center gap-1">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: "▲",
                            desc: "▼",
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody className="text-gray-900 dark:text-gray-100">
                {table.getRowModel().rows.map((row, idx) => (
                  <tr
                    key={row.id}
                    className={`border-t border-gray-200 dark:border-gray-700 ${
                      idx % 2 === 0
                        ? "bg-gray-50 dark:bg-gray-800"
                        : "bg-white dark:bg-gray-900"
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="p-2 text-center whitespace-nowrap text-sm"
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default WalletCard;

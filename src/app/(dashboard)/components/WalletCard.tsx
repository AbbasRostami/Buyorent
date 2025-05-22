import { GiWallet } from "react-icons/gi";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  useDisclosure,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { FaPlusCircle } from "react-icons/fa";
import { PiCurrencyDollarFill } from "react-icons/pi";
import { FaMoneyBillTransfer } from "react-icons/fa6";

import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
type Transaction = {
  date: string;
  trackingId: string;
  amount: number;
};

const WalletCard = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const columnHelper = createColumnHelper<Transaction>();

  const columns = [
    columnHelper.accessor("date", {
      header: "تاریخ",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("trackingId", {
      header: "شماره پیگیری",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("amount", {
      header: "مبلغ",
      cell: (info) => `${info.getValue()} تومان`,
    }),
    columnHelper.display({
      id: "actions",
      header: "مشاهده رسید",
      cell: () => (
        <button className="text-primary hover:underline text-sm">مشاهده</button>
      ),
    }),
  ];

  // دیتا تستی
  const data: Transaction[] = [
    { date: "1403/02/01", trackingId: "123456", amount: 150000 },
    { date: "1403/02/05", trackingId: "987654", amount: 450000 },
  ];

  const table = useReactTable<Transaction>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <Dropdown placement="top-end" backdrop="opaque">
        <DropdownTrigger>
          <div
            className="w-full flex-shrink-0 px-2 pb-6 mt-auto cursor-pointer transition-all duration-300"
            style={{ direction: "rtl" }}
          >
            <div className="flex items-center justify-between border border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 px-4 py-3 shadow-sm transition-all duration-300 w-full min-h-[70px]">
              <div className="flex flex-col items-start gap-1">
                <span className="font-bold text-lg text-gray-900 dark:text-white">
                  کیف پول
                </span>
                <span className="text-xs text-gray-400 mt-1">عدم موجودی</span>
              </div>
              <GiWallet
                className="text-gray-700 dark:text-gray-200"
                size={28}
              />
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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              لیست تراکنش ها
            </ModalHeader>
            <ModalBody className="overflow-x-auto">
              <table className="w-full border border-gray-200 dark:border-gray-700 text-sm">
                <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="p-2 text-right whitespace-nowrap"
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="text-gray-900 dark:text-gray-100">
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-t border-gray-200 dark:border-gray-700"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="p-2 whitespace-nowrap">
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
          </>
        </ModalContent>
      </Modal>
    </>
  );
};

export default WalletCard;

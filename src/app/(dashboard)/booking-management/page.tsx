"use client";

import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";

export default function BookingTable() {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ردیف",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "title",
        header: "نام اقامتگاه",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "date",
        header: "تاریخ رزرو",
      },
      {
        accessorKey: "price",
        header: "قیمت کل",
        cell: (info) => `${(+info.getValue()).toLocaleString()} تومان`,
      },
      {
        accessorKey: "guests",
        header: "تعداد مسافر",
      },
      {
        accessorKey: "status",
        header: "وضعیت رزرو",
        cell: (info) => {
          const value = info.getValue();
          const colorClass =
            value === "تایید شده"
              ? "text-green-600 font-bold"
              : value === "رزرو"
              ? "text-blue-600 font-bold"
              : "text-gray-600";

          return <span className={colorClass}>{value}</span>;
        },
      },
      {
        accessorKey: "payment_status",
        header: "وضعیت پرداخت",
        cell: (info) => {
          const value = info.getValue();
          const colorClass =
            value === "پرداخت شده"
              ? "text-green-600 font-bold"
              : value === "پرداخت نشده"
              ? "text-red-600 font-bold"
              : "text-gray-600";

          return <span className={colorClass}>{value}</span>;
        },
      },
    ],
    []
  );

  const data = [
    {
      title: "هتل سراوان",
      date: "1403/02/01/ 10:00",
      price: 150000000,
      guests: 88,
      status: "تایید شده",
      payment_status: "پرداخت نشده",
    },
    {
      title: "هتل سراوان",
      date: "1403/02/01/ 10:00",
      price: 150000000,
      guests: 70,
      status: "رزرو",
      payment_status: "پرداخت شده",
    },
    {
      title: "هتل سراوان",
      date: "1403/02/01/ 10:00",
      price: 160000000,
      guests: 53,
      status: "رزرو",
      payment_status: "پرداخت نشده",
    },
    {
      title: "هتل سراوان",
      date: "1403/02/01/ 10:00",
      price: 180000000,
      guests: 10,
      status: "تایید شده",
      payment_status: "پرداخت نشده",
    },
    {
      title: "هتل سراوان",
      date: "1403/02/01/ 10:00",
      price: 170000000,
      guests: 7,
      status: "رزرو",
      payment_status: "پرداخت نشده",
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    autoResetPageIndex: false,
  });

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="جستجو..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="border p-2 w-full rounded"
      />

      <div className="overflow-x-auto border rounded">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="p-2 text-right font-bold cursor-pointer select-none"
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
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

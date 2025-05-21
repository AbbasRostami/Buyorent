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

export default function HouseTable({ houses }: { houses: any }) {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "title",
        header: "عنوان",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "address",
        header: "آدرس",
      },
      {
        accessorKey: "price",
        header: "قیمت",
        cell: (info) => `${(+info.getValue()).toLocaleString()} تومان`,
      },
      {
        accessorKey: "rate",
        header: "امتیاز",
      },
      {
        accessorKey: "transaction_type",
        header: "نوع معامله",
        cell: (info) =>
          info.getValue() === "mortgage"
            ? "رهن"
            : info.getValue() === "rental"
            ? "اجاره"
            : "خرید",
      },
    ],
    []
  );

  const table = useReactTable({
    data: houses,
    columns,
    state: { sorting, globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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

import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  SortingState,
  OnChangeFn,
  PaginationState,
  ColumnDef,
  ColumnFiltersState,
  VisibilityState,
  Table,
} from "@tanstack/react-table";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { callAddFont } from "@/assets/fonts/Vazirmatn-normal";

interface UseCustomTableOptions<TData, TValue = unknown> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  totalCount?: number; // ✅ اضافه‌شده
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enablePagination?: boolean;
  enableRowSelection?: boolean;
  enableColumnVisibility?: boolean;
  manualPagination?: boolean;
  getRowId?: (row: TData, index: number) => string;
  pagination?: PaginationState;
  onPaginationChange?: (pagination: PaginationState) => void;
}

interface TableState<TData> {
  table: Table<TData>;
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  columnVisibility: VisibilityState;
  rowSelection: Record<string, boolean>;
}

interface TableActions {
  resetFilters: () => void;
  setPageSize: (pageSize: number) => void;
  resetPagination: () => void;
  goToPage: (page: number) => void;
  resetTable: () => void;
}

interface UseCustomTableReturn<TData, TValue>
  extends TableState<TData>,
    TableActions {
  exportToExcel: () => void;
  exportToPDF: () => void;
  printTable: () => void;
  computedPageCount?: number;
}

export function useCustomTable<TData, TValue = unknown>({
  data,
  columns,
  enableSorting = true,
  enableFiltering = true,
  enablePagination = true,
  enableRowSelection = false,
  enableColumnVisibility = false,
  manualPagination = false,
  totalCount,
  getRowId,
  pagination,
  onPaginationChange,
}: UseCustomTableOptions<TData, TValue>): UseCustomTableReturn<TData, TValue> {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<
    Record<string, boolean>
  >({});
  const computedPageCount: number =
    manualPagination && pagination && typeof totalCount === "number"
      ? Math.ceil(totalCount / pagination.pageSize)
      : 1;

  // React Table
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: enableSorting ? sorting : undefined,
      columnFilters: enableFiltering ? columnFilters : undefined,
      columnVisibility: enableColumnVisibility ? columnVisibility : undefined,
      rowSelection: enableRowSelection ? rowSelection : undefined,
      pagination: manualPagination && pagination ? pagination : undefined,
    },
    onSortingChange: enableSorting
      ? (setSorting as OnChangeFn<SortingState>)
      : undefined,
    onColumnFiltersChange: enableFiltering ? setColumnFilters : undefined,
    onColumnVisibilityChange: enableColumnVisibility
      ? setColumnVisibility
      : undefined,
    onRowSelectionChange: enableRowSelection ? setRowSelection : undefined,
    onPaginationChange:
      manualPagination && onPaginationChange
        ? (onPaginationChange as OnChangeFn<PaginationState>)
        : undefined,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
    getPaginationRowModel: enablePagination
      ? getPaginationRowModel()
      : undefined,
    getFacetedRowModel: enableFiltering ? getFacetedRowModel() : undefined,
    getFacetedUniqueValues: enableFiltering
      ? getFacetedUniqueValues()
      : undefined,
    enableRowSelection,
    manualPagination,
    pageCount: computedPageCount,
    getRowId: getRowId ?? ((row) => (row as any).id?.toString()),
    autoResetPageIndex: false,
  });

  // Export to Excel
  const exportToExcel = React.useCallback(() => {
    const worksheetData = [
      columns.map((col) => (typeof col.header === "string" ? col.header : "")),
      ...data.map((row) =>
        columns.map((col) => {
          const key = (col as { accessorKey?: keyof TData }).accessorKey;
          return key ? row[key] ?? "" : "";
        })
      ),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(blob, "table-export.xlsx");
  }, [data, columns]);

  // Export to PDF
  jsPDF.API.events.push(["addFonts", callAddFont]);
  const exportToPDF = React.useCallback(() => {
    const doc = new jsPDF();
    doc.setFont("Vazirmatn");
    doc.setFontSize(10);

    const headers = table
      .getHeaderGroups()[0]
      .headers.filter((h) => !(h.column.columnDef as any).meta?.isImage)
      .map((h) =>
        typeof h.column.columnDef.header === "string"
          ? h.column.columnDef.header
          : ""
      );

    const rows = table.getRowModel().rows.map((row) =>
      row
        .getVisibleCells()
        .filter((cell) => !(cell.column.columnDef as any).meta?.isImage)
        .map((cell) => {
          const value = cell.getValue();
          return typeof value === "string" || typeof value === "number"
            ? value.toString()
            : "";
        })
    );

    autoTable(doc, {
      head: [headers],
      body: rows,
      headStyles: { font: "Vazirmatn", fontSize: 10, halign: "center" },
      styles: { font: "Vazirmatn", fontSize: 10, halign: "center" },
    });

    doc.save("table-export.pdf");
  }, [table]);

  // Print Table
  const printTable = React.useCallback(() => {
    const headers = table
      .getHeaderGroups()[0]
      .headers.filter((h) => !(h.column.columnDef as any).meta?.isImage)
      .map((h) =>
        typeof h.column.columnDef.header === "string"
          ? h.column.columnDef.header
          : ""
      );

    const rows = table.getRowModel().rows.map((row) =>
      row
        .getVisibleCells()
        .filter((cell) => !(cell.column.columnDef as any).meta?.isImage)
        .map((cell) => {
          const value = cell.getValue();
          return typeof value === "string" || typeof value === "number"
            ? value.toString()
            : "";
        })
    );

    const htmlContent = `
      <html dir="rtl">
        <head>
          <meta charset="utf-8" />
          <title>چاپ جدول</title>
          <style>
            body { font-family: Vazirmatn, sans-serif; padding: 20px; direction: rtl; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #000; padding: 8px; text-align: center; }
            th { background-color: #f0f0f0; }
          </style>
          <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn-font@v33.003/Vazirmatn-font-face.css" rel="stylesheet" />
        </head>
        <body>
          <table>
            <thead><tr>${headers
              .map((h) => `<th>${h}</th>`)
              .join("")}</tr></thead>
            <tbody>${rows
              .map(
                (row) =>
                  `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`
              )
              .join("")}</tbody>
          </table>
          <script>window.onload = function() { window.print(); }</script>
        </body>
      </html>
    `;

    const win = window.open("", "_blank");
    if (win) {
      win.document.open();
      win.document.write(htmlContent);
      win.document.close();
    }
  }, [table]);

  return {
    table,
    sorting,
    columnFilters,
    columnVisibility,
    rowSelection,
    resetFilters: () => setColumnFilters([]),
    setPageSize: (pageSize: number) =>
      table.setPagination((prev) => ({ ...prev, pageSize })),
    resetPagination: () =>
      table.setPagination((prev) => ({ ...prev, pageIndex: 0 })),
    goToPage: (page: number) =>
      table.setPagination((prev) => ({ ...prev, pageIndex: page })),
    resetTable: () => {
      setSorting([]);
      setColumnFilters([]);
      setColumnVisibility({});
      setRowSelection({});
    },
    exportToExcel,
    exportToPDF,
    printTable,
    computedPageCount,
  };
}

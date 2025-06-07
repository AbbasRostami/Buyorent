import { callAddFont } from "../../assets/fonts/Vazirmatn-normal.js";
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

interface UseCustomTableOptions<TData, TValue = unknown> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enablePagination?: boolean;
  enableRowSelection?: boolean;
  enableColumnVisibility?: boolean;
  manualPagination?: boolean;
  pageCount?: number;
  defaultPageIndex?: number;
  defaultPageSize?: number;
  getRowId?: (row: TData, index: number) => string;
}

interface TableState<TData> {
  table: Table<TData>;
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  columnVisibility: VisibilityState;
  rowSelection: Record<string, boolean>;
  pagination: PaginationState;
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
}

// useCustomTable
export function useCustomTable<TData, TValue = unknown>({
  data,
  columns,
  enableSorting = true,
  enableFiltering = true,
  enablePagination = true,
  enableRowSelection = false,
  enableColumnVisibility = false,
  manualPagination = false,
  pageCount,
  defaultPageIndex = 0,
  defaultPageSize = 10,
  getRowId,
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
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: defaultPageIndex,
    pageSize: defaultPageSize,
  });

  // useReactTable

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: enableSorting ? sorting : undefined,
      columnFilters: enableFiltering ? columnFilters : undefined,
      columnVisibility: enableColumnVisibility ? columnVisibility : undefined,
      rowSelection: enableRowSelection ? rowSelection : undefined,
      pagination: enablePagination ? pagination : undefined,
    },
    onSortingChange: enableSorting
      ? (setSorting as OnChangeFn<SortingState>)
      : undefined,
    onColumnFiltersChange: enableFiltering ? setColumnFilters : undefined,
    onColumnVisibilityChange: enableColumnVisibility
      ? setColumnVisibility
      : undefined,
    onRowSelectionChange: enableRowSelection ? setRowSelection : undefined,
    onPaginationChange: enablePagination ? setPagination : undefined,
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
    pageCount,
    getRowId: getRowId ?? ((row) => (row as any).id?.toString()),
    autoResetPageIndex: false,
  });

  // function exportToExcel

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

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(dataBlob, "table-export.xlsx");
  }, [data, columns]);

  // function exportToPDF

  jsPDF.API.events.push(["addFonts", callAddFont]);

  const exportToPDF = React.useCallback(() => {
    const doc = new jsPDF();

    doc.setFont("Vazirmatn");
    doc.setFontSize(10);

    const headers = table
      .getHeaderGroups()[0]
      .headers.filter((header) => {
        const columnDef = header.column.columnDef;
        return !(columnDef as any).meta?.isImage;
      })
      .map((header) => {
        const raw = header.column.columnDef.header;
        return typeof raw === "string" ? raw : "";
      });

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
      headStyles: {
        fontSize: 10,
        font: "Vazirmatn",
        fontStyle: "normal",
        halign: "center",
        valign: "middle",
      },
      styles: {
        font: "Vazirmatn",
        fontSize: 10,
        halign: "center",
        valign: "middle",
      },
      margin: { top: 20 },
      didParseCell: (data) => {
        data.cell.styles.font = "Vazirmatn";
      },
    });

    doc.save("table-export.pdf");
  }, [table]);

  // function printTable

  const printTable = React.useCallback(() => {
    const headers = table
      .getHeaderGroups()[0]
      .headers.filter(
        (header) => !(header.column.columnDef as any).meta?.isImage
      )
      .map((header) =>
        typeof header.column.columnDef.header === "string"
          ? header.column.columnDef.header
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
          <title>Print Table</title>
          <style>
            body {
              font-family: Vazirmatn, sans-serif;
              direction: rtl;
              padding: 20px;
            }
            table {
              border-collapse: collapse;
              width: 100%;
            }
            th, td {
              border: 1px solid #000;
              padding: 8px;
              text-align: center;
            }
            th {
              background-color: #f0f0f0;
            }
          </style>
          <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn-font@v33.003/Vazirmatn-font-face.css" rel="stylesheet" type="text/css" />
        </head>
        <body>
          <table>
            <thead>
              <tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr>
            </thead>
            <tbody>
              ${rows
                .map(
                  (row) =>
                    `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`
                )
                .join("")}
            </tbody>
          </table>
          <script>
            window.onload = function() {
              window.print();
            }
          </script>
        </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(htmlContent);
      printWindow.document.close();
    }
  }, [table]);

  return {
    table,
    sorting,
    columnFilters,
    columnVisibility,
    rowSelection,
    pagination,
    resetFilters: () => setColumnFilters([]),
    resetTable: () => {
      setSorting([]);
      setColumnFilters([]);
      setColumnVisibility({});
      setRowSelection({});
    },
    setPageSize: (pageSize: number) =>
      setPagination((prev) => ({
        ...prev,
        pageSize,
        pageIndex: 0,
      })),
    resetPagination: () =>
      setPagination((prev) => ({
        ...prev,
        pageIndex: 0,
      })),
    goToPage: (page: number) =>
      setPagination((prev) => ({
        ...prev,
        pageIndex: Math.max(0, page),
      })),
    exportToExcel,
    exportToPDF,
    printTable,
  };
}

"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export function DataTable({ columns, data }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <table className="w-full">
        <tr>
          {table.getHeaderGroups().map((headerGroup) => (
            <>
              {" "}
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    className="h-[20px] flex-1 font-normal text-start p-0 py-[10px]"
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                );
              })}
            </>
          ))}
        </tr>

        <tbody className="px-[12px]">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="h-[20px] py-[14px]">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </tbody>
      </table>
    </div>
  );
}

export const PaginationSection = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pages.push(i);
  }

  const handleNextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <Pagination>
      <PaginationContent className="gap-[8px]">
        <PaginationItem>
          <PaginationPrevious
            className={cn(
              currentPage == 1 ? "bg-muted opacity-45 mr-[20px]" : ""
            )}
            onClick={() => handlePreviousPage()}
          />
        </PaginationItem>
        {currentPage != 1 && (
          <div
            className={cn(
              currentPage == 1
                ? "bg-blue-600 text-white font-medium leading-[20px] text-[14px] "
                : " text-[#4D4D4D] font-normal"
            )}
            onClick={() => setCurrentPage(1)}
          >
            1
          </div>
        )}
        {currentPage > 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {pages
          .filter((page, index) => {
            const pagesAhead = pages.length - currentPage;
            if (pagesAhead >= 8) {
              return page >= currentPage && page < currentPage + 8;
            } else {
              const startPage = pages.length - 7 > 0 ? pages.length - 7 : 1;
              return page >= startPage && page <= pages.length;
            }
          })
          .map((page, index) => {
            return (
              <div
                onClick={() => setCurrentPage(page)}
                className={cn(
                  currentPage == page
                    ? "px-[8px] py-[6px] h-[28px] w-[28px] flex justify-center items-center rounded-sm bg-[#146EB4] text-white"
                    : "",
                  ""
                )}
                key={index + 1}
              >
                <div>{page}</div>
              </div>
            );
          })}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className={cn(
              currentPage == pages.length ? "bg-muted opacity-45 ml-[20px]" : ""
            )}
            onClick={() => handleNextPage()}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

"use client";

import * as React from "react";
import { useCategoryStore } from "@/store/categoryStore";
import { CategoryType } from "@/types/categoryType";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import CategoryForm from "./CategoryForm";

const PAGE_SIZE = 10;

const CategoryTable = () => {
  const {
    categories,
    getCategories,
    handleEdit,
    handleUpdate,
    handleDelete,
    handleCloseDialog,
    selectedCategory,
    isDialogOpen,
    currentPage,
    setCurrentPage,
  } = useCategoryStore();

  const columns: ColumnDef<CategoryType>[] = [
    {
      accessorKey: "no",
      header: "No",
      cell: ({ row }) => row.index + 1 + (currentPage - 1) * PAGE_SIZE,
      meta: { width: "60px" },
    },
    {
      accessorKey: "name",
      header: "Name",
      meta: { width: "200px" },
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Action</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleEdit(row.original)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(row.original.id)}
              className="text-red-500"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      meta: { width: "120px" },
    },
  ];

  const table = useReactTable({
    data: categories.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(categories.length / PAGE_SIZE),
    state: {
      pagination: {
        pageIndex: currentPage - 1,
        pageSize: PAGE_SIZE,
      },
    },
    onPaginationChange: (updater) => {
      const newPageIndex = typeof updater === 'function' ? updater({
        pageIndex: currentPage - 1,
        pageSize: 0
      }).pageIndex : updater.pageIndex;
      setCurrentPage(newPageIndex + 1);
    },
  });

  React.useEffect(() => {
    getCategories();
  }, [getCategories]);

  const totalPages = Math.ceil(categories.length / PAGE_SIZE);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 10;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (startPage > 1) {
        pages.push(1, '...');
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages) {
        pages.push('...', totalPages);
      }
    }

    return pages;
  };

  return (
    <>
      <div className="overflow-x-auto">
        <Table className="min-w-full divide-y divide-gray-200">
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.id}
                  className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{ width: (column.meta as any)?.width || 'auto' }}
                >
                  {column.header && column.header.toString()}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    style={{ width: (cell.column.columnDef.meta as any)?.width || 'auto' }}
                  >
                    {typeof cell.column.columnDef.cell === "function"
                      ? cell.column.columnDef.cell(cell.getContext())
                      : null}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center mt-4">
        <Pagination>
          <PaginationPrevious
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            isActive={currentPage !== 1}
          />
          {getPageNumbers().map((page, index) =>
            page === '...' ? (
              <span key={index} className="px-3 py-2">...</span>
            ) : (
              <PaginationItem
                key={index}
                onClick={() => setCurrentPage(page as number)}
                className={currentPage === page ? "bg-blue-500 text-white" : ""}
              >
                {page}
              </PaginationItem>
            )
          )}
          <PaginationNext
            onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
            isActive={currentPage !== totalPages}
          />
        </Pagination>
      </div>
      {selectedCategory && (
        <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
          <DialogContent aria-describedby="edit-category-description" className="max-w-lg mx-auto">
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription id="edit-category-description">
              Use the form below to update the category details.
            </DialogDescription>
            <CategoryForm
              defaultValues={selectedCategory}
              onSubmit={(data) => {
                handleUpdate(data);
                handleCloseDialog();
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default CategoryTable;

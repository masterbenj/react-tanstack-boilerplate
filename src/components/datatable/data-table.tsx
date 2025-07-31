import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowLeft, ArrowLeftToLine, ArrowRight, ArrowRightToLine, ArrowUpDown, ChevronDown, Plus, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "../ui/input"
import { cn } from "@/lib/utils"
import { Skeleton } from "../ui/skeleton"

interface DataTableProps<T> {
  data                    :   T[]
  columns                 :   TableColumn<T>[]
  checkbox                ?:  boolean
  progressPending         ?:  boolean
  className               ?:  string
  refreshTrigger          ?:  () => void
  createTrigger           ?:  () => void
  searchFilter            ?:  boolean
  columnVisibilityToggle  ?:  boolean
  isIndexed               ?:  boolean
}

export type TableColumn<T> = ColumnDef<T> & {
  name?: string;
  isSortable?: boolean;
};

export const DataTable = <T,>({
  data,
  columns,
  checkbox,
  progressPending,
  className,
  refreshTrigger,
  createTrigger,
  searchFilter = true,
  columnVisibilityToggle = true,
  isIndexed = false,
}: DataTableProps<T>) => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const checkboxColumn: ColumnDef<T> = {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  };

  const enhancedColumns = React.useMemo(() => {
    let cols = [...columns]
  
    if (isIndexed) {
      const indexColumn: TableColumn<T> = {
        id: 'index',
        header: '#',
        cell: ({ row }) => row.index + 1,
        size: 30,
        enableSorting: false,
        enableColumnFilter: false,
      }
      cols = [indexColumn, ...cols]
    }
  
    return cols
  }, [columns, isIndexed])
  
  const cols: TableColumn<T>[] = [
    ...(checkbox ? [checkboxColumn] : []),
    ...enhancedColumns,
  ]

  cols.map((item) => {
    if (!item.header) {
      if (item.isSortable) {
        item.header = ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              { item.name ?? "" }
              <ArrowUpDown />
            </Button>
          )
        }
      } else {
        item.header = item.name ?? ""
      }
    }
  })

  const [globalFilter, setGlobalFilter] = React.useState<any>([])

  const table = useReactTable({
    data,
    columns: cols,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  })

  const totalRows = table.getCoreRowModel().rows.length;
  const pageSize = table.getState().pagination.pageSize;
  const lastPageIndex = Math.max(0, Math.ceil(totalRows / pageSize) - 1);
  
  return (
    <div className="w-full">
      { progressPending
        ? <div className="grid grid-flow-row gap-4">
            <div className="flex justify-between">
              <div className="flex gap-4">
                <Skeleton className="h-8 w-[390px]" />
                <Skeleton className="h-8 w-[100px]" />
              </div>
              <Skeleton className="h-8 w-[160px] ml-auto" />
            </div>
            <div>
              <Skeleton className="h-8 w-full" />
            </div>
            <div>
              <Skeleton className="h-64 w-full" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-8 w-[150px]" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-[40px]" />
                <Skeleton className="h-8 w-[40px]" />
                <Skeleton className="h-8 w-[40px]" />
                <Skeleton className="h-8 w-[40px]" />
              </div>
            </div>
          </div>
        : <>
            <div className="flex items-center py-4">
              { searchFilter &&
                <Input
                  value={table.getState().globalFilter}
                  onChange={e => table.setGlobalFilter(String(e.target.value))}
                  placeholder="Search..."
                  className="max-w-sm h-8 text-sm px-2 border-gray-500"
                />
              }
              
              { refreshTrigger && 
                <Button
                  variant="outline" 
                  size="sm" 
                  className="ms-4 dark:bg-gray-900 dark:border-gray-500 dark:hover:bg-gray-500 cursor-pointer"
                  onClick={() => {
                    refreshTrigger()
                    table.setGlobalFilter("")
                  }}
                >
                  Refresh <RefreshCw />
                </Button>
              }

              { createTrigger &&
                <Button variant="outline" size="sm" className="ms-4" onClick={createTrigger}>
                  Add <Plus />
                </Button>
              }

              { columnVisibilityToggle &&
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto dark:bg-gray-900 dark:border-gray-500 dark:hover:bg-gray-500 w-[165px] cursor-pointer" size="sm">
                      Columns <ChevronDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((column) => {
                        return (
                          <DropdownMenuCheckboxItem
                            key={column.id}
                            className="capitalize cursor-pointer"
                            checked={column.getIsVisible()}
                            onCheckedChange={(value) =>
                              column.toggleVisibility(!!value)
                            }
                          >
                            {column.id}
                          </DropdownMenuCheckboxItem>
                        )
                      })}
                  </DropdownMenuContent>
                </DropdownMenu>
              }
            </div>
            <div className={`rounded-md border`}>
              <Table className={cn(className)}>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id} className="p-1 px-2">
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        )
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id} width={`${cell.column.getSize()}px`}  className="p-1 px-2 text-xs">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={cols.length}
                        className="h-12 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
              <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
              </div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()} 
                >
                  <ArrowLeftToLine />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <ArrowLeft />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <ArrowRight />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.setPageIndex(lastPageIndex)}
                  disabled={!table.getCanNextPage()}
                >
                  <ArrowRightToLine />
                </Button>
              </div>
            </div>
          </>
      }
    </div>
  )
}
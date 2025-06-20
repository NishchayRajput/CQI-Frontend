"use client"

import * as React from "react"
import { useRouter, usePathname } from "next/navigation"
import axios from "axios"
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
  Row,
  Column,
  HeaderGroup,
  Header,
  Cell,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export type Payment = {
  id: string
}

// ✅ Use a function to get the columns with access to router
const getColumns = (router: ReturnType<typeof useRouter>): ColumnDef<Payment>[] => [
  {
    accessorKey: "feedback",
    header: ({ column }: { column: Column<Payment> }) => (
      <div className="text-left">Feedback</div>
    ),
    cell: ({ row }: { row: Row<Payment> }) => (
      <div className="flex justify-start">Feedback {row.index + 1}</div>
    ),
  },
  {
    accessorKey: "openFeeback",
    header: () => <div className="text-center">Detailed Feedback</div>,
    cell: ({ row }: { row: Row<Payment> }) => (
      <div className="flex justify-center">
        <Button
          variant="outline"
          onClick={() => router.push(`/listFeedback/indivFeedback/${row.original.id}`)}
        >
          Open
        </Button>
      </div>
    ),
  },
]

export default function ListFeedback() {
  const router = useRouter()
  const pathname = usePathname()
  const id = pathname.split("/")[1] // Extract the id from the URL
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [fetchData, setFetchData] = React.useState<Payment[]>([])

  const columns = React.useMemo(() => getColumns(router), [router])

  React.useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/feedback/list/${id}`
        )
        const feedbacks = response.data.feedbackResponses
        const payments: Payment[] = feedbacks.map((fb: any) => ({
          id: fb._id,
        }))
        setFetchData(payments)
      } catch (error) {
        console.error("Error fetching feedbacks:", error)
      }
    }
    fetchFeedbacks()
  }, [id])

  const table = useReactTable({
    data: fetchData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup: HeaderGroup<Payment>) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header: Header<Payment, unknown>) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row: Row<Payment>) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell: Cell<Payment, unknown>) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
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
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
"use client"
import { memo, useState, useEffect } from "react"
import clsx from "clsx"
import { AgGridReact } from "ag-grid-react"
import { ModuleRegistry, AllCommunityModule, ColDef } from "ag-grid-community"
import "@/styles/ag-theme-alpine-custom.css"

ModuleRegistry.registerModules([AllCommunityModule])

interface ClientWidgetProps {
  className?: string
}

interface RowData {
  label: string
  value: string
}

export default memo(({ className = "" }: ClientWidgetProps) => {
  const [rowData, setRowData] = useState<RowData[]>([])

  useEffect(() => {
    setRowData([{ label: "User Agent", value: navigator.userAgent }])
  }, [])

  const cls = {
    widget: [className],
    grid: [
      "h-full w-full", 
      "overflow-x-hidden", 
      "ag-theme-alpine-auto-dark",
    ],
    header: [],
    row: [],
    cell: ["text-left"],
  }

  const columnDefs: ColDef<RowData>[] = [
    {
      headerName: "Client Monitor",
      field: "label",
      flex: 1,
      sortable: false,
      headerClass: clsx(cls.header),
      cellClass: clsx(cls.cell),
    },
    {
      headerName: "",
      field: "value",
      flex: 1,
      valueFormatter: (params) => params.value || "Unknown",
      sortable: false,
      headerClass: clsx(cls.header),
      cellClass: clsx(cls.cell),
      wrapText: true,
      autoHeight: true,
    },
  ]

  const getRowId = (params: { data: RowData }) => params.data.label

  return (
    <div className={clsx([cls.widget, cls.grid])}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        domLayout="autoHeight"
        getRowId={getRowId}
        headerHeight={36}
        rowHeight={32}
        rowClass={clsx(cls.row)}
      />
    </div>
  )
})

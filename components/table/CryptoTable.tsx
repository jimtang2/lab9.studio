"use client"
import { memo, useState, useEffect, useMemo } from "react"
import clsx from "clsx"
import { AgGridReact } from "ag-grid-react"
import { ModuleRegistry, AllCommunityModule, ColDef } from "ag-grid-community"
import "@/styles/ag-theme-alpine-custom.css"

ModuleRegistry.registerModules([AllCommunityModule])

interface CryptoTableProps {
  className: string
  message: string
  ok: boolean
}

interface CryptoMessage {
  e: string // event type
  E: number // event time
  s: string // symbol
  c: number // close price
  o: number // open price
  h: number // high price
  l: number // low price
  v: number // total traded base asset volume
  q: number // total traded quote asset volume
}

export default memo(({ className, message, ok }: CryptoTableProps) => {
  const json = useMemo(() => JSON.parse(message || "{}"), [message])
  const [list, setList] = useState<string[]>([])
  const [map, setMap] = useState<Record<string, CryptoMessage>>({})

  useEffect(() => {
    if (json.s && !(json.s in map)) {
      setList(prev => [...prev, json.s])
    }
    setMap(prev => ({ ...prev, [json.s]: json }))
  }, [json, ok])

  const columnDefs: ColDef<CryptoMessage>[] = [
    {
      headerName: "Symbol",
      field: "s",
      flex: 1, 
      sortable: true,
      filter: true,
      // valueFormatter: params => `${params.value.split("USD")[0]}`
    },
    // {
    //   headerName: "Close",
    //   field: "c",
    //   flex: 1, 
    //   sortable: true,
    //   valueFormatter: params => `$${parseFloat(params.value).toFixed(2)}`
    // },
    {
      headerName: "Open",
      field: "o",
      flex: 1, 
      sortable: true,
      valueFormatter: params => `$${parseFloat(params.value).toFixed(2)}`
    },
    {
      headerName: "High",
      field: "h",
      flex: 1, 
      sortable: true,
      valueFormatter: params => `$${parseFloat(params.value).toFixed(2)}`
    },
    {
      headerName: "Low",
      field: "l",
      flex: 1, 
      sortable: true,
      valueFormatter: params => `$${parseFloat(params.value).toFixed(2)}`
    },
    {
      headerName: "Volume",
      field: "v",
      flex: 1, 
      sortable: true,
      valueFormatter: params => `${(parseInt(params.value) / 1e6).toFixed(1)}M`
    },
    // {
    //   headerName: "Quote Volume",
    //   field: "q",
    //   flex: 1, 
    //   sortable: true,
    //   valueFormatter: params => `${(parseInt(params.value) / 1e6).toFixed(1)}M`
    // }
  ]

  const rowData = list.map(symbol => map[symbol])
  const getRowId = (params: { data: CryptoMessage }) => params.data.s

  const cls = {
    widget: [
      "h-full w-full",
      "min-h-fit",
      className
    ],
    grid: [
      "overflow-x-hidden",
      "ag-theme-alpine-auto-dark",
      "bg-background",
    ]
  }

  return (
    <div className={clsx(cls.widget)}>
      <div className={clsx(cls.grid)}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          headerHeight={44}
          rowHeight={44}
          domLayout="autoHeight"
          getRowId={getRowId}
          onGridReady={() => console.log("Grid rendered")}
        />
      </div>
    </div>
  )
})
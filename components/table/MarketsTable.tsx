import { memo, useState, useEffect, useMemo } from "react"
import clsx from "clsx"
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { ModuleRegistry, AllCommunityModule, ColDef } from "ag-grid-community"
ModuleRegistry.registerModules([AllCommunityModule])
interface MarketsTableProps {
  className: string
  message: string
}
interface MarketsMessage {
  n: string
  lp: number
  t: number
  volume: number
  chp: number
  ch: number
  s: string
}
const parseMarketsMessage = (message: string): MarketsMessage[] => {
  try {
    const messageParts = message.split(/(?=~m~\d+~m~)/).filter(part => part.startsWith('~m~'))
    const marketsData: MarketsMessage[] = []
    for (const part of messageParts) {
      const match = part.match(/~m~\d+~m~(.*)/)
      if (!match || !match[1]) continue
      const jsonString = match[1]
      let parsed
      try {
        parsed = JSON.parse(jsonString)
      } catch {
        continue
      }
      if (!parsed.p || !Array.isArray(parsed.p) || parsed.p.length < 2) continue
      const item = parsed.p[1]
      if (!item || !item.v || typeof item.v !== 'object') continue
      const mappedItem = {
        n: item.v.n || item.n || "",
        lp: item.v.lp || 0,
        t: item.v.t || 0,
        volume: item.v.volume || 0,
        chp: item.v.chp || 0,
        ch: item.v.ch || 0,
        s: item.s || ""
      }
      marketsData.push(mappedItem)
    }
    return marketsData
  } catch {
    return []
  }
}
export default memo(({ className, message }: MarketsTableProps) => {
  const marketsData = useMemo(() => parseMarketsMessage(message), [message])
  const [markets, setMarkets] = useState<string[]>([])
  const [marketsMap, setMarketsMap] = useState<Record<string, MarketsMessage>>({})
  useEffect(() => {
    setMarketsMap(prev => {
      const newMap = { ...prev }
      marketsData.forEach(item => {
        if (item.n) newMap[item.n] = item
      })
      return newMap
    })
    setMarkets(prev => {
      const newMarkets = [...prev]
      marketsData.forEach(item => {
        if (item.n && !newMarkets.includes(item.n)) newMarkets.push(item.n)
      })
      return newMarkets
    })
  }, [marketsData])
  const cls = {
    widget: [className],
    grid: ["h-full w-full", "overflow-x-hidden", "ag-theme-alpine-auto-dark", "bg-background"]
  }
  const columnDefs: ColDef<MarketsMessage>[] = [
    { headerName: "Market", field: "n", flex: 1, sortable: true },
    {
      headerName: "Last Price",
      field: "lp",
      flex: 1,
      cellStyle: { textAlign: "right" },
      valueFormatter: (params) => (params.value || 0).toFixed(2),
      sortable: true
    },
    {
      headerName: "Timestamp",
      field: "t",
      flex: 1,
      cellStyle: { textAlign: "right" },
      valueFormatter: (params) => new Date(params.value * 1000).toLocaleString(),
      sortable: true
    },
    {
      headerName: "Volume",
      field: "volume",
      flex: 1,
      cellStyle: { textAlign: "right" },
      valueFormatter: (params) => (params.value || 0).toFixed(0),
      sortable: true
    },
    {
      headerName: "Change %",
      field: "chp",
      flex: 1,
      cellStyle: { textAlign: "right" },
      valueFormatter: (params) => `${(params.value || 0).toFixed(2)}%`,
      sortable: true
    },
    {
      headerName: "Change",
      field: "ch",
      flex: 1,
      cellStyle: { textAlign: "right" },
      valueFormatter: (params) => (params.value || 0).toFixed(2),
      sortable: true
    },
    { headerName: "Status", field: "s", flex: 1, sortable: true }
  ]
  const rowData = markets.map(market => marketsMap[market] || {
    n: market,
    lp: 0,
    t: 0,
    volume: 0,
    chp: 0,
    ch: 0,
    s: ""
  })
  return (
    <div className={clsx(cls.widget)}>
      <div className={clsx(cls.grid)}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          domLayout="autoHeight"
          suppressRowClickSelection
        />
      </div>
    </div>
  )
})
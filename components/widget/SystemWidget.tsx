import { memo, useMemo } from "react"
import clsx from "clsx"
import { AgGridReact } from "ag-grid-react"
import { ModuleRegistry, AllCommunityModule, ColDef } from "ag-grid-community"
import "@/styles/ag-theme-alpine-custom.css"
ModuleRegistry.registerModules([AllCommunityModule])
interface SystemWidgetProps {
  className: string
  message: string
  ok: boolean
}
interface SystemMessage {
  markets_sessions: number
  mem: number
  used_mem: number
  cpu: number
  used_cpu: number
  cpu_speed: number
  cpu_cores: number
  network_egress_speed: number
  network_ingress_speed: number
  uptime: number
  disk_io_rate: number
}
interface RowData {
  label: string
  value: string | number
}
export default memo(({ className, message, ok }: SystemWidgetProps) => {
  let json: SystemMessage | null = null
  try {
    json = JSON.parse(message)
  } catch {}
  const {
    markets_sessions = 0,
    mem = 0,
    used_mem = 0,
    cpu = 0,
    used_cpu = 0,
    cpu_speed = 0,
    cpu_cores = 0,
    network_egress_speed = 0,
    network_ingress_speed = 0,
    uptime = 0,
    disk_io_rate = 0
  } = json || {}
  const cls = {
    widget: [className],
    grid: [
    	"h-full w-full", 
    	"overflow-x-hidden", 
    	"ag-theme-alpine-auto-dark",
    ],
    header: [
    ],
    row: [
    ],
    cell: [
    	"text-left",
    ],
  }
  const columnDefs: ColDef<RowData>[] = [
    { headerName: "System Monitor", field: "label", flex: 1, sortable: false, headerClass: clsx(cls.header), cellClass: clsx(cls.cell), },
    { headerName: "", field: "value", flex: 1, valueFormatter: (params) => params.value || "0", sortable: false, headerClass: clsx(cls.header), cellClass: clsx(cls.cell), }
  ]
  const rowData: RowData[] = [
    { label: "CPU Cores", value: cpu_cores },
    { label: "CPU Speed", value: `${(cpu_speed / 1000 || 0).toFixed(2)} GHz` },
    { label: "Memory", value: `${(mem / 1000000000 || 0).toFixed(2)} GB` },
    { label: "CPU (OS)", value: `${(cpu * 100 || 0).toFixed(1)}%` },
    { label: "CPU (JVM)", value: `${(used_cpu || 0).toFixed(1)}%` },
    { label: "Used Memory", value: `${(used_mem || 0).toFixed(1)}%` },
    { label: "Network Egress", value: `${(network_egress_speed / 1000000 || 0).toFixed(2)} MB/s` },
    { label: "Network Ingress", value: `${(network_ingress_speed / 1000000 || 0).toFixed(2)} MB/s` },
    { label: "Uptime", value: `${(uptime || 0).toFixed(0)} s` },
    { label: "Disk I/O Rate", value: `${(disk_io_rate || 0).toFixed(0)} IOPS` },
    { label: "Broadcasts", value: markets_sessions },
  ]
  const getRowId = (params: { data: RowData }) => params.data.label
  return (
    <div className={clsx([cls.widget, cls.grid])}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        domLayout="autoHeight"
        getRowId={getRowId}
        // rowClass={clsx(cls.row)}
        headerHeight={36}
        rowHeight={32}
        rowClass={clsx(cls.row)} 
      />
    </div>
  )
})
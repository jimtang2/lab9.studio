"use client"
import { useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import { Data, LayoutAxis, Dash } from "plotly.js"
import useHistoricalPrices from "@/state/hooks/useHistoricalPrices"
import Loader from "@/components/home/Loader"
import clsx from "clsx"

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false })

interface HistoricalPrice {
  date: string
  close: string
  high: string
  low: string
  open: string
  volume: number
}

interface HistoricalPriceChartProps {
  symbol: string
  startDate: Date
  endDate: Date
}

export default function HistoricalPriceChart({ symbol, startDate, endDate }: HistoricalPriceChartProps) {
  const { loading, prices } = useHistoricalPrices({ symbol, startDate, endDate })
  const [chartData, setChartData] = useState<{ date: number, close: number, open: number, high: number, low: number, volume: number }[]>([])
  const startTimeRef = useRef<number>(0)
  const [renderTime, setRenderTime] = useState<number>(0)
  const hasRendered = useRef<boolean>(false)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (prices.length > 0) {
      console.log("before plot")
      startTimeRef.current = Date.now()
      hasRendered.current = false
      setChartData(prices.map(price => ({
        date: new Date(price.date).getTime(),
        close: parseFloat(price.close || "0"),
        open: parseFloat(price.open || "0"),
        high: parseFloat(price.high || "0"),
        low: parseFloat(price.low || "0"),
        volume: price.volume || 0
      })))
    }
  }, [prices])

  const getQuarterTicks = (start: Date, end: Date): { values: number[], labels: string[] } => {
    const ticks: number[] = []
    const labels: string[] = []
    const startTime = start.getTime()
    const endTime = end.getTime()
    const current = new Date(start)
    current.setMonth(Math.floor(current.getMonth() / 3) * 3)
    current.setDate(1)
    
    while (current <= end) {
      const tickTime = current.getTime()
      if (tickTime >= startTime && tickTime <= endTime) {
        ticks.push(tickTime)
        const year = current.getFullYear() % 100
        const quarter = Math.floor(current.getMonth() / 3) + 1
        labels.push(`'${year}/Q${quarter}`)
      }
      current.setMonth(current.getMonth() + 3)
    }
    
    return { values: ticks, labels }
  }

  const hprices = {
    trace: {
      type: "scattergl" as const,
      mode: "lines" as const,
      x: chartData.map(d => d.date),
      y: chartData.map(d => d.close),
      fill: "tozeroy" as const,
      fillcolor: "var(--color-accent)",
      line: { color: "var(--color-accent)" },
      name: symbol,
      customdata: chartData.map(d => ({
        date: d.date,
        close: d.close,
        open: d.open,
        high: d.high,
        low: d.low,
        volume: d.volume
      })) as unknown,
      hovertemplate:
        "Date: %{customdata.date|%d/%m/%Y}<br>" +
        "Close: $%{customdata.close:.2f}<br>" +
        "Open: $%{customdata.open:.2f}<br>" +
        "High: $%{customdata.high:.2f}<br>" +
        "Low: $%{customdata.low:.2f}<br>" +
        "Volume: %{customdata.volume|%1.1f}M<extra></extra>",
      hoverinfo: "skip" as const
    } as Partial<Data>,
    xAxis: {
      type: "date" as const,
      tickvals: getQuarterTicks(startDate, endDate).values,
      ticktext: getQuarterTicks(startDate, endDate).labels,
      tickangle: -45,
      tickfont: { size: 12 },
      gridcolor: "transparent"
    } as Partial<LayoutAxis>,
    yAxis: {
      title: { text: "Price ($)", standoff: 10 },
      tickformat: "$.2f",
      gridcolor: "var(--color-subtext)",
      gridwidth: 1,
      griddash: "dash" as Dash
    } as Partial<LayoutAxis>
  }

  const volumes = {
    trace: {
      type: "bargl" as const,
      x: chartData.map(d => d.date),
      y: chartData.map(d => d.volume),
      marker: { color: "var(--color-red-500)", opacity: 0.8 },
      name: "Volume",
      yaxis: "y2",
      hoverinfo: "none" as const
    } as unknown as Partial<Data>,
    yAxis: {
      yaxis: "y2",
      visible: false,
      range: chartData.length > 0 ? [0, Math.max(...chartData.map(d => d.volume)) * 2.0] : [0, 1]
    } as Partial<LayoutAxis>
  }

  const cls = {
    container: [
      "relative flex items-center justify-center",
      "bg-background-alt",
      "h-full w-full",
      "px-2 pt-4 pb-16"
    ],
    statsContainer: [
      "absolute top-0 left-0",
      "hidden",
    ],
    statsOverlay: [
      "absolute w-full h-full",
      "bg-red-500 opacity-20",
      "z-1",
    ],
    stats: [
      "p-2",
      "z-2"
    ],
    chart: [
      "outline-none"
    ]
  }

  const handleAfterPlot = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      if (!hasRendered.current) {
        console.log("after plot")
        const time = Math.max(0, Date.now() - startTimeRef.current)
        setRenderTime(time)
        hasRendered.current = true
      }
    }, 100)
  }

  return (
    <div className={clsx(cls.container)}>
      <Loader show={loading} />
      <Plot
        data={[hprices.trace, volumes.trace]}
        layout={{
          xaxis: hprices.xAxis,
          yaxis: hprices.yAxis,
          yaxis2: volumes.yAxis,
          margin: { t: 10, r: 30, l: 50, b: 60 },
          showlegend: false,
          paper_bgcolor: "transparent",
          plot_bgcolor: "transparent"
        }}
        config={{ responsive: true }}
        style={{ width: "100%", height: "100%" }}
        className={clsx(cls.chart)}
        onAfterPlot={handleAfterPlot}
      />
      <div className={clsx(cls.statsContainer)}>
        <div className={clsx(cls.statsOverlay)}></div>
        <div className={clsx(cls.stats)}>
          <div>points: {chartData.length}</div>
          <div>render time: {renderTime}ms</div>
        </div>
      </div>
    </div>
  )
}
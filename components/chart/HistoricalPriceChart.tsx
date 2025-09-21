"use client"
import { useState, useEffect } from "react"
import { AreaChart, Area, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, } from "recharts"
import useHistoricalPrices from "@/state/hooks/useHistoricalPrices"
import Loader from "@/components/home/Loader"
import clsx from "clsx"

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

  useEffect(() => {
    setChartData(prices.map(price => ({
      date: new Date(price.date).getTime(),
      close: parseFloat(price.close || "0"),
      open: parseFloat(price.open || "0"),
      high: parseFloat(price.high || "0"),
      low: parseFloat(price.low || "0"),
      volume: price.volume || 0
    })))
  }, [prices])

  const getQuarterTicks = (start: Date, end: Date): number[] => {
    const ticks: number[] = []
    const current = new Date(start)
    current.setMonth(Math.floor(current.getMonth() / 3) * 3)
    current.setDate(1)
    
    while (current <= end) {
      ticks.push(current.getTime())
      current.setMonth(current.getMonth() + 3)
    }
    
    return ticks
  }

  const hprices = {
    xAxis: {
      dataKey: "date",
      scale: "time",
      type: "number",
      domain: ["dataMin", "dataMax"],
      ticks: getQuarterTicks(startDate, endDate),
      tickFormatter: (timestamp: number): string => {
        const date = new Date(timestamp)
        const year = date.getFullYear() % 100
        const quarter = Math.floor(date.getMonth() / 3) + 1
        return `'${year}/Q${quarter}`
      },
      interval: 0,
      angle: -45,
      textAnchor: "end",
      tickMargin: 10
    },
    yAxis: {
      domain: ([dataMin, dataMax]: [number, number]) => [dataMin * 0.75, dataMax * 1.25],
      tickFormatter: (value: number): string => `$${value.toFixed(2)}`
    },
    tooltip: {
      content: ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
          const data = payload.find((p: any) => p.dataKey === "close")
          if (!data) return null
          const { date, close, open, high, low, volume } = data.payload
          return (
            <table style={{
              backgroundColor: "var(--color-menu)",
              border: "1px solid var(--color-border)",
              padding: "10px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              color: "var(--color-subtext)"
            }}>
              <tbody>
                <tr>
                  <td>Date:</td>
                  <td>{`${new Date(date).toLocaleDateString("en-US", { day: "numeric", month: "numeric", year: "numeric" })}`}</td>
                </tr>
                <tr>
                  <td>Close:</td>
                  <td>{`$${close.toFixed(2)}`}</td>
                </tr>
                <tr>
                  <td>Open:</td>
                  <td>{`$${open.toFixed(2)}`}</td>
                </tr>
                <tr>
                  <td>High:</td>
                  <td>{`$${high.toFixed(2)}`}</td>
                </tr>
                <tr>
                  <td>Low:</td>
                  <td>{`$${low.toFixed(2)}`}</td>
                </tr>
                <tr>
                  <td>Volume:</td>
                  <td>{`${(volume / 1e6).toFixed(1)}M`}</td>
                </tr>
              </tbody>
            </table>
          )
        }
        return null
      }
    }
  }

  const volumes = {
    yAxis: {
      yAxisId: "volume",
      hide: true,
      domain: ([dataMin, dataMax]: [number, number]) => [0, dataMax * 1.25],
      tickFormatter: (value: number): string => `${(value / 1e6).toFixed(1)}M`
    }
  }

  const cls = {
    container: [
      "flex items-center justify-center",
      "bg-background-alt",
      "h-full w-full",
      "px-2 pt-4 pb-16"
    ],
    chart: [
      "outline-none"
    ]
  }

  return (
    <div className={clsx(cls.container)}>
      <Loader show={loading} />
      <ResponsiveContainer className={clsx(cls.chart)}>
        <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 40 }}>
          <defs>
            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-accent)" />
              <stop offset="100%" stopColor="var(--color-background)" />
            </linearGradient>
          </defs>
          <XAxis {...(hprices.xAxis as any)} />
          <YAxis {...(hprices.yAxis as any)} />
          <YAxis {...(volumes.yAxis as any)} />
          <Tooltip
            content={hprices.tooltip.content}
            filterNull={false}
          />
          <Area type="monotone" dataKey="close" stroke="var(--color-accent)" fill="url(#priceGradient)" />
          <Bar dataKey="volume" yAxisId="volume" fill="var(--color-accent)" fillOpacity={0.3} barSize={4} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
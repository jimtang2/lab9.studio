"use client"
import { useState, useEffect } from "react"
import { AreaChart, Area, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, } from "recharts"
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

  const hprices = {
    xAxis: {
      dataKey: "date",
      scale: "time",
      type: "number",
      domain: ["dataMin", "dataMax"],
      ticks: ((start: Date, end: Date): number[] => {
        const ticks: number[] = []
        const current = new Date(start)
        current.setMonth(Math.ceil(current.getMonth() / 3) * 3)
        current.setDate(1)
        
        while (current <= end) {
          ticks.push(current.getTime())
          current.setMonth(current.getMonth() + 3)
        }
        
        return ticks
      })(startDate, endDate),
      tickFormatter: (timestamp: number): string => {
        const date = new Date(timestamp)
        const year = date.getFullYear() % 100
        const quarter = Math.floor(date.getMonth() / 3) + 1
        return `'${year}/Q${quarter}`
      },
      interval: "equidistantPreserveStart",
      angle: -45,
      textAnchor: "end",
      tickMargin: 10,
      allowDataOverflow: true,
    },
    yAxis: {
      domain: ([dataMin, dataMax]: [number, number]) => [dataMin * 0.75, dataMax * 1.25],
      ticks: ((): number[] => {
        let min: number = 1000000
        let max: number = 0
        chartData.map(({ low, high, }) => {
          min = low < min ? low : min 
          max = high > max ? high : max
        })
        let increment = (max - min) / 5
        let nominalIncrements = [0.1, 0.5, 1, 2, 5, 10, 20, 50, 100, 200, 500, 1000]
        let tickIncrement = 0.05
        for (let i = 1; i < nominalIncrements.length; i++) {
          if ((increment > nominalIncrements[i-1]) && (increment < nominalIncrements[i])) {
            tickIncrement = nominalIncrements[i]
            break
          }
        }
        let ticks = []
        for (let i = Math.ceil(min / tickIncrement); i * tickIncrement < max; i++) {
          ticks.push(i * tickIncrement)
        }
        return ticks
      })(),
      tickFormatter: (value: number): string => `${value.toFixed(2)}`,
      angle: -45,
      textAnchor: "end",
      tickMargin: 10,
      unit: "$",
    },
    tooltip: {
      content: ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
          const data = payload.find((p: any) => p.dataKey === "close")
          if (!data) return null
          return <TooltipContent {...data.payload} symbol={symbol} />
        }
        return null
      }
    }
  }

  const volumes = {
    yAxis: {
      yAxisId: "volume",
      hide: true,
      domain: ([dataMin, dataMax]: [number, number]) => [0, dataMax * 2.0],
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
        <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 40 }}>
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
          <CartesianGrid horizontal={true} vertical={false} strokeDasharray="3 3" />
          <Area type="monotone" dataKey="close" stroke="var(--color-accent)" fill="url(#priceGradient)" />
          <Bar dataKey="volume" yAxisId="volume" fill="var(--color-accent)" fillOpacity={0.3} barSize={4} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

interface TooltipProps {
  symbol: string;
  date: Date;
  close: number;
  open: number;
  high: number;
  low: number;
  volume: number;
}

function TooltipContent({ symbol, date, close, open, high, low, volume, }: TooltipProps) {
  const cls = {
    container: [
      "border-1 border-border",
      "bg-menu",
      "py-1 px-2",
      "text-sm",
    ],
    table: [
    ],
    header: [
      "text-left text-accent",
    ],
    label: [
      "text-subtext pr-2",
    ],
    value: [
      "text-text text-right",
    ],
  }
  return <div className={clsx(cls.container)}>
    <table className={clsx(cls.table)}>
      <thead>
        <tr>
          <th className={clsx(cls.header)} colSpan={2}>{symbol}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className={clsx(cls.label)}>Date:</td>
          <td className={clsx(cls.value)}>{`${new Date(date).toLocaleDateString("en-US", { day: "numeric", month: "numeric", year: "numeric" })}`}</td>
        </tr>
        <tr>
          <td className={clsx(cls.label)}>Close:</td>
          <td className={clsx(cls.value)}>{`$${close.toFixed(2)}`}</td>
        </tr>
        <tr>
          <td className={clsx(cls.label)}>Open:</td>
          <td className={clsx(cls.value)}>{`$${open.toFixed(2)}`}</td>
        </tr>
        <tr>
          <td className={clsx(cls.label)}>High:</td>
          <td className={clsx(cls.value)}>{`$${high.toFixed(2)}`}</td>
        </tr>
        <tr>
          <td className={clsx(cls.label)}>Low:</td>
          <td className={clsx(cls.value)}>{`$${low.toFixed(2)}`}</td>
        </tr>
        <tr>
          <td className={clsx(cls.label)}>Volume:</td>
          <td className={clsx(cls.value)}>{`${(volume / 1e6).toFixed(1)}M`}</td>
        </tr>
      </tbody>
    </table>
  </div>
}
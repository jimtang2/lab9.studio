"use client"
import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import useHistoricalPrices from "@/state/hooks/useHistoricalPrices"
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
  const prices = useHistoricalPrices({ symbol, startDate, endDate }) || []
  const [loading, setLoading] = useState<boolean>(true)
  const [chartData, setChartData] = useState<{ date: string, close: number }[]>([])

  useEffect(() => {
    setChartData(prices.map(price => ({
      date: new Date(price.date).toLocaleDateString(),
      close: parseFloat(price.close || "0")
    })))
    setLoading(prices.length === 0)
  }, [prices])

  const cls = {
    container: [
      "flex items-center justify-center",
      "h-full w-full"
    ],
    loader: [
      !loading && "hidden",
      "h-16 w-16 border-t-8 animate-spin rounded-full border-accent"
    ],
    chart: [
      "w-full h-50",
      "bg-background-alt",
    ]
  }

  return (
    <div className={clsx(cls.container)}>
      {loading ? (
        <div className={clsx(cls.loader)}></div>
      ) : (
        <ResponsiveContainer className={clsx(cls.chart)}>
          <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="close" stroke="#8884d8" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
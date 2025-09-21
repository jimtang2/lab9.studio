"use client"
import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
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
      "bg-background-alt",
      "h-full w-full"
    ],
    chart: [
      
    ]
  }

  return (
    <div className={clsx(cls.container)}>
  		<Loader show={loading} />
  	  <ResponsiveContainer className={clsx(cls.chart)}>
  	    <LineChart data={chartData} margin={{}}>
  	      <CartesianGrid strokeDasharray="3 3" />
  	      <XAxis dataKey="date" />
  	      <YAxis />
  	      <Tooltip />
  	      <Line type="monotone" dataKey="close" stroke="var(--color-accent, #8884d8)" dot={false} />
  	    </LineChart>
  	  </ResponsiveContainer>
    </div>
  )
}
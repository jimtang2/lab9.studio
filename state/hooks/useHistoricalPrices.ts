import { useEffect, useState } from "react"
import { HistoricalPrice } from "@/db/schema"

interface UseHistoricalPricesProps {
	symbol: string; 
	startDate: Date; 
	endDate: Date;
}

interface UseHistoricalPricesOutput {
	prices: HistoricalPrice[];
	loading: boolean;
}

export default function useHistoricalPrices({ symbol, startDate, endDate }: UseHistoricalPricesProps): UseHistoricalPricesOutput {
	const [prices, setPrices] = useState<HistoricalPrice[]>([])
  const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		setLoading(true)
		const sd = startDate?.toISOString().split("T")[0]
		const ed = endDate?.toISOString().split("T")[0]

		if (!sd || !ed || symbol.length === 0) {
			return
		}

		const u = new URL("/api/historical_prices", window.location.origin)
		u.searchParams.append("sb", symbol)
		u.searchParams.append("sd", sd)
		u.searchParams.append("ed", ed)

		fetch(u.toString())
			.then(resp => resp.json())
			.then(json => {
				setPrices(json)
				setLoading(false)
			})
			.catch(err => {
				console.error(err)
				setLoading(false)
			})
	}, [symbol, startDate, endDate])

	return { loading, prices }
} 
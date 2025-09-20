import { useEffect, useState } from "react"
import { HistoricalPrice } from "@/db/schema"

export default function useHistoricalPrices({ symbol, startDate, endDate }: { symbol: string; startDate: Date; endDate: Date; }): HistoricalPrice[] {
	const [prices, setPrices] = useState<HistoricalPrice[]>([])

	useEffect(() => {
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
			.then(json => setPrices(json))
			.catch(err => console.error(err))
	}, [symbol, startDate, endDate])

	return prices
} 
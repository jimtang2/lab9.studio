import { NextResponse, type NextRequest } from "next/server"
import { db } from "@/db"
import { HistoricalPrices } from "@/db/schema"
import { eq, gte, lte, and, desc, } from "drizzle-orm"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const symbol = searchParams.get('sb')
    const startDate = searchParams.get('sd')
    const endDate = searchParams.get('ed')

    if (!symbol || !startDate || !endDate) {
      return NextResponse.json(
        { error: 'Missing required parameters: sb, sd, ed are all required' },
        { status: 400 }
      )
    }
    // Validate date format (YYYY-MM-DD)
    const startDateParsed = new Date(startDate);
    const endDateParsed = new Date(endDate);
    if (isNaN(startDateParsed.getTime()) || isNaN(endDateParsed.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format for sd or ed; use YYYY-MM-DD' },
        { status: 400 }
      );
    }
    const results = await db
      .select({
        date: HistoricalPrices.date,
        open: HistoricalPrices.open,
        high: HistoricalPrices.high,
        low: HistoricalPrices.low,
        close: HistoricalPrices.close,
        volume: HistoricalPrices.volume,
        // symbol: HistoricalPrices.symbol,
        // interval: HistoricalPrices.interval,
        // splitRatio: HistoricalPrices.splitRatio,
        // vwap: HistoricalPrices.vwap,
        // dividend: HistoricalPrices.dividend,
        // adjClose: HistoricalPrices.adjClose,
        // change: HistoricalPrices.change,
        // changePercent: HistoricalPrices.changePercent,
        // provider: HistoricalPrices.provider,
      })
      .from(HistoricalPrices)
      .where(
        and(
          eq(HistoricalPrices.symbol, symbol),
          gte(HistoricalPrices.date, startDateParsed),
          lte(HistoricalPrices.date, endDateParsed),
        )
      )
      .orderBy(desc(HistoricalPrices.date))
    return NextResponse.json(results, { status: 200 })
  } catch (error) {
    console.error('Query failed:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
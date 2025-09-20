import { NextRequest, NextResponse } from 'next/server'
import { db } from "@/db"
import { Companies, CompanyIndex, Industries, Sectors } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const indexSymbol = searchParams.get('index')

    // Validate required parameter
    if (!indexSymbol) {
      return NextResponse.json(
        { error: 'Missing required parameter: index_symbol is required' },
        { status: 400 }
      )
    }

    // Query companies joined with company_index
    const results = await db
      .select({
        symbol: Companies.symbol,
        name: Companies.name,
        // industry_id: Companies.industry_id,
        // sector_id: Companies.sector_id,
        industry: Industries.name,
        sector: Sectors.name,
      })
      .from(Companies)
      .innerJoin(CompanyIndex, eq(Companies.symbol, CompanyIndex.symbol))
      .leftJoin(Industries, eq(Companies.industry_id, Industries.industry_id))
      .leftJoin(Sectors, eq(Companies.sector_id, Sectors.sector_id))
      .where(eq(CompanyIndex.index_symbol, indexSymbol))

    console.log(`Fetched ${results.length} companies for index_symbol: ${indexSymbol}`)

    return NextResponse.json(results, { status: 200 })
  } catch (error) {
    console.error('Query failed:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
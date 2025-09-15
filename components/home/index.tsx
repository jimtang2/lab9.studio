"use client"
import { useMarketSocket, useSystemSocket } from "@/state/hooks"
import MarketsTable from "@/components/table/MarketsTable"
import SystemWidget from "@/components/widget/SystemWidget"
import clsx from "clsx"

interface HomeProps {
  marketSocketUrl: string;
  systemSocketUrl: string;
}

export default function Home({ marketSocketUrl, systemSocketUrl }: HomeProps) {
  const { ws: marketsWs, markets: marketsMessage, setMarketsResponse } = useMarketSocket(marketSocketUrl)
  const { ws: systemWs, system: systemMessage, setSystemResponse } = useSystemSocket(systemSocketUrl)
  
  const cls = {
    page: [
      "grid grid-cols-1 grid-rows-[min-content_1fr]",
      "sm:grid-cols-3 sm:grid-rows-[min-content_1fr]",
      "xl:grid-cols-4 xl:grid-rows-2",
      "w-[calc(100vw-50px)] h-screen",
      "sm:w-screen sm:h-[calc(100vh-50px)]",
      "p-2 gap-2",
    ],
    marketsTable: [
      "col-start-1 row-start-2",
      "sm:col-start-1 sm:col-span-2 sm:row-start-1",
      "xl:col-start-1 xl:col-span-3 xl:row-start-1",
    ],
    systemWidget: [
      "col-start-1 row-start-1",
      "sm:col-start-3 sm:row-start-1",
      "xl:col-start-4 xl:row-start-1",
    ],
  }

  return (
    <div className={clsx(cls.page)}>
      <MarketsTable className={clsx(cls.marketsTable)} message={marketsMessage} />
      <SystemWidget className={clsx(cls.systemWidget)} message={systemMessage} />
    </div>
  )
}
"use client"
import { memo } from "react"
import { useMarketSocket, useSystemSocket } from "@/state/hooks"
import MarketsTable from "@/components/table/MarketsTable"
import SystemWidget from "@/components/widget/SystemWidget"
import clsx from "clsx"

interface HomeProps {
  marketSocketUrl: string;
  systemSocketUrl: string;
}

export default memo(({ marketSocketUrl, systemSocketUrl }: HomeProps) => {
  const { data: marketsData, ok: marketsOk } = useMarketSocket(marketSocketUrl)
  const { data: systemData, ok: systemOk } = useSystemSocket(systemSocketUrl)
  
  const cls = {
    page: [
      "grid grid-cols-1 grid-rows-1",
      "sm:grid-cols-3 sm:grid-rows-1",
      "xl:grid-cols-4 xl:grid-rows-1",
      "w-[calc(100vw-50px)] h-screen",
      "sm:w-screen sm:h-[calc(100vh-50px)]",
      "p-1 gap-1",
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
      <MarketsTable className={clsx(cls.marketsTable)} message={marketsData} ok={marketsOk} />
      <SystemWidget className={clsx(cls.systemWidget)} message={systemData} ok={systemOk} />
    </div>
  )
})
"use client"
import { memo } from "react"
import { useMarketSocket, useSystemSocket } from "@/state/hooks"
import MarketsTable from "@/components/table/MarketsTable"
import SystemWidget from "@/components/widget/SystemWidget"
import LayoutWidget from "@/components/widget/LayoutWidget"
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
      "grid grid-cols-1 auto-rows-min",
      "sm:grid-cols-[2fr_1fr] sm:grid-rows-1",
      "xl:grid-cols-[3fr_1fr] xl:grid-rows-1",
      "w-[calc(100vw-50px)] h-screen overflow-y-auto",
      "sm:w-screen sm:h-[calc(100vh-50px)] sm:overflow-y-hidden",
      "p-1 gap-1",

    ],
    marketsTable: [
      "col-start-1",
      "sm:col-start-1 sm:col-span-1 sm:row-start-1",
      "xl:col-start-1 xl:col-span-1 xl:row-start-1",
    ],
    systemWidget: [
      "col-start-1",
      "sm:col-start-2 sm:row-start-1",
      "xl:col-start-2 xl:row-start-1",
    ],
    layoutWidget: [
      "col-start-1",
      "sm:col-start-2",
      "xl:col-start-2",
      "bg-red-500",
      "z-20",
    ],
  }

  return (
    <div className={clsx(cls.page)}>
      <MarketsTable className={clsx(cls.marketsTable)} message={marketsData} ok={marketsOk} />
      <SystemWidget className={clsx(cls.systemWidget)} message={systemData} ok={systemOk} />
      <LayoutWidget className={clsx(cls.layoutWidget)} />
    </div>
  )
})
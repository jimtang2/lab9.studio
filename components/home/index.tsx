"use client"
import { memo } from "react"
import { useMarketSocket, useSystemSocket, useCryptoSocket } from "@/state/hooks"
import MarketsTable from "@/components/table/MarketsTable"
import CryptoTable from "@/components/table/CryptoTable"
import SystemWidget from "@/components/widget/SystemWidget"
import ClientWidget from "@/components/widget/ClientWidget"
import clsx from "clsx"

interface HomeProps {
  marketSocketUrl: string;
  systemSocketUrl: string;
  cryptoSocketUrl: string;
}

export default memo(({ marketSocketUrl, systemSocketUrl, cryptoSocketUrl, }: HomeProps) => {
  const { data: marketsData, ok: marketsOk } = useMarketSocket(marketSocketUrl)
  const { data: systemData, ok: systemOk } = useSystemSocket(systemSocketUrl)
  const { data: cryptoData, ok: cryptoOk } = useCryptoSocket(cryptoSocketUrl)
  
  const cls = {
    page: [
      "grid",
      "grid-cols-1 auto-rows-min",
      "sm:grid-cols-[2fr_1fr] sm:grid-rows-2",
      "xl:grid-cols-[3fr_1fr]",
      "w-[calc(100vw-50px)] h-screen overflow-y-auto",
      "sm:w-screen sm:h-[calc(100vh-50px)] sm:overflow-y-hidden",
      "px-[1px] gap-[1px]",
    ],
    marketsTable: [
      "col-start-1",
      "sm:col-start-1 sm:col-span-1 sm:row-start-1",
      "xl:col-start-1 xl:col-span-1 xl:row-start-1",
    ],
    cryptoTable: [
      "col-start-1",
      "sm:col-start-1 sm:col-span-1 sm:row-start-1",
      "xl:col-start-1 xl:col-span-1 xl:row-start-2",
    ],
    systemWidget: [
      "col-start-1",
      "sm:col-start-2 sm:row-start-1",
      "xl:col-start-2 xl:row-start-1",
    ],
    clientWidget: [
      "col-start-1",
      "sm:col-start-2",
      "z-20",
    ],
  }

  return (
    <div className={clsx(cls.page)}>
      <MarketsTable className={clsx(cls.marketsTable)} message={marketsData} ok={marketsOk} />
      <CryptoTable className={clsx(cls.cryptoTable)} message={cryptoData} ok={cryptoOk} />
      <SystemWidget className={clsx(cls.systemWidget)} message={systemData} ok={systemOk} />
      <ClientWidget className={clsx(cls.clientWidget)} />
    </div>
  )
})
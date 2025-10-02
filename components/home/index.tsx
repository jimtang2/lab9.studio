"use client"
import { memo } from "react"
// import { useMarketSocket, useSystemSocket, useCryptoSocket } from "@/state/hooks"
// import MarketsTable from "@/components/table/MarketsTable"
// import CryptoTable from "@/components/table/CryptoTable"
// import SystemWidget from "@/components/widget/SystemWidget"
// import ClientWidget from "@/components/widget/ClientWidget"
import NotesList from "@/components/notes/NotesList"
import { Note } from "@/db/schema"
import clsx from "clsx"

interface HomeProps {
  marketSocketUrl: string;
  systemSocketUrl: string;
  cryptoSocketUrl: string;
  notes: Note[];
}

export default memo(({ marketSocketUrl, systemSocketUrl, cryptoSocketUrl, notes, }: HomeProps) => {
  // const { data: marketsData, ok: marketsOk } = useMarketSocket(marketSocketUrl)
  // const { data: systemData, ok: systemOk } = useSystemSocket(systemSocketUrl)
  // const { data: cryptoData, ok: cryptoOk } = useCryptoSocket(cryptoSocketUrl)
  
  const cls = {
    page: [
      "grid",
      "grid-cols-1 grid-rows-[44px_auto]",
      "sm:grid-cols-[3fr_1fr] sm:grid-rows-1",
      "xl:grid-cols-[1fr_4fr_1fr]",
      "xl:overflow-hidden",
      "h-full max-h-full",
      "sm:border-t-1 border-border",
    ],
    content: [
      "col-start-1 col-end-[-1] row-start-2 row-end-[-1]",
      "sm:col-start-1 sm:col-end-[-2] sm:row-start-1 sm:row-end-[-1]",
      "xl:col-end-[-2]",
      "sm:pointer-events-auto",
      "sm:border-l-1 sm:border-border",
      "xl:border-r-1 xl:pb-[88px]",
      "transition-all transition-transform duration-150",
      "mx-0 px-0 sm:px-2 sm:mx-0 sm:py-6",
      "h-full sm:max-h-full sm:max-h-screen max-w-full",
      "overflow-x-hidden overflow-y-auto",      
    ],
    notes: [
      // "col-start-1 row-start-2",
      "sm:col-start-2 sm:col-span-1 sm:row-start-1",
      "xl:col-start-3",
      "h-full sm:max-h-[calc(100vh-50px)] sm:max-h-screen max-w-full",
    ],
    // marketsTable: [
    //   "col-start-1",
    //   "sm:col-start-1 sm:col-span-1 sm:row-start-1",
    //   "xl:col-start-1 xl:col-span-1 xl:row-start-1",
    //   "border-1 border-border",
    // ],
    // cryptoTable: [
    //   "col-start-1",
    //   "sm:col-start-1 sm:col-span-1 sm:row-start-1",
    //   "xl:col-start-1 xl:col-span-1 xl:row-start-1",
    //   "border-1 border-t-0 border-border",
    // ],
    // systemWidget: [
    //   "col-start-1",
    //   "sm:col-start-2 sm:row-start-1",
    //   "xl:col-start-2 xl:row-start-1",
    //   "border-1 border-t-0 sm:border-l-0 border-border",
    // ],
    // clientWidget: [
    //   "col-start-1",
    //   "sm:col-start-2",
    //   "border-1 border-t-0 sm:border-t-1 sm:border-l-0 border-border",
    // ],
  }

  return (
    <div className={clsx(cls.page)}>
      {/*<MarketsTable className={clsx(cls.marketsTable)} 
        message={marketsData} 
        ok={marketsOk} />*/}
      {/*<CryptoTable className={clsx(cls.cryptoTable)} 
        message={cryptoData} 
        ok={cryptoOk} />*/}
      {/*<ClientWidget className={clsx(cls.clientWidget)} />*/}
      {/*<SystemWidget className={clsx(cls.systemWidget)} 
        message={systemData} 
        ok={systemOk} />*/}
      <div className={clsx(cls.content)}>content</div>
      <div className={clsx(cls.notes)}>
        <NotesList notes={notes} /> 
      </div>
      

    </div>
  )
})
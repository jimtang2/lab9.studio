"use client"
import { memo } from "react"
import clsx from "clsx"

interface DataProps {
}

export default memo(({ }: DataProps) => {
  
  const cls = {
    page: [
      "grid grid-cols-1 auto-rows-auto",
      "sm:grid-cols-[1fr_2fr] sm:grid-rows-2",
      "xl:grid-cols-[1fr_2fr_1fr] xl:grid-rows-1",
      "w-full h-full",
      "max-w-[calc(100vw-50px)] max-h-screen",
      "sm:max-w-screen sm:max-h-[calc(100vh-44px)]",
      "overflow-hidden",
      "gap-[1px]",
    ],
    nav: [
      "col-start-1",
      "sm:col-start-1 sm:row-span-2",
      "xl:col-start-1",
      "bg-background",
    ],
    chart: [
      "col-start-1",
      "sm:col-start-2",
      "xl:col-start-2",
      "bg-background",
    ],
    metadata: [
      "col-start-1",
      "sm:col-start-2",
      "xl:col-start-3",
      "bg-background",
    ],
  }

  return (
    <div className={clsx(cls.page)}>
      <div className={clsx(cls.nav)}>
        
      </div>
      <div className={clsx(cls.chart)}>
        
      </div>
      <div className={clsx(cls.metadata)}>
        
      </div>
    </div>
  )
})
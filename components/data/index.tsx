"use client"
import { memo } from "react"
import clsx from "clsx"

interface DataProps {
}

export default memo(({ }: DataProps) => {
  
  const cls = {
    page: [
      "grid grid-cols-1 grid-rows-[min-content_min-content_auto]",
      "sm:grid-cols-[1fr_2fr] sm:grid-rows-[min-content_auto]",
      "xl:grid-cols-[1fr_2fr_1fr] xl:grid-rows-[min-content_auto]",
      // "xl:grid-cols-[1fr_1fr_3fr] xl:grid-rows-1",
      "w-[calc(100vw-50px)] h-screen",
      "sm:w-screen sm:h-[calc(100vh-50px)]",
      "overflow-x-hidden overflow-y-auto",
      "gap-[1px]",
    ],
    categories: [
      "col-start-1 col-span-1 row-start-1 row-span-1",
      "sm:col-start-1 sm:col-span-1 sm:row-start-1 sm:row-span-2",
      // "xl:col-start-1 xl:col-span-1 xl:row-start-1",
      "min-h-12",
      "bg-background",
      // "bg-red-300",
    ],
    subcategories: [
      "col-start-1 col-span-1 row-start-2 row-span-1",
      "sm:col-start-2 sm:col-span-1 sm:row-start-1 sm:row-span-1",
      "xl:col-start-2 xl:col-span-2 xl:row-start-1",
      "min-h-12",
      "bg-background",
      // "bg-purple-300",
    ],
    main: [
      "col-start-1 col-span-1 row-start-3 row-span-1",
      "sm:col-start-2 sm:col-span-1 sm:row-start-2 sm:row-span-1",
      "xl:col-start-2 xl:col-span-2 xl:row-start-2 sm:row-span-1",
      // "xl:col-start-3 xl:col-span-1 xl:row-start-1",
      // "bg-blue-400",
    ],
  }

  return (
    <div className={clsx(cls.page)}>
      <div className={clsx(cls.categories)}></div>
      <div className={clsx(cls.subcategories)}></div>
      <div className={clsx(cls.main)}></div>
    </div>
  )
})
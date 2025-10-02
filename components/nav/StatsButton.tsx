"use client"
import { useSystemSocket } from "@/state/hooks"
import { useState, useEffect } from "react"
import { useStore } from "@/state/store"
import InfoIcon from "/public/heroicons/outline/information-circle.svg"
import SystemWidget from "@/components/widget/SystemWidget"

import clsx from "clsx"

interface StatsButtonProps {
  id?: string;
  className?: string;
  systemSocketUrl: string;
}

export default function StatsButton({ id="", className="", systemSocketUrl }: StatsButtonProps) {
  const {
    showStats, setShowStats,
  } = useStore(state => state)

  const { data: systemData, ok: systemOk } = useSystemSocket(systemSocketUrl)

  const cls = {
    button: [
      "hidden sm:flex flex-row items-center justify-center gap-0 sm:gap-1",
      "text-subtext ",,
      "transition-all duration-150",
      "pointer-events-auto",
      showStats && "bg-menu",
      className,
    ],
    text: [
      "text-sm",
      "hidden sm:inline-block",
      "whitespace-nowrap overflow-x-hidden text-ellipsis",
      showStats && "text-accent",
    ],
    icon: [
      showStats && "text-accent",
    ],
    widget: [
      "absolute top-[45px] right-1",
      "max-w-100",
      showStats ? [
        "max-h-full opacity-100",
        "pointer-events-auto",
      ] : [
        "max-h-0 opacity-0",
        "pointer-events-none",
      ],
      "transition-all duration-150",
      "border-1 border-border",
    ],
  }

  const handleClick = () => {
    setShowStats(!showStats)
  }

  return <>
    <button className={clsx(cls.button)}
      onClick={handleClick}
      id={id} 
      title="" 
      tabIndex={-1}>
      <InfoIcon className={clsx(cls.icon)} />
      <span className={clsx(cls.text)}>Stats</span>
    </button>
    <SystemWidget className={clsx(cls.widget)} 
        message={systemData} 
        ok={systemOk} />
  </>
}

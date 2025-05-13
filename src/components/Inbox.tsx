"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { useInboxStore, InboxItemProps } from "@/lib/store"

export default function InboxView() {
  const { show, items } = useInboxStore()
	const [ display, setDisplay ] = useState(false)

  useEffect(() => {
  	setDisplay(show)
  }, [show])

  return (
    <div id="inbox-view" 
      className={`absolute top-[45px] right-[1px]
        bg-background-dk 
        border-1 border-divider rounded-sm shadow-xl
	      divide-y-1 divide-divider
        w-[320px] px-2
        ${show ? "flex flex-col" : "hidden"}
      	${display ? "opacity-100" : "opacity-0"}
      	transition-[opacity] duration-300
    		overflow-y-scroll
    		max-h-screen`}>
      {items.length === 0 ? <div>Nothing to show</div> : items.map((inboxItemProps: InboxItemProps, idx: number) => <InboxItem key={idx} {...inboxItemProps} />)}
    </div>)
}

function InboxItem({message, type, isRead, time}: InboxItemProps) {
	return (
		<div className={`flex flex-row items-center gap-3
			p-3`}>
			<Image src="/heroicons/outline/information-circle.svg" alt="inbox info icon" width={24} height={24} />
			<span>{message}</span>
		</div>)
}
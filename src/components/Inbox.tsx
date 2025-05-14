"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { useMenuStore, useInboxStore, InboxItem as InboxItemProps } from "@/lib/store"

export default function Inbox() {
  const { show: showMenu } = useMenuStore()
  const { show: showInbox, items } = useInboxStore()
	const [ animate, setAnimate ] = useState(false)
	const [ show, setShow ] = useState(false)

  useEffect(() => {
  	setAnimate(true)
  	setShow(showInbox)
		const timer = setTimeout(() => setAnimate(false), 50)
		return () => clearTimeout(timer)
  }, [showInbox])

  let count = items.filter(({ isRead}) => isRead === false).length

  return (
    <div id="inbox-view" 
      className={`
      	fixed top-[44px] right-0 z-40
      	sm:relative sm:top-[0px]
      	sm:w-[250px] sm:min-w-[250px] sm:max-w-[250px] 
      	h-full min-h-[calc(100vh-44px)] max-h-[calc(100vh-44px)]
      	${showMenu ? "w-[calc(100vw-60px)]" : "w-screen"}
      	${animate ? "transition-[margin-right] ease-in-out" : ""}
      	${show ? "mr-0" : "mr-[-100%] sm:mr-[-250px]"}      	
        bg-background-lt
        border-l border-l-divider
      	overscroll-auto
	      overflow-y-scroll`}>
    	<div className={`relative flex flex-col
        w-full h-full`}>

    		{count > 0 ? 
	    		items.map((inboxItemProps: InboxItemProps, idx: number) => 
	    			<InboxItem key={`${idx}-${inboxItemProps.time instanceof Date ? inboxItemProps.time.getTime() : inboxItemProps.time}`} {...inboxItemProps} index={idx} />) : 
	    		
    		<InboxItem title="Inbox" message="Clear 🙂" type="info" time={new Date()} isRead={false} index={-1} />}
    	</div>
    </div>)
}

type _InboxItemProps = InboxItemProps & {
	index: number
}

function InboxItem({title, message, type, time, isRead, index = -1}: _InboxItemProps) {
	const [ hydrated, setHydrated ] = useState(false)
	const [ animate, setAnimate ] = useState(false)
	const { markItemAtIndexAsRead } = useInboxStore()

	useEffect(() => {
		if (!animate) return
    const timer = setTimeout(() => markItemAtIndexAsRead(index), 300)
    return () => clearTimeout(timer)
  }, [animate])

	useEffect(() => setHydrated(true), [])

	if (isRead === true) {
		return <></>
	}

	let formattedTime = ""
	if (hydrated) {
		if (typeof time === "string") {
			formattedTime = new Date(time).toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit', hour12: true})
		} else if (time instanceof Date) {
			formattedTime = time.toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit', hour12: true})
		}
	}

	return (
		<div className={`flex flex-col items-stretch gap-2
			p-2 sm:p-2 bg-background-lt
			border-b-1 border-b-divider
			transition-opacity ease-linear 
			${animate ? "opacity-0" : "opacity-100"}`}>
			<div className={`relative flex flex-row items-center`}>
				<div className="font-bold flex-grow-1 whitespace-pre">{title}</div>
				{index === -1 ? <></> : 
				<button className={`absolute right-[5px] top-[0px] bg-background-lt`} 
					onClick={() => setAnimate(true)} 
					type="button">
					<Image src={"/heroicons/outline/x-mark.svg"} 
						alt="inbox icon" width={20} height={20} />					
				</button>}
			</div>
			<div className={`whitespace-pre-wrap text-sm`}>
				{message}
			</div>
			<div className="self-end text-xs px-2">{formattedTime}</div>
		</div>)
}
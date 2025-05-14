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
		const timer = setTimeout(() => setAnimate(false), 400)
		return () => clearTimeout(timer)
  }, [showInbox])

  let count = items.filter(({ isRead}) => isRead === false).length

  return (
    <div id="inbox-view" 
      className={`
      	absolute z-40
      	top-[0px] right-0 

      	sm:relative 
      	sm:w-[20%] sm:min-w-[200px] sm:max-w-[240px]
      	h-[calc(100vh-44px)] max-h-[calc(100vh-44px)]
      	${showMenu ? "w-[calc(100vw-60px)]" : "w-screen"}

      	sm:opacity-100
      	${animate ? "transition-opacity ease-in-out duration-400" : ""}
      	${show ? "opacity-100" : "opacity-0"}      	
         
        bg-background-lt
        border-l border-l-divider
      	overscroll-auto
	      overflow-y-scroll`}>

    	<div className={`relative flex flex-col
        w-full h-full
      	transition-[opacity] duration-300`}>

    		{count > 0 ? 
	    		items.map((inboxItemProps: InboxItemProps, idx: number) => 
	    			<InboxItem key={idx} {...inboxItemProps} index={idx} />) : 
	    		
    		<InboxItem title="Inbox" message="Clear 🙂" type="info" time={new Date()} isRead={false} index={-1} />}
    	</div>
    </div>)
}

type _InboxItemProps = InboxItemProps & {
	index: number
}

function InboxItem({title, message, type, time, isRead, index = -1}: _InboxItemProps) {
	const [ pendingRemove, setPendingRemove ] = useState(false)
	const { markItemAtIndexAsRead } = useInboxStore()

	function handleClickXMark() {
		setPendingRemove(true)
	}

	useEffect(() => {
		if (!pendingRemove) return
    const timer = setTimeout(() => {
      markItemAtIndexAsRead(index)
    }, 200)

    return () => clearTimeout(timer)
  }, [pendingRemove])

	if (isRead === true) {
		return <></>
	}

	return (
		<div className={`flex flex-col items-stretch gap-2
			p-4 bg-background-lt
			sm:p-2
			border-b-1 border-b-background-dk
			transition-opacity ease-linear duration-300 
			${pendingRemove ? "opacity-0" : "opacity-100"}`}>
			<div className={`relative flex flex-row items-center gap-1`}>
				<span className="font-bold flex-grow-1 whitespace-pre">{title}</span>
				<button className={`${index === -1 ? "hidden" : ""} absolute right-[5px] top-[0px]`} onClick={handleClickXMark} type="button">
					<Image src={"/heroicons/outline/x-mark.svg"} 
						alt="inbox icon" width={20} height={20} />					
				</button>
			</div>
			<div className={`whitespace-pre-wrap text-sm`}>
				{message}
			</div>
		</div>)
}
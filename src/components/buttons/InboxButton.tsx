"use client"
import Image from "next/image"
import { useInboxStore } from "@/lib/store"

export default function InboxButton() {
  const { show, toggleShow } = useInboxStore()

  const handleClick = () => {
    toggleShow()
  }

  return (
    <li id="inbox-icon" className={`relative
      flex justify-center items-center 
      self-stretch place-self-stretch
      sm:hidden`}>
      <button className="p-2 hover:bg-background-lt cursor-pointer"
        onClick={handleClick}>
        <Image className="" 
          src={"/heroicons/solid/inbox.svg"} 
          alt={"Inbox"} 
          width={26} height={26}/>
        <Badge />
      </button>
    </li>
  )
}

function Badge() {
  const { items } = useInboxStore()

  const count = items.filter(({isRead}: {isRead: boolean}) => !isRead).length

  return (
    <div id="inbox-icon-badge" className={`absolute bg-accent w-5 h-5 rounded-[50%] border-1 border-accent text-text-contrast text-sm text-center font-bold top-[2px] right-[2px] z-44 ${count === 0 && "hidden"}`}>
      {count}
    </div>)
}

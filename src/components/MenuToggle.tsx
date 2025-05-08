"use client"
import Image from "next/image"
import { useMenuStore } from "@/lib/store"

export default function MenuToggle() {
  const { show, toggleShow } = useMenuStore()

  return (
    <li className={`      
      flex justify-center items-center 
      self-stretch place-self-stretch`}>
      <button 
        onClick={toggleShow}
        className="p-2 hover:bg-background-hl rounded-sm">
        <Image 
          className="" 
          src={"/heroicons/outline/bars-3.svg"} 
          alt={"Menu"} 
          width={30} height={30}/>
      </button>
    </li>
  )
}


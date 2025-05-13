"use client"
import Image from "next/image"
import { useMenuStore } from "@/lib/store"

export default function MenuToggle() {
  const { show, toggleShow } = useMenuStore()

  return (
    <li className={`      
      flex justify-center items-center 
      self-stretch place-self-stretch
      sm:hidden`}>
      <button 
        onClick={toggleShow}
        className="p-2 hover:bg-background-lt cursor-pointer">
        <Image 
          className="" 
          src={"/heroicons/outline/bars-3.svg"} 
          alt={"Menu"} 
          width={26} height={26}/>
      </button>
    </li>
  )
}


"use client"
import Image from "next/image"
import { useStore } from "@/lib/store"

export default function MenuButton() {
  const { showMenu, toggleMenu } = useStore()

  const handleClick = () => {
    toggleMenu()
  }

  return (
    <li className={`      
      flex justify-center items-center 
      self-stretch place-self-stretch`}>
      <button 
        onClick={handleClick}
        className="p-2 hover:bg-background-hl rounded-sm">
        <Image 
          className="" 
          src={"/bars-3.svg"} 
          alt={"Menu"} 
          width={30} height={30}/>
      </button>
    </li>
  )
}


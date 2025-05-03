import Image from "next/image"

import {headers} from "next/headers"


export default async function Footer() {  
  const headersList = await headers()
  const currentPath = headersList.get("x-pathname")  

  return (
    <footer className="
      flex flex-row 
      justify-center
      items-center

      w-[calc(100vw-2px)]
      h-[44px]
      m-px
      px-4
      z-10

      sm:justify-end sm:items-center 
      
      ">
      <ul className="flex flex-row gap-4 text-sm">
        <li>lab9.studio © 2025</li>
        <li><a href="/terms" className={`${currentPath == "/terms" ? "underline font-bold" : ""}`}>Terms</a></li> 
        <li><a href="/privacy" className={`${currentPath == "/privacy" ? "underline font-bold" : ""}`}>Privacy</a></li> 

        <li>
          <a href="https://github.com/jimtang2">
            <Image alt="github icon" src="/github.svg" width={21} height={21}/>
          </a>
        </li>
        <li>
          <a href="https://x.com/jimtang92">
            <Image alt="x icon 1" src="/x.svg" width={21} height={21}/>
          </a>
        </li>
      </ul>
    </footer>
  )
}

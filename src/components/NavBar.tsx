import Image from "next/image"
import MenuToggle from "./MenuToggle"
import ColorThemeToggle from "./ColorThemeToggle"
import GithubLink from "./GithubLink"

export default function NavBar() {
  return (
  <nav className={`
    sticky
    w-screen h-[44px] top-[0px] z-20
    px-2 sm:px-4
    bg-background-lt
    border-b border-divider
  `}>
    <ul className={`
      flex flex-row gap-1
      h-full
      items-center
      justify-start
    `}>
      <MenuToggle />
      <div className="flex-grow-1"></div>
      <ColorThemeToggle />
      <GithubLink />
    </ul>
  </nav>)
}

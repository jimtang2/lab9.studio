import Image from "next/image"
import MenuButton from "./MenuButton"
import ColorThemeToggle from "./ColorThemeToggle"
import GithubLink from "./GithubLink"

export default function NavBar() {
  return (
  <nav className={`
    sticky
    w-screen h-[44px] top-[0px] z-20
    px-2
    bg-background-lt
    border-b border-divider
  `}>
    <ul className={`
      flex flex-row gap-1
      h-full
      items-center
      justify-start
    `}>
      <MenuButton />
      <div className="flex-grow-1"></div>
      <ColorThemeToggle />
      <GithubLink />
      <div className="sm:w-2"></div>
    </ul>
  </nav>)
}

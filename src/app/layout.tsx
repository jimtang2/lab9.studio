import type { Metadata } from "next"

import "./globals.css"

import NavBar from "@/components/NavBar"
import Menu from "@/components/Menu"

export const metadata: Metadata = {
  title: "lab9.studio",
  description: "built by jimtang",
}

const menuItems = [
  {
    id: "home",
    type: "link",
    href: "/",
    alt: "home icon",
    icon: "/heroicons/outline/home.svg",
    label: "Home",
  },
  {
    id: "deck",
    type: "link",
    href: "/deck",
    alt: "deck icon",
    icon: "/heroicons/outline/square-3-stack-3d.svg",
    label: "On Deck",
  },
  {
    id: "divider-1",
    type: "divider"
  },
  {
    id: "preferences",
    type: "link",
    href: "/preferences",
    alt: "preferences icon",
    icon: "/heroicons/outline/cog.svg",
    label: "Preferences",
  },
  {
    id: "about",
    type: "group",
    alt: "about icon",
    icon: "/heroicons/outline/question-mark-circle.svg",
    label: "About",
  },
  {
    id: "contact",
    type: "link",
    parentId: "about",
    href: "/about/contact",
    alt: "contact icon",
    icon: "/heroicons/outline/at-symbol.svg",
    label: "Contact",
  },
  {
    id: "terms",
    type: "link",
    parentId: "about",
    href: "/about/terms",
    alt: "about icon",
    icon: "/heroicons/outline/cursor-arrow-ripple.svg",
    label: "Terms of Use",
  },
  {
    id: "privacy",
    type: "link",
    parentId: "about",
    href: "/about/privacy",
    alt: "privacy icon",
    icon: "/heroicons/outline/clipboard-document-check.svg",
    label: "Privacy Policy",
  },
]

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={`
        antialiased 
        flex flex-col
        bg-background
        overflow-x-hidden
        `}>
        <div id="layout" className={`
          flex flex-col`}>
          <NavBar />
          <div id="content" className={`
            flex flex-row
            min-h-[calc(100vh-44px)]`}>
            <Menu items={menuItems}/>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}

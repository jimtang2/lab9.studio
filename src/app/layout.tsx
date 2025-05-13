import type { Viewport, Metadata } from "next"

import "./globals.css"

import DarkModeAgent from "@/components/DarkModeAgent"
import AutoHideMenu from "@/components/AutoHideMenu"
import NavBar from "@/components/NavBar"
import Menu, { MenuItemProps } from "@/components/Menu"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "lab9.studio",
  description: "built by jimtang",
}

const menuItems: MenuItemProps[] = [
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
    id: "contact",
    type: "link",
    href: "/about/contact",
    alt: "contact icon",
    icon: "/heroicons/outline/at-symbol.svg",
    label: "Contact",
  },
  {
    id: "divider-2",
    type: "divider"
  },
  {
    id: "about",
    type: "group",
    alt: "about icon",
    icon: "/heroicons/outline/question-mark-circle.svg",
    label: "About",
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
      <DarkModeAgent />
      <AutoHideMenu />

      <body className={`
        antialiased 
        flex flex-col
        bg-background
        overflow-x-hidden
        
        `}>
        <div id="layout" className={`
          flex flex-col
          min-h-screen`}>
          <NavBar />
          <div id="content" className={`
            flex flex-row flex-grow-1 items-stretch`}>
            <Menu items={menuItems}/>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}

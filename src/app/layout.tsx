import "./globals.css"

import type { Viewport, Metadata } from "next"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
}

export const metadata: Metadata = {
  title: "lab9.studio",
  description: "built by jimtang",
}

import DarkModeAgent from "@/components/DarkModeAgent"
import AutoHideMenu from "@/components/AutoHideMenu"
import NavBar from "@/components/NavBar"
import Menu, { menuItems } from "@/components/Menu"

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <DarkModeAgent />
      <AutoHideMenu />

      <body className={`
        antialiased 
        flex flex-col
        bg-background-lt
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

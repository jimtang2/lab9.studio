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
import {AutoHideMenu, AutoHideInbox} from "@/components/AutoHide"
import NavBar from "@/components/NavBar"
import Menu from "@/components/Menu"
import Inbox from "@/components/Inbox"

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <DarkModeAgent />
      <AutoHideMenu />
      <AutoHideInbox />

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
          <div id="content" className={`relative
            flex flex-row flex-grow-1 items-stretch`}>
            <Menu />
            {children}
            <Inbox />
          </div>
        </div>
      </body>
    </html>
  )
}

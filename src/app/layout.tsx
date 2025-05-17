import "./globals.css"

import type { Viewport, Metadata } from "next"

import { NavBar, Menu, Inbox } from "@/components/layout"
import { DarkMode, AutoHideMenu, AutoHideInbox } from "@/components/agents"

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

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={`antialiased flex flex-col bg-background-lt overflow-x-hidden`}>
        <DarkMode />
        <AutoHideMenu />
        {/*<AutoHideInbox />*/}
        <div id="layout" className={`flex flex-col min-h-screen`}>
          <NavBar />
          <div id="content" className={`relative flex flex-row flex-grow-1 items-stretch`}>
            <Menu />
            {children}
            <Inbox />
          </div>
        </div>
      </body>
    </html>
  )
}

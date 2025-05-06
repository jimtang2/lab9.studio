import type { Metadata } from "next"

import "./globals.css"

import NavBar from "@/components/NavBar"
import Menu from "@/components/Menu"

export const metadata: Metadata = {
  title: "lab9.studio",
  description: "built by jimtang",
}

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
            <Menu />
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}

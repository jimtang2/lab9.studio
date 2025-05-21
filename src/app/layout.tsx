import "./globals.css"

import type { Viewport, Metadata } from "next"

import Dynamic from "@/components/dynamic"
import { Toolbar, Navbar, Notifications } from "@/components/bar"

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
      <Dynamic />
      <body className="">
        <Toolbar className="top-bar" />
        <Navbar className="left-bar" />
        <Notifications className="right-bar" />
        {children}
      </body>
    </html>
  )
}

import type { Viewport, Metadata } from "next"
import Toolbar from "@/components/toolbar"

import "@/css/globals.css"

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
      <body>
        <Toolbar />
        {children}
      </body>
    </html>
  )
}

export const dynamic = "force-dynamic"

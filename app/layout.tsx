import type { Viewport, Metadata } from "next"
import Nav from "@/components/nav"
import BrowserCheck from "@/components/layout/BrowserCheck"
import clsx  from "clsx"
import "@/styles/global.css"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "dark light",
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: "#e5e5e5" },
    { media: '(prefers-color-scheme: dark)', color: "#171717" },
  ],
}

export const metadata: Metadata = {
  title: {
    template: `%s | lab9.studio${process.env.NODE_ENV==="development"?" [dev]": ""}`,
    default: `lab9.studio${process.env.NODE_ENV==="development"?" [dev]": ""}`,
  },
  description: "built by jimtang",
  creator: "jimtang",

}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {  
  const cls = {
    html: [
      "text-text",
      "[font-family:_Work,_sans-serif]",
      "max-w-screen",
      "overscroll-none",
    ],
    body: [
      "flex flex-row sm:flex-col",
      "h-screen w-screen",
      "max-w-screen",
      "gap-[1px]",
      "overscroll-none",
      "overflow-hidden",
    ],
    nav: [
      "sm:sticky sm:top-0",
      "sm:z-10",
      "overscroll-none",
    ],
  }

  const navProps = {
    systemSocketUrl: process.env.WS_SYSTEM_URL || "",
  }

  return <html lang="en" className={clsx(cls.html)}>
    <body className={clsx(cls.body)}>
      <Nav className={clsx(cls.nav)} {...navProps}/>
      {children}
    </body>
    <BrowserCheck />
  </html>
}

import type { Viewport, Metadata } from "next"
import Nav from "@/components/nav"
import BrowserCheck from "@/components/layout/BrowserCheck"
import clsx  from "clsx"
import "@/styles/global.css"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // maximumScale: 2,
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
      "bg-background text-text",
      "[font-family:_Work,_sans-serif]",
      "max-w-screen",
      "max-h-safe",
      "overscroll-none",
    ],
    body: [
      "flex flex-row sm:flex-col",
      "h-screen w-screen",
      "max-w-screen",
      "gap-[1px]",
      "overscroll-none",
    ],
    nav: [
      "sm:sticky sm:top-0",
      "sm:z-10",
      "max-h-safe",
      "overscroll-none",
    ],
    main: [
      "max-w-[calc(100%-44px)]",
      "sm:max-w-full sm:max-h-[calc(100%-44px)]",
      "w-full h-full",
      "overflow-hidden",
      "overscroll-none",
      "pb-safe",
    ],
  }

  return <html lang="en" className={clsx(cls.html)}>
    <body className={clsx(cls.body)}>
      <Nav className={clsx(cls.nav)}/>
      <main className={clsx(cls.main)}>{children}</main>
    </body>
    <BrowserCheck />
  </html>
}

  // general markup rules:
  // 1. layout declares the grid layouts (for responsiveness) and components;
  // 2. layout components are shared by descendant pages;
  // 3. page components are not;
  // 4. all components (page and layout) are responsible for declaring their own position within the grid they belong;
  // 
  // additional rules for code organization:
  // 1. animation uses tailwind

import type { Viewport, Metadata } from "next"
import Nav from "@/components/nav"
import User from "@/components/user"
import clsx  from "clsx"
import "@/styles/global.css"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 2,
  viewportFit: "cover",
  colorScheme: "dark light",
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: "#e5e5e5" },
    { media: '(prefers-color-scheme: dark)', color: "#171717" },
  ],
}

export const metadata: Metadata = {
  title: {
    template: "%s | lab9.studio",
    default: "lab9.studio",
  },
  description: "built by jimtang",
  creator: "jimtang",

}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {  
  const cls = {
    html: [
      "bg-background text-text",
      "[font-family:_Work,_sans-serif]",
      "max-h-screen max-w-screen",
    ],
    body: [
      // 50px width side nav on mobile
      // 50px height top nav on desktop
      [
        "grid overflow-hidden",
        "grid-cols-[50px_auto_50px] grid-rows-[50px_auto]",
        "h-screen w-screen max-h-screen max-w-screen",
        "bg-background",
      ],
      [
        "sm:grid-cols-[auto_max-content_min-content] sm:grid-rows-[50px_auto]",
      ],
    ],
    nav: [
      [
        "col-start-1 col-end-2 row-start-1 row-end-[-1]",
        "sm:col-start-1 sm:col-end-[-1] sm:row-start-1 sm:row-end-2",
      ],
    ],
    user: [
      [
        "col-start-3 row-start-1",
      ],
      [
        "sm:col-start-[-2] sm:row-start-1",
      ],
    ],
    main: [
      [
        "col-start-1 col-end-[-1] row-start-1 row-end-[-1]",
        "overflow-hidden",
      ],
      [
        "sm:col-start-1 sm:col-end-[-1] sm:row-start-2 sm:row-end-[-1]",
      ],
    ],
  }

  return <html lang="en" className={clsx(cls.html)}>
    <body className={clsx(cls.body)}>
      <Nav className={clsx(cls.nav)}/>
      <User className={clsx(cls.user)}/>
      <main className={clsx(cls.main)}>{children}</main>
    </body>
  </html>
}

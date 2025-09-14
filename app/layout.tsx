import type { Viewport, Metadata } from "next"
import Nav from "@/components/nav"
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
      "flex flex-row sm:flex-col",
      "h-screen w-screen max-h-screen max-w-screen",
      "bg-background",
    ],
    nav: [
      "sm:sticky sm:top-0",
      "sm:z-10",
    ],
    main: [
      "max-w-[calc(100%-50px-1*var(--spacing))] overflow-x-hidden",
      "sm:max-w-full sm:w-full sm:max-h-screen sm:overflow-y-hidden",
    ],
  }

  return <html lang="en" className={clsx(cls.html)}>
    <body className={clsx(cls.body)}>
      <Nav className={clsx(cls.nav)}/>
      <main className={clsx(cls.main)}>{children}</main>
    </body>
  </html>
}

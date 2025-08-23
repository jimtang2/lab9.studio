import type { Viewport, Metadata } from "next"
import { Body, Main } from "@/components/layout"
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
    { media: '(prefers-color-scheme: light)', color: "#e5e7eb" },
    { media: '(prefers-color-scheme: dark)', color: "#262626" },
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
  // general markup rules:
  // 1. layout declares the grid layouts (for responsiveness) and components;
  // 2. layout components are shared by descendant pages;
  // 3. page components are not;
  // 4. all components (page and layout) are responsible for declaring their own position within the grid they belong;
  // 
  // additional rules for code organization:
  // 1. animation uses tailwind

  const cls = [
    "bg-background-primary text-text-primary",
    "[font-family:_Work,_sans-serif]",
  ]

  return <html lang="en" className={clsx(cls)}>
    <Body>
      <Nav />
      <Main>{children}</Main>
    </Body>
  </html>
}

import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";

import "./globals.css";

import {Suspense} from "react"

import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import AnimatedBackground from "@/components/AnimatedBackground"
import LoaderTrigger from "@/components/LoaderTrigger"
import Loading from "./loading"

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "lab9.studio",
  description: "built by jimtang",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={`${workSans.variable} 
      antialiased 
      flex flex-col
      overflow-hidden
      w-full
      h-screen
        `}>
        <Suspense fallback={<Loading />}>
          <LoaderTrigger />
          <AnimatedBackground />
        </Suspense>

        <div className={`
          fixed 
          top-0
          w-full 
          h-full 
          overflow-x-scroll
        `}>
        <Navigation />
        {children}
        <Footer />
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from "next"
import Data from "@/components/data"

export const metadata: Metadata = {
  title: "Data",
}

export default function DataPage() {

  return <Data />
}

export const dynamic = "force-dynamic"
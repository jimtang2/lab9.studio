import type { Metadata } from "next"
import Charts from "@/components/chart"

export const metadata: Metadata = {
  title: "Charts",
}

export default function ChartsPage() {
  return <Charts />
}

export const dynamic = "force-dynamic"
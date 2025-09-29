import type { Metadata } from "next"
import Page from "@/components/tg/Page"

export const metadata: Metadata = {
  title: "Telegram",
}

export default async function TelegramPage() {
  return <Page />
}

export const dynamic = "force-dynamic"


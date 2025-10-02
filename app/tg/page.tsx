import type { Metadata } from "next"
import TelegramApp from "@/components/tg/Page"

export const metadata: Metadata = {
  title: "Telegram",
}

export default async function TelegramPage() {
  return <TelegramApp />
}

export const dynamic = "force-dynamic"


import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Telegram",
}

export default async function TelegramPage() {
  return <div>Telegram</div>
}

export const dynamic = "force-dynamic"
import Main from "@/components/layout/Main"
import Home from "@/components/home"
import { getNotes } from "@/state/global/notes"

export default async function HomePage() {
  const notes = await getNotes()
  const props = {
    marketSocketUrl: process.env.WS_MARKETS_URL || "",
    systemSocketUrl: process.env.WS_SYSTEM_URL || "",
    cryptoSocketUrl: process.env.WS_CRYPTO_URL || "",
    notes: notes,
  }

  return <Main><Home {...props} /></Main>
}

export const dynamic = "force-dynamic"
import Home from "@/components/home"

export default function HomePage() {
  const marketSocketUrl = process.env.WS_MARKETS_URL || ""
  const systemSocketUrl = process.env.WS_SYSTEM_URL || ""

  return <Home {...{marketSocketUrl, systemSocketUrl}} />
}

export const dynamic = "force-dynamic"
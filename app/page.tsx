import Home from "@/components/home"

export default function HomePage() {
  const props = {
    marketSocketUrl: process.env.WS_MARKETS_URL || "",
    systemSocketUrl: process.env.WS_SYSTEM_URL || "",
    cryptoSocketUrl: process.env.WS_CRYPTO_URL || "",
  }
  return <Home {...props} />
}

export const dynamic = "force-dynamic"
import HomeWebSocket from "@/components/home/WebSocket"
import clsx from "clsx"

export default function Home() {
  return <main>
      <HomeWebSocket wsUrl={process.env.WSURL || ""} />
      <h1>Welcome to my lab.</h1>
    </main>
}

export const dynamic = "force-dynamic"
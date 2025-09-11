import { WebSocket } from "@/components/home/WebSocket"
import clsx from "clsx"

export default function Home() {
  return <main>
      <WebSocket wsUrl={process.env.WSURL || ""} />
      <h1>Welcome to my lab.</h1>
    </main>
}

export const dynamic = "force-dynamic"
import { WebSocket } from "@/components/home/WebSocket"
import clsx from "clsx"

export default function Home() {
  const cls = [
    "bg-background-primary",
  ]

  return <main className={clsx(cls)}>
      <WebSocket wsUrl={process.env.WSURL || ""} />
    </main>
}

export const dynamic = "force-dynamic"
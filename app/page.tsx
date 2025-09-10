import { WebSocket } from "@/components/home/WebSocket"
import clsx from "clsx"

export default function Home() {
  const cls = ["bg-background"]

  return <main className={clsx(cls)}>
      <WebSocket wsUrl={process.env.WSURL || ""} />
      <h1>Welcome to my lab.</h1>
    </main>
}

export const dynamic = "force-dynamic"
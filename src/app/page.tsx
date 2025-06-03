import { redirect } from "next/navigation"

import { WebSocketClient } from "@/components/socket"

export default function Home() {
  const wsUrl = process.env.NEXT_PUBLIC_WSURL || ""

  return (
    <main>
      <WebSocketClient wsUrl={wsUrl} />
    </main>
  );
}

export const dynamic = "force-dynamic"
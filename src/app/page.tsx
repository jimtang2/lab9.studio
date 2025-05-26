import { redirect } from "next/navigation"

import { WebSocketClient } from "@/components/socket"

export default function Home() {
  // redirect("/notes")
  return (
    <main>
      <WebSocketClient />
    </main>
  );
}

export const dynamic = "force-dynamic"
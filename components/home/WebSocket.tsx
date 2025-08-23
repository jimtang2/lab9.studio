"use client"
import { useWebSocket } from "@/state/useWebSocket"

export function WebSocket({ wsUrl }: { wsUrl: string; }) {
  const { message, setMessage, received } = useWebSocket(wsUrl)
  return <></>
}

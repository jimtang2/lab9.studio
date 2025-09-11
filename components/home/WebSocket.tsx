"use client"
import { useWebSocket } from "@/state/useWebSocket"

export default function WebSocket({ wsUrl }: { wsUrl: string; }) {
  const { message, setMessage, received } = useWebSocket(wsUrl)
  return <></>
}

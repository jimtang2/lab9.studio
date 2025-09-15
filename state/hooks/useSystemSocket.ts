"use client"
import { useState, useEffect } from "react"

export default function useSystemWebSocket(url: string) {
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [systemResponse, setSystemResponse] = useState("")
  const [system, setSystem] = useState("{}")

  useEffect(() => {
    const socket = new WebSocket(url)
    setWs(socket)

    socket.onopen = () => {
      console.log(`Connected to ${url}`)
      // setSystemResponse(JSON.stringify({ type: "CHAT", content: "hello" }))
    }

    socket.onmessage = (e) => {
      setSystem(e.data)
    }

    socket.onclose = () => {
      console.log(`Disconnected from ${url}`)
    }

    return () => socket.close()
  }, [url])

  useEffect(() => {
    if (ws && systemResponse) {
      ws.send(systemResponse)
      // console.log(`Sent: ${systemResponse}`)
    }
  }, [systemResponse, ws])

  useEffect(() => {
    // console.log(`Received: ${system}`)
  }, [system])

  return { ws, setSystemResponse, system }
}
"use client"
import { useState, useEffect } from "react"

export function useWebSocket(wsUrl: string) {
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [message, setMessage] = useState("")
  const [received, setReceived] = useState("")

  useEffect(() => {
    if (!wsUrl) {
      console.error("Config error: WebSocket URL is missing or invalid")
      return
    }

    const socket = new WebSocket(wsUrl)
    setWs(socket)

    socket.onopen = () => {
      console.log(`Connected to ${wsUrl}`)
      setMessage(JSON.stringify({ type: "CHAT", content: "hello" }))
    }

    socket.onmessage = (e) => {
      setReceived(e.data)
    }

    socket.onclose = () => {
      console.log(`Disconnected from ${wsUrl}`)
    }

    return () => socket.close()
  }, [wsUrl])

  useEffect(() => {
    if (ws && message) {
      ws.send(message)
      console.log(`Sent: ${message}`)
    }
  }, [message, ws])

  useEffect(() => {
    console.log(`Received: ${received}`)
  }, [received])

  return { ws, message, setMessage, received }
}
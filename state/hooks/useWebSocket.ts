"use client"
import { useState, useEffect } from "react"

export function useWebSocket(url: string) {
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [message, setMessage] = useState("")
  const [received, setReceived] = useState("")

  useEffect(() => {
    if (!url) {
      console.error("Config error: WebSocket URL is missing or invalid")
      return
    }

    const socket = new WebSocket(url)
    setWs(socket)

    socket.onopen = () => {
      console.log(`Connected to ${url}`)
      setMessage(JSON.stringify({ type: "CHAT", content: "hello" }))
    }

    socket.onmessage = (e) => {
      setReceived(e.data)
    }

    socket.onclose = () => {
      console.log(`Disconnected from ${url}`)
    }

    return () => socket.close()
  }, [url])

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
"use client"
import { useState, useEffect } from "react"

import "@/css/socket.css"

export function WebSocketIndicator() {
  return (
    <div id="websocket-indicator" className={``}></div>)
}

export function WebSocketClient({ wsUrl }: {
  wsUrl: string
}) {
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [message, setMessage] = useState('')
  const [received, setReceived] = useState('')

  useEffect(() => {
    console.log("websocket url:", wsUrl)

    if (wsUrl === null) {
      console.error("config error: check environment variable is set and service is accessible")
      return
    }

    const socket: WebSocket = new WebSocket(wsUrl as string)
    setWs(socket)

    socket.onerror = () => {
      console.error(`connection error: check websocket server is running and accessible`)
      return
    }

    socket.onopen = () => {
      console.log(`Connected to ${wsUrl}`)

      setMessage(JSON.stringify({type: "CHAT", content: "hello"}))
    }

    socket.onmessage = (e) => {
      setReceived(e.data)
    }

    socket.onclose = () => {
      console.log(`Disconnected from ${wsUrl}`)
    }

    return () => socket.close()
  }, [])

  useEffect(() => {
    if (ws && message) {
      ws.send(message)
      console.log(`send: ${message}`)
    }
  }, [message])

  useEffect(() => {
    console.log(`receive: ${received}`)
  }, [received])

  return <></>
}
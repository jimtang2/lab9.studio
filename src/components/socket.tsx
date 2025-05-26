"use client"
import { useState, useEffect } from "react"

import "@/css/socket.css"

export function WebSocketIndicator() {
  return (
    <div id="websocket-indicator" className={``}></div>)
}

export function WebSocketClient() {
const [ws, setWs] = useState<WebSocket | null>(null)
  const [message, setMessage] = useState('')
  const [received, setReceived] = useState('')

  useEffect(() => {
    console.log(`Connecting to ${process.env.NEXT_PUBLIC_WSURL}...`)
    const socket = new WebSocket(process.env.NEXT_PUBLIC_WSURL)
    setWs(socket)

    socket.onopen = () => {
      console.log(`Connected to ${process.env.NEXT_PUBLIC_WSURL}`)
      // setMessage(JSON.stringify({type: "CHAT", content: "hello"}))
      setMessage(JSON.stringify({type: "CHAT"}))
      sendMessage()
    }
    socket.onmessage = (e) => {
      setReceived(e.data)
      console.log(`Received message ${e.data}`)
    }
    socket.onclose = () => {
      console.log(`Disconnected from ${process.env.NEXT_PUBLIC_WSURL}`)
    }

    return () => socket.close();
  }, [])

  const sendMessage = () => {
    if (ws && message) ws.send(message);
  }

  return <></>
}
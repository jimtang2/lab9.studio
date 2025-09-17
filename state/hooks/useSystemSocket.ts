"use client"
import { useState, useEffect } from "react"

export default function useSystemWebSocket(url: string) {
  const [ws, setWs] = useState<WebSocket | null>(null)
  // const [messageOut, setMessageOut] = useState("")
  const [messageIn, setMessageIn] = useState("")
  const [health, setHealth] = useState<number>(new Date().getTime())
  function connect() {
    const socket = new WebSocket(url)
    socket.onopen = () => {
      setWs(socket)
    }
    socket.onmessage = (e) => {
      setMessageIn(e.data)
    }
    socket.onclose = () => {
    }
    socket.onerror = e => {
    }
    return socket
  }
  useEffect(
    () => {
      const timeoutId = setTimeout(() => setHealth(new Date().getTime()), 3000)
      if (!ws || ws?.readyState == 3) {
        connect()
      }    
      return () => {
        clearTimeout(timeoutId)
      }
    }, 
    [health],
  )
  // useEffect(
  //   () => {
  //     if (ws && messageOut) {
  //       ws.send(messageOut)
  //     }
  //   }, 
  //   [messageOut],
  // )
  return { data: messageIn, ok: ws?.readyState == 2 }
}
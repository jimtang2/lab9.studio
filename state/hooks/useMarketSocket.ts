"use client"
import { useState, useEffect } from "react"

export default function useMarketWebSocket(url: string) {
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [messageOut, setMessageOut] = useState("")
  const [messageIn, setMessageIn] = useState("")
  const [inMessageCount, setInMessageCount] = useState<number>(0)
  const [health, setHealth] = useState<number>(new Date().getTime())
  function connect() {
    const socket = new WebSocket(url)
    socket.onopen = () => {
      if (ws) {
        ws?.close()
      }
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
  useEffect(
    () => {
      if (ws && messageOut) {
        ws.send(messageOut)
      }
    }, 
    [messageOut],
  )
  useEffect(
    () => setInMessageCount(inMessageCount + 1), 
    [messageIn],
  )
  useEffect(
    () => {
      if (inMessageCount >= 10) {
        setMessageOut(JSON.stringify({ 
          t: new Date().getTime(), 
          c: inMessageCount, 
        }))
        setInMessageCount(0)
      }
    }, 
    [inMessageCount],
  )
  return { data: messageIn, ok: ws?.readyState == 2 }
}
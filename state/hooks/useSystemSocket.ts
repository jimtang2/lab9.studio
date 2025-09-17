"use client"
import { useState, useEffect } from "react"

export default function useSystemWebSocket(url: string) {
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [dataResponse, setDataResponse] = useState("")
  const [data, setData] = useState("")
  const [retry, setRetry] = useState<number | null>(null)
  function connect() {
    // console.log("connect:", ws)
    const socket = new WebSocket(url)
    socket.onopen = () => {
      console.log(`Connected to ${url}`)
    }
    socket.onmessage = (e) => {
      setData(e.data)
    }
    socket.onclose = () => {
      console.log(`Disconnected from ${url} (${ws?.readyState || -1})`)
      // setTimeout(() => setRetry(new Date().getTime()), 3000)
    }
    socket.onerror = e => {
      console.log(`Error from ${url}`, e)
      setTimeout(() => setRetry(new Date().getTime()), 3000)
    }
    setWs(socket)
    return () => socket.close()
  }
  useEffect(() => connect(), [url, retry])
  useEffect(() => {
    if (ws && dataResponse) {
      ws.send(dataResponse)
    }
  }, [dataResponse])
  return { ws, setDataResponse, data }
}
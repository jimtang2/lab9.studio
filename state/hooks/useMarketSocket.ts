"use client"
import { useState, useEffect } from "react"

export default function useMarketWebSocket(url: string) {
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [dataResponse, setDataResponse] = useState("")
  const [data, setData] = useState("")
  const [retry, setRetry] = useState<number | null>(null)
  const [messageCount, setMessageCount] = useState<number>(0)
  function connect() {
    const socket = new WebSocket(url)
    socket.onopen = () => {
      console.log(`Connected to ${url}`)
    }
    socket.onmessage = (e) => {
      setData(e.data)
    }
    socket.onclose = () => {
      console.log(`Disconnected from ${url} (${ws?.readyState || -1})`)
      setTimeout(() => setRetry(new Date().getTime()), 3000)
    }
    socket.onerror = e => {
      console.log(`Error from ${url}`, e)
      setTimeout(() => setRetry(new Date().getTime()), 3000)
    }
    setWs(socket)    
    return socket
  }
  useEffect(() => {
    const socket = connect()
    return () => socket.close()
  }, [url, retry])
  useEffect(() => {
    if (ws && dataResponse) {
      ws.send(dataResponse)
    }
  }, [dataResponse])
  useEffect(() => setMessageCount(messageCount + 1), [data])
  useEffect(() => {
    if (messageCount >= 10) {
      setDataResponse(JSON.stringify({ 
        t: new Date().getTime(), 
        c: messageCount, 
      }))
      setMessageCount(0)
    }
  }, [messageCount])
  return { ws, setDataResponse, data }
}
"use client"
import { useState, useEffect } from "react"

export default function useMarketWebSocket(url: string) {
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [marketsResponse, setMarketsResponse] = useState("")
  const [markets, setMarkets] = useState("")
  const [messageCount, setMessageCount] = useState<number>(0)
  useEffect(() => {
    const socket = new WebSocket(url)
    socket.onopen = () => {
      console.log(`Connected to ${url}`)
    }
    socket.onmessage = (e) => {
      setMarkets(e.data)
    }
    socket.onclose = () => {
      console.log(`Disconnected from ${url}`)
    }
    setWs(socket)
    return () => socket.close()
  }, [url])
  useEffect(() => {
    console.log("response:", marketsResponse)
    if (ws && marketsResponse) {
      ws.send(marketsResponse)
    }
  }, [marketsResponse])
  useEffect(() => {
    setMessageCount(messageCount + 1)
  }, [markets])
  useEffect(() => {
    if (messageCount < 10) {
    } else {
      setMarketsResponse(JSON.stringify({ t: new Date().getTime(), c: messageCount, }))
      setMessageCount(0)      
    }
  }, [messageCount])
  return { ws, setMarketsResponse, markets }
}
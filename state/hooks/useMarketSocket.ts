"use client"
import { useState, useEffect } from "react"

export default function useMarketWebSocket(url: string) {
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [marketsResponse, setMarketsResponse] = useState("")
  const [markets, setMarkets] = useState("")
  const [messageCount, setMessageCount] = useState<number>(0)

  useEffect(() => {
    const socket = new WebSocket(url)
    setWs(socket)

    socket.onopen = () => {
      console.log(`Connected to ${url}`)
    }

    socket.onmessage = (e) => {
      setMarkets(e.data)
    }

    socket.onclose = () => {
      console.log(`Disconnected from ${url}`)
    }

    return () => socket.close()
  }, [url])

  useEffect(() => {
    console.log("response:", marketsResponse)
    if (ws && marketsResponse) {
      ws.send(marketsResponse)
      console.log(`Sent: ${marketsResponse}`)
    }
  }, [marketsResponse])

  useEffect(() => {
    setMessageCount(messageCount + 1)
  }, [markets])

  useEffect(() => {
    if (messageCount == 10) {
      setMessageCount(0)
      setMarketsResponse(`${messageCount}`)
    }
  }, [messageCount])

  return { ws, setMarketsResponse, markets }
}
"use client"
import { useState, useEffect } from "react"
// import DataConnection from "@/components/home"
import clsx from "clsx"

export default function Home({ socketUrl }: { socketUrl: string; }) {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [clientMessage, setClientMessage] = useState("")
  const [serverMessage, setServerMessage] = useState("")

  const sendTestMessage = () => {
  	socket?.send(JSON.stringify({ 
  		type: "CHAT", 
  		content: "test from home on open", 
  	}))
  }

  const receiveMessage = (message: string) => {
  	console.log("received", message)
  }

  useEffect(() => {
  	const ws = new WebSocket(socketUrl)
  	setSocket(ws)
  	ws.onopen = () => {
  		sendTestMessage()
  	}
  	ws.onmessage = e => receiveMessage(e.data)
  	ws.onclose = () => setSocket(null)
  	return () => ws.close()
  }, [socketUrl])

  const cls = {
    main: [
      "flex flex-col",
    ],
    content: [
      "p-2",
    ],
    pane: [
      "min-h-10 w-full",
    ],
  }

  return <div className={clsx(cls.content)}>
      <div className={clsx(cls.pane)}>
        <h1>Welcome to Lab 9</h1>
      </div>
    </div>
}
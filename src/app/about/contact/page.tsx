"use client"
import { useState, useEffect } from "react"
import Image from 'next/image'
import Form from "next/form"
import { useMenuStore, useCacheStore, useSettingsStore } from "@/lib/store"
import Title from "@/components/Title"
import Toolbar from "@/components/Toolbar"

export default function Contact() {
  const [ isHydrated, setIsHydrated ] = useState(false)
  const { colorScheme } = useSettingsStore()
  const { show } = useMenuStore()

  const { contactSubject, setContactSubject, contactMessage, setContactMessage, contactEmail, setContactEmail } = useCacheStore()

  const handleChangeMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContactMessage(event.target.value)
  }

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContactEmail(event.target.value)
  }

  const handleSend = () => {

  }

  useEffect(() => setIsHydrated(true), [])

  return (
    <main className={`
    `}>
      <Title title="Contact" />
      <Toolbar>
        <select name="subject" defaultValue="subject">
          <option disabled value="subject">Subject</option>
          <option value="support">Technical Support</option>
          <option value="feedback">Feedback</option>
        </select>
        <div className="flex-grow-1"></div>
        <button onClick={handleSend}>Send</button>
      </Toolbar>

      <textarea name="message" 
        placeholder="Message"
        defaultValue={contactMessage}
        onChange={handleChangeMessage}
      />
    </main>
  );
}

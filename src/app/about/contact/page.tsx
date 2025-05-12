"use client"
import { useState, useEffect } from "react"
import Image from 'next/image'
import Form from "next/form"
import { useCacheStore } from "@/lib/store"
import Title from "@/components/Title"
import Toolbar from "@/components/Toolbar"
import Dropdown from "@/components/Dropdown"

export default function Contact() {
  const [ isHydrated, setIsHydrated ] = useState(false)
  const [ subject, setSubject ] = useState("Choose subject")

  const { contactSubject, setContactSubject, contactMessage, setContactMessage, contactEmail, setContactEmail } = useCacheStore()

  const onChangeSubject = (subject: string) => {
    setSubject(subject)
  }

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
        <Dropdown 
          label={subject} 
          options={["Feedback", "Technical Support"]}
          onChange={onChangeSubject} />
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

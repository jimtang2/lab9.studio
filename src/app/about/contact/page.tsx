"use client"
import { useState } from "react"
import Image from 'next/image'
import Form from "next/form"
import { useCacheStore } from "@/lib/store"
import Title from "@/components/Title"
import Toolbar from "@/components/Toolbar"
import { submitContactMessage } from "@/lib/actions"

export default function Contact() {
  const { contactSubject, contactMessage, contactEmail, setContactSubject, setContactMessage, setContactEmail } = useCacheStore()

  const onChangeSubject = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContactSubject(event.target.value)
  }

  const handleChangeMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContactMessage(event.target.value)
  }

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContactEmail(event.target.value)
  }

  const handleClickSend = () => {
    // console.log(form)
    submitContactMessage()
    console.log("send")
  }

  return (
    <main className={``}>
      <Form className="w-full" action={handleClickSend}>
        <Title title="Contact" />
        <Toolbar>
          <div className="flex-grow-1"></div>
          <button onClick={handleClickSend}>Send</button>
        </Toolbar>

        <label htmlFor="subject">Subject</label>
        <input type="text" 
          name="subject" 
          required
          placeholder="What's it about?"
          defaultValue={contactSubject}
          onChange={onChangeSubject}
        />

        <label htmlFor="message">Message</label>
        <textarea name="message" 
          rows={6}
          required
          placeholder="What's the matter?"
          defaultValue={contactMessage}
          onChange={handleChangeMessage}
        />

        <label htmlFor="email">E-mail</label>
        <input type="text" 
          name="email" 
          className="mb-4"
          required
          placeholder="How to reach you?"
          defaultValue={contactEmail}
          onChange={handleChangeEmail}
        />
      </Form>
    </main>
  );
}

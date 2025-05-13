"use client"
import { useEffect, useActionState } from "react"
import Image from 'next/image'
import Form from "next/form"
import { useCacheStore } from "@/lib/store"
import Title from "@/components/Title"
import Toolbar from "@/components/Toolbar"
import { submitContactForm } from "./actions"

export default function Contact() {
  const [state, formAction, pending] = useActionState(submitContactForm, null)

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

  useEffect(() => {
    if (state === null) {
      return  
    } 
    if (state!.success === true) {

    } else {

    }
  }, [state])

  return (
    <main className={``}>
      <Form className="w-full" action={formAction}>
        <Title title="Contact" />
        <Toolbar>
          <div className="flex-grow-1"></div>
          <button disabled={pending}>Send</button>
        </Toolbar>

        <label htmlFor="subject">Subject</label>
        <input type="text" 
          className="max-w-2xl"
          name="subject" 
          required
          placeholder="Subject"
          defaultValue={contactSubject}
          onChange={onChangeSubject}
        />

        <label htmlFor="message">Message</label>
        <textarea name="message" 
          className="max-w-2xl"
          rows={6}
          required
          placeholder="Message"
          defaultValue={contactMessage}
          onChange={handleChangeMessage}
        />

        <label htmlFor="email">E-mail</label>
        <input type="text" 
          className="max-w-2xl mb-4"
          name="email" 
          required
          placeholder="E-mail"
          defaultValue={contactEmail}
          onChange={handleChangeEmail}
        />
      </Form>
    </main>
  );
}

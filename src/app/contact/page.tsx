"use client"
import Image from 'next/image'
import Form from "next/form"
import { useStore } from "@/lib/store"

export default function Contact() {

  const { 
    contactSubject, setContactSubject, 
    contactMessage, setContactMessage, 
    contactEmail, setContactEmail } = useStore()

  const handleChangeSubject = ({target: { value }}) => {
    setContactSubject(value)
  }

  const handleChangeMessage = ({target: { value }}) => {
    setContactMessage(value)
  }

  const handleChangeEmail = ({target: { value }}) => {
    setContactEmail(value)
  }

  return (
    <main>
      <h1>Contact</h1>
      <Form>
        <label htmlFor="subject">Subject</label>
        <select name="subject" 
          onChange={handleChangeSubject}
          defaultValue={contactSubject}
          autoFocus>
          <option value="feedback">Send user feedback</option>
          <option value="support">Request technical support</option>
          <option value="other">Other</option>
        </select>

        <label htmlFor="message">Message</label>
        <textarea name="message" 
          required
          rows={5}
          placeholder="Message"
          defaultValue={contactMessage}
          onChange={handleChangeMessage}
        />

        <label htmlFor="reply-to">E-mail</label>
        <input type="email" name="email" 
          required
          placeholder="E-mail"
          defaultValue={contactEmail}
          onChange={handleChangeEmail}
        />
        
        <input type="submit" 
          value="Submit" />
      </Form>
    </main>
  );
}

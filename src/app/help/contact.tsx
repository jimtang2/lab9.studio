// "use client"
// import { useRef, useEffect, useActionState } from "react"
// import Image from 'next/image'
// import Form from "next/form"
// import { useCacheStore, useInboxStore } from "@/lib/store"
// import Title from "@/components/Title"
// import Toolbar from "@/components/Toolbar"
// import { submitContactForm } from "./actions"

// export default function Contact() {
//   const formRef = useRef<HTMLFormElement>(null)
//   const [state, formAction, pending] = useActionState(submitContactForm, null)
//   const { pushItem } = useInboxStore()
//   const { contactSubject, contactMessage, contactEmail, setContactSubject, setContactMessage, setContactEmail } = useCacheStore()

//   function onChangeSubject(event: React.ChangeEvent<HTMLInputElement>) {
//     setContactSubject(event.target.value)
//   }
//   function handleChangeMessage(event: React.ChangeEvent<HTMLTextAreaElement>) {
//     setContactMessage(event.target.value)
//   }
//   function handleChangeEmail(event: React.ChangeEvent<HTMLInputElement>) {
//     setContactEmail(event.target.value)
//   }
//   function handleClickSend() {
//     if (formRef.current !== null) {
//       formRef.current.requestSubmit()
//     }
//   }

//   useEffect(() => {
//     if (state === null) return
//     let success = state!.success === true
//     let email = state?.data?.email || ""
//     let error = state?.error || ""
//     pushItem({ 
//       title: success ? "Message Received" : "Failed to Send Message",
//       message: success ? `Thanks for contacting us. We will reply to: ${email}.` : `${error}`,
//       type: success ? "info" : "error",
//       time: new Date(),
//       isRead: false,
//     })
//   }, [state])

//   return (
//     <main className={``}>
//       <Title title="Contact" />
//       <Toolbar>
//         <div className="flex-grow-1"></div>
//         <button onClick={handleClickSend} type="button">Send</button>
//       </Toolbar>
//       <Form className="py-2 mx-auto" action={formAction} ref={formRef}>
//         <h2 className="px-2 sm:px-0">Contact Form</h2>
//         <p className="px-2 sm:px-0 mb-2">For technical support fill out this form and hit <b>Send</b>.</p>
//         <label htmlFor="subject">Subject</label>
//         <input type="text" 
//           name="subject" 
//           placeholder="What's happening?"
//           defaultValue={contactSubject}
//           onChange={onChangeSubject} />
//         <label htmlFor="message">Message</label>
//         <textarea name="message" 
//           rows={6}
//           required
//           placeholder="Tell me more... No worries: no one will read this 🙃"
//           defaultValue={contactMessage}
//           onChange={handleChangeMessage} />
//         <label htmlFor="email">E-mail</label>
//         <input type="text" 
//           name="email" 
//           required
//           placeholder="How do I contact you?"
//           defaultValue={contactEmail}
//           onChange={handleChangeEmail} />
//       </Form>
//     </main>
//   );
// }

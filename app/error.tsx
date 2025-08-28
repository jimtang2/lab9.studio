"use client" // Error boundaries must be Client Components 
import { useEffect } from 'react'
import clsx from "clsx"
import ExclamationTriangle from "/public/heroicons/solid/exclamation-triangle.svg"
 
export default function Error({ error, reset, }: { error: Error & { digest?: string }; reset: () => void; }) {
  const cls = {
    base: [
      "py-2 px-4 max-w-7xl",
      "col-start-2 col-end-4 row-start-1 row-end-4",
      "sm:col-start-1 sm:col-end-4 sm:row-start-2 sm:row-end-3",
    ],
    header: [
      "flex flex-row gap-2 items-center",
    ],
    button: [
      "py-1 px-3 border-1",
    ],
  }

  return (
    <main className={clsx(cls.base)}>
      <h1>An error was caught</h1>
      <h3>Message</h3>
      <p>{error.message}</p>
      {/*<h3>Actions</h3>*/}
      <button className={clsx(cls.button)} onClick={() => reset()}>Reset</button>
    </main>
  )
}
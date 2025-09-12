import DataConnection from "@/components/home"

import clsx from "clsx"

export default function Home() {
  const socketUrl = process.env.WSURL || ""

  const cls = {
    main: [
      "flex flex-col",
    ],
    content: [
      "p-2",
    ],
    pane: [
      // "border-y-3 border-double border-border",
      // "sm:border-x-3",
      // "rounded-md"
      "min-h-10 w-full",
    ],
  }

  return <>
    <main className={clsx(cls.main)}>
      <div className={clsx(cls.content)}>
        <div className={clsx(cls.pane)}>
          <h1>Welcome to Lab 9</h1>
        </div>
      </div>
    </main>

    <DataConnection url={socketUrl} />
  </>
}

export const dynamic = "force-dynamic"
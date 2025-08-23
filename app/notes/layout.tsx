import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Notes",
}

export default function NotesLayout({ children }: Readonly<{ children: React.ReactNode; }>) {return <>{children}</>
}

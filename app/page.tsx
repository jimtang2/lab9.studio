import HomePage from "@/components/home"

export default function Home() {
  const socketUrl = process.env.WSURL || ""

  return <HomePage socketUrl={socketUrl} />
}

export const dynamic = "force-dynamic"
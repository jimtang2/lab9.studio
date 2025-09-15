import { useState, useEffect } from "react"
import { useStore } from "@/state/store"
import { User } from "@/db/schema"

export default function useSessionUser(): [User | null, boolean, string | null] {
  const {
    sid,
    setLoginFormLoading,
  } = useStore(state => state)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    (async () => {
      if (sid?.length <= 0) {
        setUser(null)
      } else {
        setLoginFormLoading(true)
        try {
          const user = await fetchUser()
          setUser(user)
        } catch (err) {
          setError(err instanceof Error ? err.message : "Unknown error")
          setUser(null)
        } finally {
          setLoading(false)
        }
        setLoginFormLoading(false)
      }
    })()
  }, [sid])

  if (error) {
    console.error("useSessionUser error:", error)
  }

  return [user, loading, error]
}

async function fetchUser(): Promise<User> {
  const response = await fetch("/api/me", {
    method: "GET",
    credentials: "include", 
  })

  if (!response.ok) {
    throw new Error("Failed to fetch user")
  }

  const data = await response.json()
  return { name: data.uid, is_admin: data.is_admin } as User
}
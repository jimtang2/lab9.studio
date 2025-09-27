import { useState, useEffect } from "react"
import { useStore } from "@/state/store"
import { User } from "@/db/schema"

export default function useIsAdmin(): boolean {
  const {
    user,
  } = useStore(state => state)

  return user?.is_admin || false
}
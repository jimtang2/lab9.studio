import type { Metadata } from "next"
import Page from "@/components/profile"

export const metadata: Metadata = {
  title: "Profile",
}

export default async function ProfilePage() {
  return <Page />
}

export const dynamic = "force-dynamic"
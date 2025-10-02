import type { Metadata } from "next"
import Main from "@/components/layout/Main"
import Page from "@/components/profile"

export const metadata: Metadata = {
  title: "Profile",
}

export default async function ProfilePage() {
  return <Main><Page /></Main>
}

export const dynamic = "force-dynamic"
// app/api/me/route.ts
import { NextResponse } from "next/server"
import { drizzle } from "drizzle-orm/node-postgres"
import { db } from "@/db"
import { User, Users, Sessions } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function GET(request: Request) {
  try {
    const sid = request.headers.get("cookie")?.match(/sid=([^;]+)/)?.[1]

    if (!sid) {
      return NextResponse.json({ error: "No sid provided" }, { status: 401 })
    }
    const user = await findUser(sid)

    return NextResponse.json({ uid: user.name }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid or expired session" }, { status: 401 })
  }
}

async function findUser(sid: string): Promise<User> {
  try {
    const [session] = await db
      .select()
      .from(Sessions)
      .where(eq(Sessions.session_id, sid))
      .limit(1)

    if (!session) {
      throw new Error("Session not found")
    }

    if (session.expires_at < new Date()) {
      throw new Error("Session expired")
    }

    const [user] = await db
      .select()
      .from(Users)
      .where(eq(Users.id, session.user_id))
      .limit(1)

    if (!user) {
      throw new Error("User not found")
    }

    return user;
  } catch (error) {
    console.error("Error finding user:", error)
    throw new Error("Failed to find user")
  }
}

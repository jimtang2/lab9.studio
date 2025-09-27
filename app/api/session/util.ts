// app/api/session/util.ts
import { type NextRequest } from "next/server"
import { v4 as uuidv4 } from "uuid"
import { db } from "@/db"
import { Users, Sessions, Session, User } from "@/db/schema"
import { eq } from "drizzle-orm"
import * as bcrypt from "bcrypt"

export async function authenticate(uid: string, password: string): Promise<boolean> {
  try {
    const [user] = await db
      .select()
      .from(Users)
      .where(eq(Users.name, uid))
      .limit(1)
    if (!user || !user.password) {
      return false
    }
    const isValid = await bcrypt.compare(password, user.password)
    return isValid
  } catch (error) {
    console.error("Error checking credentials:", error)
    return false
  }
}

export async function getSessionUser(input: Request | string): Promise<User> {
  try {
    const sid = typeof input === "string" 
      ? input 
      : input.headers.get("cookie")?.match(/sid=([^;]+)/)?.[1]
    if (!sid) {
      throw new Error("No session ID provided")
    }
    const [result] = await db
      .select({
        id: Users.id,
        name: Users.name,
        is_admin: Users.is_admin,
        password: Users.password,
        expires_at: Sessions.expires_at,
      })
      .from(Sessions)
      .innerJoin(Users, eq(Sessions.user_id, Users.id))
      .where(eq(Sessions.session_id, sid))
      .limit(1)
    if (!result) {
      throw new Error("Session or user not found")
    }
    if (result.expires_at < new Date()) {
      throw new Error("Session expired")
    }
    return {
      id: result.id,
      name: result.name,
      is_admin: result.is_admin,
    } as User
  } catch (error) {
    console.error("Error finding user:", error)
    throw new Error("Failed to find user")
  }
}

export async function createSession(uid: string): Promise<Session> {
  try {
    const [user] = await db
      .select({ id: Users.id })
      .from(Users)
      .where(eq(Users.name, uid))
      .limit(1)
    if (!user) {
      throw new Error("User not found")
    }
    const sessionId = uuidv4()
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000 * 365)
    const [session] = await db
      .insert(Sessions)
      .values({
        session_id: sessionId,
        user_id: user.id,
        expires_at: expiresAt,
      })
      .returning()
    return session
  } catch (error) {
    console.error("Error creating session:", error)
    throw new Error("Failed to create session")
  }
}

export async function deleteSession(sid: string): Promise<Session> {
  try {
    const [session] = await db
      .delete(Sessions)
      .where(eq(Sessions.session_id, sid))
      .returning()
    if (!session) {
      throw new Error("Session not found")
    }
    return session
  } catch (error) {
    console.error("Error deleting session:", error)
    throw new Error("Failed to delete session")
  }
}
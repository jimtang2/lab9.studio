// import { scheduleJob, scheduledJobs, gracefulShutdown } from "node-schedule"
import { db } from "@/db"
import { Notes, Note } from "@/db/schema"
import { desc } from "drizzle-orm"
import { Mutex } from "async-mutex"

declare global {
  interface Global {
    notesManager?: NotesManager
  }
}

class NotesManager {
  mutex: Mutex
  notes: Note[] | null
  map: Record<number, Note>
  constructor() {
    this.mutex = new Mutex()
    this.notes = null
    this.map = {}

    // scheduleJob(
    //   "refreshNotes",
    //   "*/1 * * * *",
    //   this.refreshNotes.bind(this)
    // )
    // process.on("SIGTERM", async () => {
    //   await gracefulShutdown()
    //   process.exit(0)
    // })
    // console.log("global: NotesManager initialized")
  }

  async getNotes(): Promise<Note[]> {
    if (!this.notes) {
      await this.refreshNotes()
    }
    const release = await this.mutex.acquire()
    try {
      return this.notes || []
    } finally {
      release()
    }
  }

  async getNote(id: number): Promise<Note | null> {
    const release = await this.mutex.acquire()
    try {
      return id in this.map ? this.map[id] : null
    } finally {
      release()
    }
  }

  async refreshNotes(): Promise<void> {
    const release = await this.mutex.acquire()
    try {
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => {
          console.log(`node-schedule: ${new Date().toLocaleString()}: refreshNotes timeout after 3s`)
          reject(new Error("Query timeout"))
        }, 3000)
      )
      const queryPromise = db.select().from(Notes).orderBy(desc(Notes.created_at)).limit(1000)
      const notes = await Promise.race([queryPromise, timeoutPromise])
      if (notes) {
        this.notes = notes as Note[]
        this.map = {}
        this.notes.forEach(note => (this.map[note.id] = note))
      }
    } catch (error) {
      console.error("error:", error)
    } finally {
      release()
    }
  }
}

export async function getNotes(): Promise<Note[]> {
  if (!("notesManager" in global)) {
    (global as any).notesManager = new NotesManager()
  }
  return (global as any).notesManager?.getNotes() || []
}

export async function getNote(id: number): Promise<Note | null> {
  if (!("notesManager" in global)) {
    (global as any).notesManager = new NotesManager()
  }
  return (global as any).notesManager?.getNote(id)
}

export async function updateNotes(): Promise<void> {
  if (!("notesManager" in global)) {
    (global as any).notesManager = new NotesManager()
  }
  await (global as any).notesManager?.refreshNotes()
}
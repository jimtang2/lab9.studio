import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core"
import { InferSelectModel } from "drizzle-orm"

export const Notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  metadata: text("metadata").notNull(),
  created_at: varchar("created_at").notNull(),
  updated_at: varchar("updated_at").notNull(),
})

export type Note = InferSelectModel<typeof Notes>
import { pgTable, serial, text, varchar, timestamp, integer, uuid, check } from "drizzle-orm/pg-core";
import { InferSelectModel, sql } from "drizzle-orm"

export const Notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  metadata: text("metadata").notNull(),
  created_at: varchar("created_at").notNull(),
  updated_at: varchar("updated_at").notNull(),
})

export type Note = InferSelectModel<typeof Notes>

export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export type User = InferSelectModel<typeof Users>;

export const Sessions = pgTable(
  "users_sessions",
  {
    session_id: varchar("session_id", { length: 36 }).primaryKey(),
    user_id: integer("user_id")
      .notNull()
      .references(() => Users.id, { onDelete: "cascade" }),
    created_at: timestamp("created_at").defaultNow().notNull(),
    expires_at: timestamp("expires_at").notNull(),
  },
  (table) => ({
    validExpiration: check("valid_expiration", sql`${table.expires_at} > ${table.created_at}`),
  })
);

export type Session = InferSelectModel<typeof Sessions>;
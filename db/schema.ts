import { pgTable, pgSchema, serial, text, boolean, varchar, timestamp, integer, uuid, check, numeric, bigint } from "drizzle-orm/pg-core"
import { InferSelectModel, sql } from "drizzle-orm"
import { citext } from "./custom-types"

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
  is_admin: boolean("is_admin").notNull().default(false),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
})

export type User = InferSelectModel<typeof Users>

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
)

export type Session = InferSelectModel<typeof Sessions>

export const obb = pgSchema('obb')

export const HistoricalPrices = obb.table(
  'historical_prices',
  {
    symbol: citext('symbol').notNull(),
    date: timestamp('date', { mode: 'date', withTimezone: false }).notNull(),
    interval: text('interval').notNull(),
    open: numeric('open'),
    high: numeric('high'),
    low: numeric('low'),
    close: numeric('close'),
    volume: bigint('volume', { mode: 'number' }),
    splitRatio: numeric('split_ratio'),
    vwap: numeric('vwap'),
    dividend: numeric('dividend'),
    adjClose: numeric('adj_close'),
    change: numeric('change'),
    changePercent: numeric('change_percent'),
    provider: citext('provider'),
  },
  (table) => ({
    primaryKey: {
      name: 'historical_prices_pkey',
      columns: [table.symbol, table.date, table.interval],
    },
  })
)

export type HistoricalPrice = InferSelectModel<typeof HistoricalPrices>
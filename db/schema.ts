import { pgTable, pgSchema, serial, text, boolean, varchar, timestamp, integer, check, numeric, bigint } from "drizzle-orm/pg-core"
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

export const Industries = obb.table('industries', {
  industry_id: integer('industry_id').primaryKey(),
  name: citext('name').notNull(),
})

export const Sectors = obb.table('sectors', {
  sector_id: integer('sector_id').primaryKey(),
  name: citext('name').notNull().unique(),
})

export const Indices = obb.table('indices', {
  symbol: citext('symbol').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  type: citext('type'),
  created_at: timestamp('created_at').defaultNow(),
})

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

export const Companies = obb.table(
  'companies',
  {
    symbol: citext('symbol').primaryKey(),
    name: text('name'),
    industry_id: integer('industry_id').references(() => Industries.industry_id),
    sector_id: integer('sector_id').references(() => Sectors.sector_id),
  },
  (table) => ({
    companiesPkey: {
      name: 'companies_pkey',
      columns: [table.symbol],
    },
  })
)

export type Company = InferSelectModel<typeof Companies>

export const CompanyIndex = obb.table(
  'company_index',
  {
    symbol: citext('symbol').notNull(),
    index_symbol: citext('index_symbol').notNull(),
  },
  (table) => ({
    primaryKey: {
      name: 'company_index_pkey',
      columns: [table.symbol, table.index_symbol],
    },
    symbolFk: {
      name: 'company_index_symbol_fkey',
      columns: [table.symbol],
      references: () => Companies.symbol,
    },
    indexSymbolFk: {
      name: 'company_index_index_symbol_fkey',
      columns: [table.index_symbol],
      references: () => Indices.symbol,
    },
  })
)

export type CompanyIndex = InferSelectModel<typeof CompanyIndex>
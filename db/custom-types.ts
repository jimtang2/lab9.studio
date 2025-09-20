import { customType } from 'drizzle-orm/pg-core'

export const citext = customType<{
  data: string;
  driverData: string;
  config: { default?: string };
}>({
  dataType() {
    return 'citext'
  },
  toDriver(value: string): string {
    return value
  },
  fromDriver(value: string): string {
    return value
  },
})
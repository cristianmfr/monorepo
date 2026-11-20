import path from 'node:path'

import * as dotenv from 'dotenv'
import { defineConfig } from 'prisma/config'

dotenv.config({
  path: path.join('../../apps/api/.env'),
})

export default defineConfig({
  schema: './prisma/schema.prisma',
  migrations: {
    path: './prisma/migrations',
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
})

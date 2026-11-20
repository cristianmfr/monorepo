import { PrismaPg } from '@prisma/adapter-pg'

import { env } from '@/config/env'

import { PrismaClient } from '../../prisma/generated/client'

const connectionString = env.DATABASE_URL
const adapter = new PrismaPg({ connectionString })

export const prisma = new PrismaClient({ adapter })

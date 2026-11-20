import { redisStorage } from '@better-auth/redis-storage'
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { emailOTP } from 'better-auth/plugins/email-otp'

import { env } from '@/config/env'

import { prisma } from './prisma'
import { redis } from './redis'

export const auth = betterAuth({
  trustedOrigins: [env.ALLOWED_CORS_ORIGIN],
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  basePath: '/auth',

  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),

  secondaryStorage: redisStorage({
    client: redis,
    keyPrefix: 'auth:',
  }),

  session: {
    updateAge: 60 * 60 * 24,
    expiresIn: 60 * 60 * 24 * 7,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
  },

  advanced: {
    cookiePrefix: 'monoauth',
    database: {
      generateId: false,
    },
  },

  plugins: [
    emailOTP({
      storeOTP: 'hashed',
      sendVerificationOTP({ email, otp, type }) {
        console.info(`[email-otp] ${type} for ${email}: ${otp}`)
        return Promise.resolve()
      },
    }),
  ],
})

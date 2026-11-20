import { cors as corsConfig } from '@elysia/cors'
import { Elysia } from 'elysia'

import { env } from './env'

export const cors = new Elysia().use(
  corsConfig({
    origin: env.ALLOWED_CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
)

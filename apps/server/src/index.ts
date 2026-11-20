import { Elysia } from 'elysia'

import { cors } from '@/config/cors'
import { env } from '@/config/env'
import { logger } from '@/config/logger'
import { auth } from '@/shared/auth'

new Elysia()
  .use(logger)
  .use(cors)
  .mount(auth.handler)
  .listen({ port: env.PORT, hostname: env.HOST })

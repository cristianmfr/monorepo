import { cleanEnv, port, str, url } from 'envalid'

export const env = cleanEnv(process.env, {
  PORT: port(),
  HOST: str(),

  DATABASE_URL: url(),
  REDIS_URL: url(),

  BETTER_AUTH_SECRET: str(),
  BETTER_AUTH_URL: url(),

  ALLOWED_CORS_ORIGIN: url(),
})

import { Elysia } from 'elysia'
import { logixlysia } from 'logixlysia'

export const logger = new Elysia().use(logixlysia())

import { config } from 'dotenv'

config()

const { PORT, DB_CONNECT, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, CLIENT_URL } =
  process.env

interface ConfigI {
  port: string
  db: string
  access_secret: string
  refresh_secret: string
  client_url: string
}

export default {
  port: PORT,
  db: DB_CONNECT,
  access_secret: JWT_ACCESS_SECRET,
  refresh_secret: JWT_REFRESH_SECRET,
  client_url: CLIENT_URL,
} as ConfigI

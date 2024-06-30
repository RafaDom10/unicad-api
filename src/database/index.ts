import { Client } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const client = new Client({
  connectionString: process.env.DB_URL
})

void client.connect()

export { client }

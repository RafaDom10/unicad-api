import { Client } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

console.log(process.env.DB_PORT)

const client = new Client({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

void client.connect()

export { client }

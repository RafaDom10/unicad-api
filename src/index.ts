import 'reflect-metadata'
import express from 'express'
import dotenv from 'dotenv'
import { cors } from './app/middlewares/cors'
import routes from './routes'
import './shared/container'

dotenv.config()

const app = express()
const port = process.env.PORT ?? 3000

app.use(express.json())
app.use(cors)
app.use(routes)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})

import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import { DataSource } from 'typeorm'
import cors from 'cors'
import { Task } from './src/tasks/tasks.entity'
import { taskRouter } from './src/tasks/tasks.router'
import { User } from './src/auth/auth.entity'
import { authRouter } from './src/auth/auth.router'
import cookieParser = require('cookie-parser')

dotenv.config()
const PORT = process.env.PORT || 4000
const app: Express = express()

// Body parser middleware
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
)

// Database connection
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
  synchronize: true,
  entities: [Task, User],
})

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => console.log('Server Running on Port ' + PORT))
  })
  .catch((err) => {
    console.error('Error during data source initialization', err)
  })

app.get('/', (req: Request, res: Response) => {
  res.send(`<h1>Server is running...</h1>`)
})

// Tasks routes
app.use('/', taskRouter)
app.use('/auth', authRouter)

import 'dotenv/config'
import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import { config } from './config/app.config'
import { HTTPSTATUS } from './config/http.config'

const app = express()
const BASE_PATH = config.BASE_PATH

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: config.FRONTEND_ORIGIN, credentials: true }))

app.get('/', (req: Request, res: Response) => {
  res.status(HTTPSTATUS.OK).json('API is running...')
})
app.listen(config.PORT, async () => {
  console.log(
    `Server is running on port ${config.PORT} in ${config.NODE_ENV} mode`
  )
})

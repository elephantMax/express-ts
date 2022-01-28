import express, { Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import fileUpload from 'express-fileupload'

//config
import config from '../config'

//routes
import auth from './router/auth'
import users from './router/users'
import files from './router/files'

//middlewares
import error from './middleware/error-middleware'

const app = express()

app.use(
  cors({
    origin: config.client_url,
    credentials: true,
  })
)

app.use('/files', express.static('./src/uploads'))

app.use(
  fileUpload({
    createParentPath: true,
  })
)

app.use(bodyParser.json())
app.use(cookieParser())
app.get('/', (req: Request, res: Response) =>
  res.send('Express + TypeScript Server')
)

//init routes

app.use('/api', auth)
app.use('/api/users', users)
app.use('/api/files', files)

//error middleware
app.use(error)

app.listen(config.port, async () => {
  await mongoose.connect(config.db)
  console.log('successfull connect to mongoDB')

  console.log(`[server]: Server is running at https://localhost:${config.port}`)
})

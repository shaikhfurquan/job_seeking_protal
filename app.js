import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import dotenv from 'dotenv'
import { errorMiddleware } from './middlewares/errorHandler.js'

// importing the routes
import userRouter from './routes/userRouter.js'

dotenv.config()

const app = express()


// express middleware
app.use(cors({
    origin : [ process.env.FRONTEND_URL],
    methods : ['GET' , 'POST' , 'PUT' , 'DELETE'],
    credentials : true
}))
app.use(cookieParser());
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended : true}))

// file upload setup
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : "/tmp/"
}))


// routes
app.use('/api/v1/user' , userRouter)


// Error middleware
app.use(errorMiddleware)


export default app
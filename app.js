import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import dotenv from 'dotenv'

dotenv.config()

const app = express()


// express middleware
app.use(cors({
    origin : [ process.env.FRONTEND_URL],
    methods : ['GET' , 'POST' , 'PUT' , 'DELETE'],
    credentials : true
}))
app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended : true}))

// file upload setup
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : "/tmp/"
}))

export default app
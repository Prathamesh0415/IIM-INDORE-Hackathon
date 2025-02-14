import express from 'express'
import connectDB from './db/connectDB.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser)

const corsOptions = {
    origin: 'http://localhost:5173',
    credentails: true
}

app.use(cors(corsOptions))

const PORT = 3000

app.listen(PORT, () => {
    connectDB(process.env.MONGODB_URI)
    console.log(`listening on ${PORT}`)
})
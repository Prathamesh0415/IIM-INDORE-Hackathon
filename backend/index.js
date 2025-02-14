import express from 'express'
import connectDB from './db/connectDB.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import userRoutes from './routes/user.routes.js'


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use('/krishi/user', userRoutes)

const corsOptions = {
    origin: 'http://localhost:5173',
    credentails: true
}

app.use(cors(corsOptions))

const PORT = 3000

app.listen(PORT, () => {
    try{
        connectDB(process.env.MONGODB_URI)
        console.log(`listening on ${PORT}`)
    }catch(error){
        console.log(error)
    }
})
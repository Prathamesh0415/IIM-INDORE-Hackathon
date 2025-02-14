import express from 'express'
import connectDB from './db/connectDB.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import userRoutes from './routes/user.routes.js'
import marketRoutes from './routes/market.routes.js'
import forumRoutes from './routes/forum.routes.js'
import isAuthenticated from './middlewares/isAuthenticated.js'


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use('/krishi/user', userRoutes)
app.use('/krishi/marketplace', isAuthenticated, marketRoutes)
app.use('/krishi/forum', isAuthenticated, forumRoutes)

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
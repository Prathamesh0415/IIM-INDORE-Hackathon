import express from 'express'
import connectDB from './db/connectDB.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import userRoutes from './routes/user.routes.js'
import marketRoutes from './routes/market.routes.js'
import forumRoutes from './routes/forum.routes.js'
import isAuthenticated from './middlewares/isAuthenticated.js'
import uploadRoutes from './routes/uploadRoutes.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

const allowedOrigins = ["http://localhost:5173"]

app.use(cors({
  origin: allowedOrigins, // Allow only specific frontend origins
  credentials: true, // Allow credentials (cookies, authorization headers)
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}))

app.use('/krishi/user', userRoutes)
app.use('/krishi/marketplace', isAuthenticated, marketRoutes)
app.use('/krishi/forum'/*, isAuthenticated*/, forumRoutes)
app.use('/krishi/disease', uploadRoutes)

app.get("/krishi/weather", async (req, res) => {
    try {
      const { city } = req.query; // Example: frontend sends ?city=London
      if (!city) return res.status(400).json({ error: "City is required" });
  
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      const response = await axios.get(url);
  
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch weather" });
    }
  });

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
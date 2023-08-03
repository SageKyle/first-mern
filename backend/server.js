import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/db.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import userRoutes from './routes/userRoutes.js'
const app = express()

dotenv.config()
const port = process.env.PORT || 5000

// connect to MongoDB database (using Mongoose)
connectDB()

// middleware for parsing json body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// middleware for accessing cookies
app.use(cookieParser())

app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
	res.send('Hello world from this side!')
})

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
	console.log(`app started at port ${port}`)
})

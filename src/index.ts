import express from 'express'
import cors from 'cors' // ✅ Import CORS
import booksRouter from './router/booksRouter'
import { errorHandler } from './middleware/errorHandler'
import ErrorHandler from './utils/ErrorHandler'

const app = express()
const port = 8000

// ✅ Enable CORS for your frontend (localhost:5173)
app.use(cors({
  origin: process.env.FRONTEND_URL, // Vite dev server
  credentials: true, // Optional: only if you're using cookies
}))

app.use(express.json())

// ✅ Routes
app.use('/books', booksRouter)

// ✅ 404 handler
app.use((_req, _res, next) => {
  next(new ErrorHandler('Route not found', 404))
})

// ✅ Global error handler
app.use(errorHandler)

// ✅ Start server
app.listen(port, () => {
  console.log(`🚀 Backend running at http://localhost:${port}`)
})

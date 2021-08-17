import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import routes from './routes'

const app = express()

dotenv.config()

const { PORT, DATABASE_CONNECTION } = process.env

mongoose.connect(
  'mongodb+srv://gustavo:YbHKOxnXavvhImgh@cluster0.hwew8.mongodb.net/teste-04-08?retryWrites=true&w=majority'
)
app.use(express.json())
app.use(cors())
app.use(routes)

app.listen(PORT, () => {
  console.log(`Api Running on Port: ${PORT}`)
})

export default app

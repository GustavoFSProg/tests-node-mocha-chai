import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import routes from './routes'

const app = express()

dotenv.config()

const { PORT, DATABASE } = process.env

mongoose.connect(DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
app.use(express.json())
app.use(cors())
app.use(routes)

app.listen(PORT, () => {
  console.log(`Api Running on Port: ${PORT}`)
})

export default app

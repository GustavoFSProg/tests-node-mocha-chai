import { model, Schema } from 'mongoose'

const schema = new Schema({
  title: {
    type: String,
    unique: true,
  },
  description: String,
  price: Number,
  image: String,
})

export default model('productModel', schema)

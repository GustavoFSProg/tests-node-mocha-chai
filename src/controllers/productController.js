import productModel from '../models/productModel'
const { promisify } = require('util')
import fs from 'fs'
const unlink = promisify(fs.unlink)

async function create(req, res) {
  try {
    console.log('Entrou')

    const { filename: image } = req.file

    const [name] = image.split('.')
    const filename = `${name}.jpg`

    console.log(filename)

    await productModel.create({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      image: filename,
    })

    return res.status(201).send({ message: 'Product Registered with success!' })
  } catch (error) {
    return res.status(201).send({ message: 'ERRO, tudo cagado', error })
  }
}

async function getAll(req, res) {
  try {
    const data = await productModel.find()

    return res.status(200).send({ data })
  } catch (error) {
    return res.status(400).send(error)
  }
}

async function getById(req, res) {
  try {
    const data = await productModel.findByIdAndUpdate(req.params.id)

    return res.status(200).send(data)
  } catch (error) {
    return res.status(400).send(error)
  }
}

async function updateOne(req, res) {
  try {
    if (typeof req.body.price === String) {
      return alert('O preço deve ser um numero!')
    } else {
      await productModel.findByIdAndUpdate(req.params.id, {
        $set: {
          title: req.body.title,
          description: req.body.description,
          price: req.body.price,
        },
      })

      return res
        .status(201)
        .send({ message: 'Product Registered with success!' })
    }
  } catch (error) {
    return res.satus(400).send({ Menssagem: 'Tudo cagado!', error })
  }
}

async function deleteOne(req, res) {
  try {
    const { id } = req.params

    const imagem = await productModel.findById(id)

    console.log(imagem.image)

    console.log('entrou')
    await productModel.findByIdAndDelete(id)

    fs.unlink(`uploads/${imagem.image}`, (err) => {
      if (err) throw err
      console.log('uploads/file.txt was deleted')
    })

    return res.status(201).send({ message: 'Product Deleted with success!' })
  } catch (error) {
    return res.satus(400).send({ Mensagem: 'All cagado!!', error })
  }
}

export default { getAll, create, deleteOne, updateOne, getById }

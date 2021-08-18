import Router from 'express'
import productController from './controllers/productController'
import UserController from './controllers/usersController'

const routes = new Router()

const productsRoutes = [
  routes.post('/register', productController.create),
  routes.get('/', productController.getAll),
]

export default productsRoutes

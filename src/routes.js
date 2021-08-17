import Router from 'express'
import UserController from './controllers/usersController'

const route = new Router()

// route.get('/users', UserController.getAllUsers),
route.post('/register', UserController.register)
route.get('/user/:id', UserController.getById)
route.get('/', UserController.getAll)
route.put('/update/:id', UserController.updateOne)
route.delete('/delete/:id', UserController.deleteOne)

export default route

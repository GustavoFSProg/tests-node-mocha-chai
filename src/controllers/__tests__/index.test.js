// import { expect } from 'chai'
// import UserController from '../usersController'

// describe('User Controller', () => {
//   describe('getAllUsers', () => {
//     const { getAll } = UserController
//     it('should have a getAllUsers action', () => expect(getAll).to.exist)
//     it('should be a function', () => expect(getAll).to.be.a('function'))
//   })

//   describe('User Controller', () => {
//     describe('register Users', () => {
//       const { register } = UserController
//       it('should have a register action', () => expect(register).to.exist)
//       it('should be a function', () => expect(register).to.be.a('function'))
//     })

//     describe('Routes: Users', () => {
//       const defaultUser = {
//         id: 1,
//         name: 'Test User',
//         email: 'test@mail.com',
//         password: 'testPassword',
//       }

//       let token

//       const { Users } = require('../../models/usersModel')

//       beforeEach((done) => {
//         Users.destroy({ where: {} })
//           .then(() =>
//             Users.create({
//               name: 'John',
//               email: 'john@gmail.com',
//               password: '12345',
//             })
//           )
//           .then((user) => {
//             Users.create(defaultUser).then(() => {
//               token = jwt.encode({ id: user.id }, jwtSecret)
//               done()
//             })
//           })
//       })

//       describe('GET /users', () => {
//         it('should return a list of users', (done) => {
//           request
//             .get('/users')
//             .set('Authorization', `JWT ${token}`)
//             .end((err, res) => {
//               expect(res.body[0].name).to.eql(defaultUser.name)
//               expect(res.body[0].id).to.eql(defaultUser.id)
//               done(err)
//             })
//         })
//       })

//       describe('GET /users/{id}', () => {
//         it('should return a user by id', (done) => {
//           request
//             .get('/users/1')
//             .set('Authorization', `JWT ${token}`)
//             .end((err, res) => {
//               expect(res.body.name).to.eql(defaultUser.name)
//               expect(res.body.id).to.eql(defaultUser.id)
//               done(err)
//             })
//         })
//       })

//       describe('POST /users', () => {
//         it('should post a user', (done) => {
//           const user = {
//             id: 2,
//             name: 'User Created',
//             email: 'newUser@mail.com',
//             password: 'newUserPwd',
//           }

//           request
//             .post('/users')
//             .set('Authorization', `JWT ${token}`)
//             .send(user)
//             .end((err, res) => {
//               expect(res.body.name).to.eql(user.name)
//               expect(res.body.id).to.eql(user.id)
//               done(err)
//             })
//         })
//       })

//       // describe('addNewController', () => {
//       //   const { addNewContact } = UserController
//       //   it('should have a AddNewContact action', () =>
//       //     expect(addNewContact).to.exist)
//       //   it('should be a function', () => expect(addNewContact).to.be.a('function'))

//       // context('when the user is loged with correct params', () => {
//       //   it('should return status ok (200)', () => {
//       //     expect(addNewContact(req, re))
//       //   })
//       // })
//     })
//   })
// })

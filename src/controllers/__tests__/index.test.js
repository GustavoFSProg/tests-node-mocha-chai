process.env.NODE_ENV = 'test'

import usersModel from '../../models/usersModel'

var chai = require('chai')
var chaiHttp = require('chai-http')
import app from '../../index'
var should = chai.should()

chai.use(chaiHttp)

describe('usersModel', function () {
  beforeEach(function (done) {
    usersModel.remove({}, function (error) {
      done()
    })
  })

  describe('/GET users', function () {
    it('Should return all users', function (done) {
      chai
        .request(app)
        .get('/')
        .end(function (error, res) {
          res.should.have.status(201)
          res.body.should.be.a('object')
          // res.body.length.should.be.eql(1)
          done()
        })
    })
  })
})

describe('/POST user', function () {
  it('Shoul not return if user is not created', function (done) {
    var user = {
      name: 'Mariana Streb',
      email: 'mari@gmail.com',
      password: 'gegerrtt',
    }
    chai
      .request(app)
      .post('/register')
      .send(user)
      .end(function (error, res) {
        res.should.have.status(201)
        res.body.should.be.a('object')
        done()
      })
  })

  describe('/GET/:id User', function () {
    it('Shoud return a User from Id', function () {
      var user = new usersModel({
        name: 'Mariana Streb',
        email: 'mari@gmail.com',
        password: 'gegerrtt',
      })

      chai
        .request(app)
        .get(`/user/${user._id}`)
        .send(user)
        .end(function (error, res) {
          res.should.be.a('object')
          res.should.have.status(201)
        })
    })
  })

  describe('/DELETE/:id User', function () {
    it('Should delete a user by id', function (done) {
      var user = new usersModel({
        name: 'Ana Streb',
        email: 'ana@gmail.com',
        password: 'gegerrtt',
      })

      user.save(function (error, livro) {
        chai
          .request(app)
          .get(`/user/${user._id}`)
          .send(user)
          .end(function (error, res) {
            res.should.be.a('object')
            res.should.have.status(201)
            chai
              .request(app)
              .delete(`/delete/${user._id}`)
              .end(function (error, res) {
                res.should.have.status(200)

                res.body.should.be.a('object')
                done()
              })
          })
      })
    })

    describe('/UPDATE/:id User', function () {
      it('Should update a user by id', function (done) {
        var user = new usersModel({
          name: 'Marta Streb',
          email: 'marta@gmail.com',
          password: 'gegerrtt',
        })
        user.save(function (error, livro) {
          chai
            .request(app)
            .get(`/user/${user._id}`)
            .send(user)
            .end(function (error, res) {
              res.should.be.a('object')
              res.should.have.status(201)

              chai
                .request(app)
                .put(`/update/${user._id}`)
                .send({
                  name: 'Rafaela editada',
                  email: 'email-editado@gmail.com',
                  password: 'senha-editada',
                })
                .end(function (error, res) {
                  res.should.be.a('object')
                  res.should.have.status(201)

                  done()
                })
            })
        })
      })
    })
  })
})

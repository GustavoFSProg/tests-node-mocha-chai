/*
 * Arquivo: routes/livro.js
 * Author: Glaucia Lemos
 * Description: Arquivo responsável por realizar o TDD com Mocha &amp;amp;amp; Chai no lado do server da nossa app.
 * Data: 21/10/2016
 *
 */

process.env.NODE_ENV = 'test'

var mongoose = require('mongoose')
import usersModel from '../../models/usersModel'
import { getAll } from '../../controllers/usersController'

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
        name: 'Mariana Streb',
        email: 'mari@gmail.com',
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
  })
})
//   .eql('Livro excluído com Sucesso!')

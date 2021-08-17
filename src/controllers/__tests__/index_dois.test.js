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

  describe('/GET/:id livro', function () {
    it('Shoud return a User from Id', function () {
      var user = {
        id: 1,
        name: 'Mariana Streb',
        email: 'mari@gmail.com',
        password: 'gegerrtt',
      }

      chai
        .request(app)
        .get(`/user/611bbb783f5a022309b406f8`)
        .send(user)
        .end(function (error, res) {
          res.should.be.a('object')
          res.should.have.status(201)

          res.body.should.have.property('name')
          res.body.should.have.property('email')
          // res.body.should.have.property('_id').eql(livro.id)
          done()
        })
    })
  })
})

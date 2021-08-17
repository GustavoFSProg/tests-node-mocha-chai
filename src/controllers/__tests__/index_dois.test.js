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

//Aqui estamos declarando as dependências necessárias para realizar os nossos testes!
var chai = require('chai')
var chaiHttp = require('chai-http')
// var app = require('../../index')
import app from '../../index'
var should = chai.should()

chai.use(chaiHttp)

//Aqui é o bloco principal que executará o nossos testes:
describe('usersModel', function () {
  beforeEach(function (done) {
    //Sempre depois de executar o nosso teste, iremos limpar a nossa base de dados:
    usersModel.remove({}, function (error) {
      done()
    })
  })

  /**
   * Teste da rota: /GET
   */
  describe('/GET users', function () {
    it('Should return all users', function (done) {
      chai
        .request(app)
        .get('/')
        .end(function (error, res) {
          //Se tudo der certo deve retornar o status: 200 - OK
          res.should.have.status(201)
          //E em seguida retornar em um array todos os livros cadastrados na base de dados:
          res.body.should.be.a('object')
          //   res.body.length.should.be.eql(1)
          done()
        })
    })
  })
})

describe('/POST user', function () {
  it('Shoul not return if user is not created', function (done) {
    //Aqui simulamos a criação de um livro, porém sem definir a página do livro:
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

  // describe('/GET/:id user', function () {
  //   it('Deve retornar um livro dado o id', function () {
  //     var user = {
  //       id: 1,
  //       name: 'Mariana Streb',
  //       email: 'mari@gmail.com',
  //       password: 'gegerrtt',
  //     }
  //     user.create(function (error, livro) {
  //       chai
  //         .request(app)
  //         .get(`/user/${1}`)
  //         .send(user)
  //         .end(function (error, res) {
  //           res.should.have.status(201)

  //           res.should.be.a('object')
  //           //   res.body.should.have.property('name')
  //           //   res.body.should.have.property('email')
  //           //   res.body.should.have.property('password')
  //           //   res.body.should.have.property('id').eql(user.id)
  //           done()
  //         })
  //     })
  //   })
})

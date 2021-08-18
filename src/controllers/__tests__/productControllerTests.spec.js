process.env.NODE_ENV = 'test'

var chai = require('chai')
var chaiHttp = require('chai-http')
import app from '../../index'
import productModel from '../../models/productModel'
var should = chai.should()

chai.use(chaiHttp)

describe('productModel', function () {
  beforeEach(function (done) {
    productModel.remove({}, function (error) {
      done()
    })
  })

  describe('/GET products', function () {
    it('Should return all products', function (done) {
      chai
        .request(app)
        .get('/')
        .end(function (error, res) {
          res.should.have.status(200)
          res.body.should.be.a('object')
          // res.body.length.should.be.eql(1)
          done()
        })
    })
  })
})

describe('/POST product', function () {
  it('Shoul not return if a product is not created', function (done) {
    var product = {
      title: 'totulo',
      description: 'description',
      price: 'price',
      image: 'filename',
    }
    chai
      .request(app)
      .post('/register')
      .send(product)
      .end(function (error, res) {
        res.should.have.status(201)
        res.body.should.be.a('object')
        done()
      })
  })
})

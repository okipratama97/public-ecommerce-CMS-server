const request = require('supertest')
const { User, Product, sequelize } = require('../models')
const app = require('../app')

let id
let name = 'First Product'
let image_url = 'https://dummyimage.com/600x400/000/fff.jpg&text=PRODUCT+IMAGE'
let price = 50000
let stock = 5
let nameEdited = 'First Product Edited'
let image_urlEdited =
  'https://dummyimage.com/600x400/000/fff.jpg&text=PRODUCT+IMAGE+EDITED'
let priceEdited = 100000
let stockEdited = 10

let access_token_Admin
let access_token_Customer

beforeAll((done) => {
  request(app)
    .post('/register')
    .send({
      email: 'supertest@mail.com',
      password: 'supertest123',
      role: 'Admin',
    })
    .end((err, res) => {
      if (err) {
        done(err)
      }
      access_token_Admin = res.body.access_token
    })
  request(app)
    .post('/register')
    .send({
      email: 'supertestcustomer@mail.com',
      password: 'supertest123',
      role: 'Customer',
    })
    .end((err, res) => {
      if (err) {
        done(err)
      }
      access_token_Customer = res.body.access_token
      done()
    })
})

afterAll((done) => {
  Product.destroy({ where: {} })
    .then((_) => {
      return User.destroy({ where: {} })
    })
    .then((_) => {
      sequelize.close()
      done()
    })
    .catch((err) => {
      done(err)
    })
})

//==========ADD PRODUCT TEST==========
describe('POST /products', function () {
  //=====SUCCESSFUL=====
  describe('Succesful POST /products', function () {
    it('should return status 201 with data', function (done) {
      request(app)
        .post('/products')
        .set({
          access_token: access_token_Admin,
        })
        .send({
          name,
          image_url,
          price,
          stock,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST products test')
            done(err)
          }
          id = res.body.id
          expect(res.status).toEqual(201)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('id')
          expect(typeof res.body.id).toEqual('number')
          expect(res.body).toHaveProperty('name')
          expect(typeof res.body.name).toEqual('string')
          expect(res.body.name).toEqual(name)
          expect(res.body).toHaveProperty('image_url')
          expect(typeof res.body.image_url).toEqual('string')
          expect(res.body.image_url).toEqual(image_url)
          expect(res.body).toHaveProperty('price')
          expect(typeof res.body.price).toEqual('number')
          expect(res.body.price).toEqual(price)
          expect(res.body).toHaveProperty('stock')
          expect(typeof res.body.stock).toEqual('number')
          expect(res.body.stock).toEqual(stock)
          done()
        })
    })
  })

  //=====FAILED=====
  describe('Failed POST /products', function () {
    it('should return status 400 with errors due to empty name', function (done) {
      request(app)
        .post('/products')
        .set({
          access_token: access_token_Admin,
        })
        .send({
          name: '',
          image_url,
          price,
          stock,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST products test')
            done(err)
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Validation error')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('object')
          expect(res.body.message).toContain('Name cannot empty')
          done()
        })
    })

    it('should return status 400 with errors due to empty image_url', function (done) {
      request(app)
        .post('/products')
        .set({
          access_token: access_token_Admin,
        })
        .send({
          name,
          image_url: '',
          price,
          stock,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST products test')
            done(err)
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Validation error')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('object')
          expect(res.body.message).toContain('Image URL cannot empty')
          done()
        })
    })

    it('should return status 400 with errors due to invalid image_url', function (done) {
      request(app)
        .post('/products')
        .set({
          access_token: access_token_Admin,
        })
        .send({
          name,
          image_url: 'this is image url',
          price,
          stock,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST products test')
            done(err)
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Validation error')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('object')
          expect(res.body.message).toContain('Image URL invalid')
          done()
        })
    })

    it('should return status 400 with errors due to empty price', function (done) {
      request(app)
        .post('/products')
        .set({
          access_token: access_token_Admin,
        })
        .send({
          name,
          image_url,
          price: '',
          stock,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST products test')
            done(err)
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Validation error')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('object')
          expect(res.body.message).toContain('Price cannot empty')
          done()
        })
    })

    it('should return status 400 with errors due to invalid price format', function (done) {
      request(app)
        .post('/products')
        .set({
          access_token: access_token_Admin,
        })
        .send({
          name,
          image_url,
          price: 'lima puluh ribu',
          stock,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST products test')
            done(err)
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Validation error')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('object')
          expect(res.body.message).toContain('Price invalid')
          done()
        })
    })

    it('should return status 400 with errors due to invalid price lower than 0', function (done) {
      request(app)
        .post('/products')
        .set({
          access_token: access_token_Admin,
        })
        .send({
          name,
          image_url,
          price: -50000,
          stock,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST products test')
            done(err)
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Validation error')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('object')
          expect(res.body.message).toContain('Price invalid')
          done()
        })
    })

    it('should return status 400 with errors due to empty stock', function (done) {
      request(app)
        .post('/products')
        .set({
          access_token: access_token_Admin,
        })
        .send({
          name,
          image_url,
          price,
          stock: '',
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST products test')
            done(err)
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Validation error')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('object')
          expect(res.body.message).toContain('Stock cannot empty')
          done()
        })
    })

    it('should return status 400 with errors due to invalid stock format', function (done) {
      request(app)
        .post('/products')
        .set({
          access_token: access_token_Admin,
        })
        .send({
          name,
          image_url,
          price,
          stock: 'kosong',
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST products test')
            done(err)
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Validation error')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('object')
          expect(res.body.message).toContain('Stock invalid')
          done()
        })
    })

    it('should return status 400 with errors due to invalid stock lower than 0', function (done) {
      request(app)
        .post('/products')
        .set({
          access_token: access_token_Admin,
        })
        .send({
          name,
          image_url,
          price,
          stock: -5,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST products test')
            done(err)
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Validation error')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('object')
          expect(res.body.message).toContain('Stock invalid')
          done()
        })
    })

    it('should return status 401 with errors due to no access_token', function (done) {
      request(app)
        .post('/products')
        .send({
          name,
          image_url,
          price,
          stock,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST products test')
            done(err)
          }
          expect(res.status).toEqual(401)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Unauthorized')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('string')
          expect(res.body.message).toContain('Please login first')
          done()
        })
    })

    it('should return status 403 with errors due to user role not Admin', function (done) {
      request(app)
        .post('/products')
        .set({
          access_token: access_token_Customer,
        })
        .send({
          name,
          image_url,
          price,
          stock,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST products test')
            done(err)
          }
          expect(res.status).toEqual(403)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Forbidden access')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('string')
          expect(res.body.message).toContain('Only Admin are allowed to access')
          done()
        })
    })
  })
})

//==========GET PRODUCTS TEST==========
describe('GET /products', function () {
  //=====SUCCESSFUL=====
  describe('Successful GET /products', function () {
    it('should return status 200 with data', function (done) {
      request(app)
        .get('/products')
        .set({
          access_token: access_token_Admin,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at GET products test')
          }
          expect(res.status).toEqual(200)
          expect(Array.isArray(res.body)).toEqual(true)
          expect(res.body[0]).toHaveProperty('id')
          expect(typeof res.body[0].id).toEqual('number')
          expect(res.body[0].id).toEqual(id)
          expect(res.body[0]).toHaveProperty('name')
          expect(typeof res.body[0].name).toEqual('string')
          expect(res.body[0].name).toEqual(name)
          expect(res.body[0]).toHaveProperty('image_url')
          expect(typeof res.body[0].image_url).toEqual('string')
          expect(res.body[0].image_url).toEqual(image_url)
          expect(res.body[0]).toHaveProperty('price')
          expect(typeof res.body[0].price).toEqual('number')
          expect(res.body[0].price).toEqual(price)
          expect(res.body[0]).toHaveProperty('stock')
          expect(typeof res.body[0].stock).toEqual('number')
          expect(res.body[0].stock).toEqual(stock)
          done()
        })
    })
  })

  //=====FAILED=====
  describe('Failed GET /products', function () {
    it('should return status 401 with errors due to no access_token', function (done) {
      request(app)
        .get('/products')
        .end((err, res) => {
          if (err) {
            console.log('Error occured at GET products test')
            done(err)
          }
          expect(res.status).toEqual(401)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Unauthorized')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('string')
          expect(res.body.message).toContain('Please login first')
          done()
        })
    })

    it('should return status 403 with errors due to user role not Admin', function (done) {
      request(app)
        .get('/products')
        .set({
          access_token: access_token_Customer,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at GET products test')
            done(err)
          }
          expect(res.status).toEqual(403)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Forbidden access')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('string')
          expect(res.body.message).toContain('Only Admin are allowed to access')
          done()
        })
    })
  })
})

//==========GET SINGLE PRODUCT TEST==========
describe('GET /products/:id', function () {
  //=====SUCCESSFUL=====
  describe('Successful GET /products/:id', function () {
    it('should return status 200 with data', function (done) {
      request(app)
        .get(`/products/${id}`)
        .set({
          access_token: access_token_Admin,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at GET products test')
          }
          expect(res.status).toEqual(200)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('id')
          expect(typeof res.body.id).toEqual('number')
          expect(res.body.id).toEqual(id)
          expect(res.body).toHaveProperty('name')
          expect(typeof res.body.name).toEqual('string')
          expect(res.body.name).toEqual(name)
          expect(res.body).toHaveProperty('image_url')
          expect(typeof res.body.image_url).toEqual('string')
          expect(res.body.image_url).toEqual(image_url)
          expect(res.body).toHaveProperty('price')
          expect(typeof res.body.price).toEqual('number')
          expect(res.body.price).toEqual(price)
          expect(res.body).toHaveProperty('stock')
          expect(typeof res.body.stock).toEqual('number')
          expect(res.body.stock).toEqual(stock)
          done()
        })
    })
  })

  //=====FAILED=====
  describe('Failed GET /products/id', function () {
    it('should return status 404 with errors due to id not found', function (done) {
      request(app)
        .get(`/products/${id + 1}`)
        .set({
          access_token: access_token_Admin,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at GET products test')
            done(err)
          }
          expect(res.status).toEqual(404)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Not Found')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('string')
          expect(res.body.message).toContain('Requested product was not found')
          done()
        })
    })

    it('should return status 401 with errors due to no access_token', function (done) {
      request(app)
        .get(`/products/${id}`)
        .end((err, res) => {
          if (err) {
            console.log('Error occured at GET products test')
            done(err)
          }
          expect(res.status).toEqual(401)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Unauthorized')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('string')
          expect(res.body.message).toContain('Please login first')
          done()
        })
    })

    it('should return status 403 with errors due to user role not Admin', function (done) {
      request(app)
        .get(`/products/${id}`)
        .set({
          access_token: access_token_Customer,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at GET products test')
            done(err)
          }
          expect(res.status).toEqual(403)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Forbidden access')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('string')
          expect(res.body.message).toContain('Only Admin are allowed to access')
          done()
        })
    })
  })
})

//==========EDIT PRODUCT TEST==========
describe('PUT /products', function () {
  //=====SUCCESSFUL=====
  describe('Succesful PUT /products', function () {
    it('should return status 200 with data', function (done) {
      request(app)
        .put(`/products/${id}`)
        .set({
          access_token: access_token_Admin,
        })
        .send({
          name: nameEdited,
          image_url: image_urlEdited,
          price: priceEdited,
          stock: stockEdited,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at PUT products test')
            done(err)
          }
          id = res.body.id
          expect(res.status).toEqual(200)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('id')
          expect(typeof res.body.id).toEqual('number')
          expect(res.body).toHaveProperty('name')
          expect(typeof res.body.name).toEqual('string')
          expect(res.body.name).toEqual(nameEdited)
          expect(res.body).toHaveProperty('image_url')
          expect(typeof res.body.image_url).toEqual('string')
          expect(res.body.image_url).toEqual(image_urlEdited)
          expect(res.body).toHaveProperty('price')
          expect(typeof res.body.price).toEqual('number')
          expect(res.body.price).toEqual(priceEdited)
          expect(res.body).toHaveProperty('stock')
          expect(typeof res.body.stock).toEqual('number')
          expect(res.body.stock).toEqual(stockEdited)
          done()
        })
    })
  })

  //=====FAILED=====
  describe('Failed PUT /products', function () {
    it('should return status 400 with errors due to empty name', function (done) {
      request(app)
        .put(`/products/${id}`)
        .set({
          access_token: access_token_Admin,
        })
        .send({
          name: '',
          image_url,
          price,
          stock,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at PUT products test')
            done(err)
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Validation error')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('object')
          expect(res.body.message).toContain('Name cannot empty')
          done()
        })
    })

    it('should return status 400 with errors due to empty image_url', function (done) {
      request(app)
        .put(`/products/${id}`)
        .set({
          access_token: access_token_Admin,
        })
        .send({
          name,
          image_url: '',
          price,
          stock,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at PUT products test')
            done(err)
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Validation error')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('object')
          expect(res.body.message).toContain('Image URL cannot empty')
          done()
        })
    })

    it('should return status 400 with errors due to invalid image_url', function (done) {
      request(app)
        .put(`/products/${id}`)
        .set({
          access_token: access_token_Admin,
        })
        .send({
          name,
          image_url: 'this is image url',
          price,
          stock,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at PUT products test')
            done(err)
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Validation error')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('object')
          expect(res.body.message).toContain('Image URL invalid')
          done()
        })
    })

    it('should return status 400 with errors due to empty price', function (done) {
      request(app)
        .put(`/products/${id}`)
        .set({
          access_token: access_token_Admin,
        })
        .send({
          name,
          image_url,
          price: '',
          stock,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at PUT products test')
            done(err)
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Validation error')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('object')
          expect(res.body.message).toContain('Price cannot empty')
          done()
        })
    })

    it('should return status 400 with errors due to invalid price format', function (done) {
      request(app)
        .put(`/products/${id}`)
        .set({
          access_token: access_token_Admin,
        })
        .send({
          name,
          image_url,
          price: 'lima puluh ribu',
          stock,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at PUT products test')
            done(err)
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Validation error')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('object')
          expect(res.body.message).toContain('Price invalid')
          done()
        })
    })

    it('should return status 400 with errors due to invalid price lower than 0', function (done) {
      request(app)
        .put(`/products/${id}`)
        .set({
          access_token: access_token_Admin,
        })
        .send({
          name,
          image_url,
          price: -50000,
          stock,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at PUT products test')
            done(err)
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Validation error')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('object')
          expect(res.body.message).toContain('Price invalid')
          done()
        })
    })

    it('should return status 400 with errors due to empty stock', function (done) {
      request(app)
        .put(`/products/${id}`)
        .set({
          access_token: access_token_Admin,
        })
        .send({
          name,
          image_url,
          price,
          stock: '',
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at PUT products test')
            done(err)
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Validation error')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('object')
          expect(res.body.message).toContain('Stock cannot empty')
          done()
        })
    })

    it('should return status 400 with errors due to invalid stock format', function (done) {
      request(app)
        .put(`/products/${id}`)
        .set({
          access_token: access_token_Admin,
        })
        .send({
          name,
          image_url,
          price,
          stock: 'kosong',
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at PUT products test')
            done(err)
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Validation error')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('object')
          expect(res.body.message).toContain('Stock invalid')
          done()
        })
    })

    it('should return status 400 with errors due to invalid stock lower than 0', function (done) {
      request(app)
        .put(`/products/${id}`)
        .set({
          access_token: access_token_Admin,
        })
        .send({
          name,
          image_url,
          price,
          stock: -5,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at PUT products test')
            done(err)
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Validation error')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('object')
          expect(res.body.message).toContain('Stock invalid')
          done()
        })
    })

    it('should return status 404 with errors due to id not found', function (done) {
      request(app)
        .get(`/products/${id + 1}`)
        .set({
          access_token: access_token_Admin,
        })
        .send({
          name,
          image_url,
          price,
          stock,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at GET products test')
            done(err)
          }
          expect(res.status).toEqual(404)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Not Found')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('string')
          expect(res.body.message).toContain('Requested product was not found')
          done()
        })
    })

    it('should return status 401 with errors due to no access_token', function (done) {
      request(app)
        .put(`/products/${id}`)
        .send({
          name,
          image_url,
          price,
          stock,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at PUT products test')
            done(err)
          }
          expect(res.status).toEqual(401)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Unauthorized')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('string')
          expect(res.body.message).toContain('Please login first')
          done()
        })
    })

    it('should return status 403 with errors due to user role not Admin', function (done) {
      request(app)
        .put(`/products/${id}`)
        .set({
          access_token: access_token_Customer,
        })
        .send({
          name,
          image_url,
          price,
          stock,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at PUT products test')
            done(err)
          }
          expect(res.status).toEqual(403)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Forbidden access')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('string')
          expect(res.body.message).toContain('Only Admin are allowed to access')
          done()
        })
    })
  })
})

//==========DELETE PRODUCT TEST==========
describe('DELETE /products/:id', function () {
  //=====FAILED=====
  describe('Failed DELETE /products/id', function () {
    it('should return status 404 with errors due to id not found', function (done) {
      request(app)
        .delete(`/products/${id + 1}`)
        .set({
          access_token: access_token_Admin,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at DELETE products test')
            done(err)
          }
          expect(res.status).toEqual(404)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Not Found')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('string')
          expect(res.body.message).toContain('Requested product was not found')
          done()
        })
    })

    it('should return status 401 with errors due to no access_token', function (done) {
      request(app)
        .delete(`/products/${id}`)
        .end((err, res) => {
          if (err) {
            console.log('Error occured at DELETE products test')
            done(err)
          }
          expect(res.status).toEqual(401)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Unauthorized')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('string')
          expect(res.body.message).toContain('Please login first')
          done()
        })
    })

    it('should return status 403 with errors due to user role not Admin', function (done) {
      request(app)
        .delete(`/products/${id}`)
        .set({
          access_token: access_token_Customer,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at DELETE products test')
            done(err)
          }
          expect(res.status).toEqual(403)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Forbidden access')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('string')
          expect(res.body.message).toContain('Only Admin are allowed to access')
          done()
        })
    })
  })

  //=====SUCCESSFUL=====
  describe('Successful DELETE /products/:id', function () {
    it('should return status 200 with data', function (done) {
      request(app)
        .delete(`/products/${id}`)
        .set({
          access_token: access_token_Admin,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at DELETE products test')
          }
          expect(res.status).toEqual(200)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('id')
          expect(typeof res.body.id).toEqual('number')
          expect(res.body.id).toEqual(id)
          expect(res.body).toHaveProperty('name')
          expect(typeof res.body.name).toEqual('string')
          expect(res.body.name).toEqual(nameEdited)
          expect(res.body).toHaveProperty('image_url')
          expect(typeof res.body.image_url).toEqual('string')
          expect(res.body.image_url).toEqual(image_urlEdited)
          expect(res.body).toHaveProperty('price')
          expect(typeof res.body.price).toEqual('number')
          expect(res.body.price).toEqual(priceEdited)
          expect(res.body).toHaveProperty('stock')
          expect(typeof res.body.stock).toEqual('number')
          expect(res.body.stock).toEqual(stockEdited)
          done()
        })
    })
  })
})

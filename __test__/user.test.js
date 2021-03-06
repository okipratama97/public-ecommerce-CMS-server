const request = require('supertest')
const { User, sequelize } = require('../models')
const app = require('../app')

let id
let email = 'supertest@mail.com'
let password = 'supertest123'
let role = 'Admin'

afterAll((done) => {
  User.destroy({ where: {} })
    .then((_) => {
      sequelize.close()
      done()
    })
    .catch((err) => {
      done(err)
    })
})

//==========REGISTER TEST==========
describe('POST /register', function () {
  //=====SUCCESSFUL=====
  describe('Succesful POST /register', function () {
    it('should return status 201 with data using Admin role', function (done) {
      request(app)
        .post('/register')
        .send({
          email,
          password,
          role,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST register test')
            done(err)
          }
          id = res.body.id
          expect(res.status).toEqual(201)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('id')
          expect(typeof res.body.id).toEqual('number')
          expect(res.body).toHaveProperty('email')
          expect(typeof res.body.email).toEqual('string')
          expect(res.body.email).toEqual(email)
          expect(res.body).toHaveProperty('access_token')
          expect(typeof res.body.access_token).toEqual('string')
          done()
        })
    })

    it('should return status 201 with data using Customer role', function (done) {
      request(app)
        .post('/register')
        .send({
          email: 'customer@mail.com',
          password: 'customer123',
          role: 'Customer',
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST register test')
            done(err)
          }
          expect(res.status).toEqual(201)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('id')
          expect(typeof res.body.id).toEqual('number')
          expect(res.body).toHaveProperty('email')
          expect(typeof res.body.email).toEqual('string')
          expect(res.body.email).toEqual('customer@mail.com')
          expect(res.body).toHaveProperty('access_token')
          expect(typeof res.body.access_token).toEqual('string')
          done()
        })
    })
  })

  //=====FAILED=====
  describe('Failed POST /register', function () {
    it('should return status 400 with errors due to empty email', function (done) {
      request(app)
        .post('/register')
        .send({
          email: '',
          password,
          role,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST register test')
            done(err)
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Validation error')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('object')
          expect(res.body.message).toContain('Email cannot empty')
          done()
        })
    })

    it('should return status 400 with errors due to invalid email format', function (done) {
      request(app)
        .post('/register')
        .send({
          email: 'register',
          password,
          role,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST register test')
            done(err)
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Validation error')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('object')
          expect(res.body.message).toContain('Email Invalid')
          done()
        })
    })

    it('should return status 400 with errors due to duplicate email', function (done) {
      request(app)
        .post('/register')
        .send({
          email,
          password,
          role,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST register test')
            done(err)
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Validation error')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('string')
          expect(res.body.message).toContain('Email has been used')
          done()
        })
    })

    it('should return status 400 with errors due to empty password', function (done) {
      request(app)
        .post('/register')
        .send({
          email: 'register2@mail.com',
          password: '',
          role,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST register test')
            done(err)
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Validation error')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('object')
          expect(res.body.message).toContain('Password cannot empty')
          done()
        })
    })

    it('should return status 400 with errors due to password length less than 8', function (done) {
      request(app)
        .post('/register')
        .send({
          email: 'register2@mail.com',
          password: 'regis',
          role,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST register test')
            done(err)
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Validation error')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('object')
          expect(res.body.message).toContain('Password length minimum 8')
          done()
        })
    })

    it('should return status 400 with errors due to role not Admin or Customer', function (done) {
      request(app)
        .post('/register')
        .send({
          email: 'register2@mail.com',
          password,
          role: 'Owner',
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST register test')
            done(err)
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Validation error')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('object')
          expect(res.body.message).toContain('Role Invalid')
          done()
        })
    })
  })
})

//==========LOGIN TEST==========
describe('POST /login', function () {
  //=====SUCCESSFUL=====
  describe('Successful POST /login', function () {
    it('should return status 200 with data', function (done) {
      request(app)
        .post('/login')
        .send({
          email,
          password,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST login test')
          }
          expect(res.status).toEqual(200)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('id')
          expect(typeof res.body.id).toEqual('number')
          expect(res.body.id).toEqual(id)
          expect(res.body).toHaveProperty('email')
          expect(typeof res.body.email).toEqual('string')
          expect(res.body.email).toEqual(email)
          expect(res.body).toHaveProperty('access_token')
          expect(typeof res.body.access_token).toEqual('string')
          done()
        })
    })
  })

  //=====FAILED=====
  describe('Failed POST /login', function () {
    it('should return status 400 with errors due to empty email', function (done) {
      request(app)
        .post('/login')
        .send({
          email: '',
          password,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST login test')
            done(err)
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Validation error')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('string')
          expect(res.body.message).toContain('Please enter email and password')
          done()
        })
    })

    it('should return status 400 with errors due to wrong email', function (done) {
      request(app)
        .post('/login')
        .send({
          email: 'login@mail.com',
          password,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST login test')
            done(err)
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Validation error')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('string')
          expect(res.body.message).toContain('Wrong email or password')
          done()
        })
    })

    it('should return status 400 with errors due to empty password', function (done) {
      request(app)
        .post('/login')
        .send({
          email,
          password: '',
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST login test')
            done(err)
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Validation error')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('string')
          expect(res.body.message).toContain('Please enter email and password')
          done()
        })
    })

    it('should return status 400 with errors due to wrong password', function (done) {
      request(app)
        .post('/login')
        .send({
          email,
          password: 'login',
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST login test')
            done(err)
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Validation error')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('string')
          expect(res.body.message).toContain('Wrong email or password')
          done()
        })
    })

    it('should return status 403 with errors due to login using Customer role', function (done) {
      request(app)
        .post('/login')
        .send({
          email: 'customer@mail.com',
          password: 'customer123',
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST login test')
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

const sinon = require('sinon')
const supertest = require('supertest')
const {expect, should, assert} = require('chai')
const { response } = require('../src/helpers/standardRes')
const {APP_URL} = process.env

const { login, register } = require('../src/controllers/auth')
describe('Auth Login testing ', () => {

  it(`email not found`, (done) => {
    let req = {
      body: {
        email: 'cupaxx',
        password: '123456'
      }
    }
    const mockingResponse = () => {
      const res = {}
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(res)
      return res
    }
    const res = mockingResponse()
    login(req,res).then((data) => {
      expect(data.json.args[0][0].success).to.be.false
      expect(data.json.args[0][0].message).equal('email not found')
      expect(data.status.args[0][0]).equal(401)
    }).catch((err) => {
      console.log(err)
    })
    done()
  })

  it(`wrong email or password`, (done) => {
    let req = {
      body: {
        email: 'admin@gmail.com',
        password: '123456'
      }
    }
    const mockingResponse = () => {
      const res = {}
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(res)
      return res
    }
    const res = mockingResponse()
    login(req,res)
    .then((data) => {
      expect(data.json.args[0][0].success).to.be.false
      expect(data.json.args[0][0].message).equal('wrong email or password')
      expect(data.status.args[0][0]).equal(401)
    }).catch((err) => {
      console.log(err)
    })
    done()
  })

  it(`Login Success`, (done) => {
    let req = {
      body: {
        email: 'admin@gmail.com',
        password: '1234567'
      }
    }
    const mockingResponse = () => {
      const res = {}
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(res)
      return res
    }
    const res = mockingResponse()
    login(req,res).then((data) => {
      expect(data.json.args[0][0].success).to.be.true
      expect(data.json.args[0][0].message).equal('Login Success')
      expect(data.status.args[0][0]).equal(200)
    }).catch((err) => {
      console.log(err)
    })
    done()
  })

  
})

describe('Auth Register Testing', () => {
  

  it(`Register SuccesFully`, (done) => {
    let req = {
      body: {
        email: 'azsdf4abb@email.com',
        password: '12345',
        phoneNumber: '0831537896121'
      }
    }
    const mockingResponse = () => {
      const res = {}
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(res)
      return res
    }
    const res = mockingResponse()
    register(req, res).then((data) => {
      expect(data.json.args[0][0].success).to.be.true
      expect(data.json.args[0][0].message).equal('Register SuccesFully, You can Login Now')
      expect(data.status.args[0][0]).equal(200)
    }).catch((err) => {
      console.log(err)
    })
    done()
  })


  
})
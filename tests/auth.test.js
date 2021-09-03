const sinon = require('sinon')
const supertest = require('supertest')
const {expect, should, assert} = require('chai')
const { response } = require('../src/helpers/standardRes')
const {APP_URL} = process.env

const { login, register } = require('../src/controllers/auth')
describe('Auth Login testing ', () => {
  // it('Wrong email format', (done) => {
  //   supertest(APP_URL)
  //   .post('/auth/login')
  //   .send(`email=admin&password=123456`)
  //   .expect(400)
  //   .end((err, res) => {
  //     expect(res.body.success).to.be.false
  //     expect(res.body.message).equal('Wrong email format')
  //     done()
  //   })
  // })

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

  // it('Password length less than 6 characters ', (done) => {
  //   supertest(APP_URL)
  //   .post('/auth/login')
  //   .send(`email=admin@email.com&password=1234`)
  //   .expect(400)
  //   .end((err, res) => {
  //     expect(res.body.success).to.be.false
  //     expect(res.body.message).equal('password length must be 6 characters at least')
  //     done()
  //   })
  // })

  // it('Email not found ', (done) => {
  //   supertest(APP_URL)
  //   .post('/auth/login')
  //   .send(`email=maj@email.com&password=123456`)
  //   .expect(400)
  //   .end((err, res) => {
  //     expect(res.body.success).to.be.false
  //     expect(res.body.message).equal('email not found')
  //     done()
  //   })
  // })

  // it('wrong email and password', (done) => {
  //   supertest(APP_URL)
  //   .post('/auth/login')
  //   .send(`email=reza@email.com&password=12345678`)
  //   .expect(400)
  //   .end((err, res) => {
  //     expect(res.body.success).to.be.false
  //     expect(res.body.message).equal('email or password is false')
  //     done()
  //   })
  // })

  // it('success login', (done) => {
  //   supertest(APP_URL)
  //   .post('/auth/login')
  //   .send(`email=reza@email.com&password=123456`)
  //   .expect(200)
  //   .end((err, res) => {
  //     expect(res.body.success).to.be.true
  //     expect(res.body.message).equal('Login success')
  //     expect(res.body.results.token).to.be.a('string')
  //     done()
  //   })
  // })
})

describe('Auth Register Testing', () => {
  // it(`email is already in use`, (done) => {
  //   let req = {
  //     body: {
  //       email: 'reza@email.com',
  //       phone_number: '087767463517',
  //       password: '123456'
  //     }
  //   }
  //   const mockingResponse = () => {
  //     const res = {}
  //     res.status = sinon.stub().returns(res)
  //     res.json = sinon.stub().returns(res)
  //     return res
  //   }
  //   const res = mockingResponse()
  //   register(req,res).then((data) => {
  //     expect(data.json.args[0][0].success).to.be.false
  //     expect(data.json.args[0][0].message).equal('email is already in use')
  //     expect(data.status.args[0][0]).equal(400)
  //   }).catch((err) => {
  //     console.log(err)
  //   })
  //   done()
  // })

  // it(`phone number is already in use`, (done) => {
  //   let req = {
  //     body: {
  //       email: 'rezaf21@email.com',
  //       phone_number: '087767463517',
  //       password: '123456'
  //     }
  //   }
  //   const mockingResponse = () => {
  //     const res = {}
  //     res.status = sinon.stub().returns(res)
  //     res.json = sinon.stub().returns(res)
  //     return res
  //   }
  //   const res = mockingResponse()
  //   register(req,res).then((data) => {
  //     expect(data.json.args[0][0].success).to.be.false
  //     expect(data.json.args[0][0].message).equal('phone number is already in use')
  //     expect(data.status.args[0][0]).equal(400)
  //   }).catch((err) => {
  //     console.log(err)
  //   })
  //   done()
  // })

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


  // it('Wrong email format', (done) => {
  //   supertest(APP_URL)
  //   .post('/auth/register')
  //   .send(`email=admin&password=123456&phone_number=082212435142`)
  //   .expect(400)
  //   .end((err, res) => {
  //     expect(res.body.success).to.be.false
  //     expect(res.body.message).equal('Wrong email format')
  //     done()
  //   })
  // })

  // it('Email is already in use ', (done) => {
  //   supertest(APP_URL)
  //   .post('/auth/register')
  //   .send(`email=reza@email.com&password=123456&phone_number=082212435142`)
  //   .expect(400)
  //   .end((err, res) => {
  //     expect(res.body.success).to.be.false
  //     expect(res.body.message).equal('email is already in use')
  //     done()
  //   })
  // })

  // it('Password length less than 6 characters ', (done) => {
  //   supertest(APP_URL)
  //   .post('/auth/register')
  //   .send(`email=admin@email.com&password=1234&phone_number=082212435142`)
  //   .expect(400)
  //   .end((err, res) => {
  //     expect(res.body.success).to.be.false
  //     expect(res.body.message).equal('password length must be 6 characters at least')
  //     done()
  //   })
  // })

  // it('Phone number length less than 11 characters ', (done) => {
  //   supertest(APP_URL)
  //   .post('/auth/register')
  //   .send(`email=rezak@email.com&password=123456&phone_number=0822`)
  //   .expect(400)
  //   .end((err, res) => {
  //     expect(res.body.success).to.be.false
  //     expect(res.body.message).equal('phone number length must be 11 characters at least')
  //     done()
  //   })
  // })

  // it('Phone number is already in use ', (done) => {
  //   supertest(APP_URL)
  //   .post('/auth/register')
  //   .send(`email=rezak@email.com&password=123456&phone_number=0877674635149`)
  //   .expect(400)
  //   .end((err, res) => {
  //     expect(res.body.success).to.be.false
  //     expect(res.body.message).equal('phone number is already in use')
  //     done()
  //   })
  // })

  // it('success register', (done) => {
  //   supertest(APP_URL)
  //   .post('/auth/register')
  //   .send(`email=rezaxx@email.com&password=123456&phone_number=0877674635147`)
  //   .expect(200)
  //   .end((err, res) => {
  //     expect(res.body.success).to.be.true
  //     expect(res.body.message).equal('registration successfully')
  //     done()
  //   })
  // })
})
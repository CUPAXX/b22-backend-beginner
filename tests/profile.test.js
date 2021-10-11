const sinon = require('sinon')
const supertest = require('supertest')
const {expect, should, assert} = require('chai')
const { response } = require('../src/helpers/standardRes')
const {APP_URL} = process.env

const {getUser} = require('../src/controllers/profile')

describe("profile test", () => {
  it('get profile', (done) => {
    let req = {
      authUser: {
        id: 36
      }
    }
    const mockingResponse = () => {
      const res = {}
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(res)
      return res
    }
    const res = mockingResponse()
    getUser(req, res).then((data) => {
      console.log(data.json.args[0][0])
      expect(data.json.args[0][0].results).to.be.a('object')
      expect(data.json.args[0][0].results.id).to.be.a('number')
      // expect(data.json.args[0][0].success).to.be.true
      // expect(data.json.args[0][0].message).equal('List of category')
      // expect(data.status.args[0][0]).equal(200)
    }).catch((err) => {
      console.log(err)
    })
    done()
  })
})
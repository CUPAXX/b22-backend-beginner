const sinon = require('sinon')
const supertest = require('supertest')
const {expect, should, assert} = require('chai')
const { response } = require('../src/helpers/standardRes')
const {APP_URL} = process.env

const { getVariants, createVariants, updateVariants, deleteVariants } = require('../src/controllers/variants')
describe('Variants Testing ', () => {
  it(`get variants`, (done) => {
    let req = {
      body: {
      }
    }
    const mockingResponse = () => {
      const res = {}
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(res)
      return res
    }
    const res = mockingResponse()
    getVariants(req, res).then((data) => {
      expect(data.json.args[0][0].success).to.be.true
      expect(data.json.args[0][0].message).equal('List of variants')
      expect(data.status.args[0][0]).equal(200)
    }).catch((err) => {
      console.log(err)
    })
    done()
  })
})

describe('Create Variants Testing ', () => {
  it(`create Variants success`, (done) => {
    let req = {
      body: {
        name: 'coba',
        aditional_price: 3000
      },
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
    createVariants(req, res).then((data) => {
      expect(data.json.args[0][0].success).to.be.true
      expect(data.json.args[0][0].message).equal('variants has been successfully created')
      expect(data.status.args[0][0]).equal(200)
    }).catch((err) => {
      console.log(err)
    })
    done()
  })

  it(`create Variants failed not admin`, (done) => {
    let req = {
      body: {
        name: 'coba',
        aditional_price: 3000
      },
      authUser: {
        id: 37
      }
    }
    const mockingResponse = () => {
      const res = {}
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(res)
      return res
    }
    const res = mockingResponse()
    createVariants(req, res).then((data) => {
      expect(data.json.args[0][0].success).to.be.false
      expect(data.json.args[0][0].message).equal('You are not admin can\'t do this action')
      expect(data.status.args[0][0]).equal(500)
    }).catch((err) => {
      console.log(err)
    })
    done()
  })
})

describe('update Variants Testing ', () => {
  it(`update Variants success`, (done) => {
    let req = {
      body: {
        name: 'coba',
        aditionalPrice: 3000
      },
      authUser: {
        id: 36
      },
      params: {
        id: 24
      }
    }
    const mockingResponse = () => {
      const res = {}
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(res)
      return res
    }
    const res = mockingResponse()
    updateVariants(req, res).then((data) => {
      expect(data.json.args[0][0].success).to.be.true
      expect(data.json.args[0][0].message).equal('variants update successfully')
      expect(data.status.args[0][0]).equal(200)
    }).catch((err) => {
      console.log(err)
    })
    done()
  })

  it(`update Variants failed not admin`, (done) => {
    let req = {
      body: {
        name: 'coba',
        aditionalPrice: 3000
      },
      authUser: {
        id: 37
      },
      params: {
        id: 24
      }
    }
    const mockingResponse = () => {
      const res = {}
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(res)
      return res
    }
    const res = mockingResponse()
    updateVariants(req, res).then((data) => {
      expect(data.json.args[0][0].success).to.be.false
      expect(data.json.args[0][0].message).equal('You are not admin can\'t do this action')
      expect(data.status.args[0][0]).equal(500)
    }).catch((err) => {
      console.log(err)
    })
    done()
  })

  it(`update Variants failed`, (done) => {
    let req = {
      body: {
        name: 'coba',
        aditionalPrice: 3000
      },
      authUser: {
        id: 36
      },
      params: {
        id: 999
      }
    }
    const mockingResponse = () => {
      const res = {}
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(res)
      return res
    }
    const res = mockingResponse()
    updateVariants(req, res).then((data) => {
      expect(data.json.args[0][0].success).to.be.false
      expect(data.json.args[0][0].message).equal('variants Not Found')
      expect(data.status.args[0][0]).equal(400)
    }).catch((err) => {
      console.log(err)
    })
    done()
  })
})

describe('delete Variants Testing ', () => {
  // it(`delete Variants success`, (done) => {
  //   let req = {
  //     body: {},
  //     authUser: {
  //       id: 36
  //     },
  //     params: {
  //       id: 30
  //     }
  //   }
  //   const mockingResponse = () => {
  //     const res = {}
  //     res.status = sinon.stub().returns(res)
  //     res.json = sinon.stub().returns(res)
  //     return res
  //   }
  //   const res = mockingResponse()
  //   deleteVariants(req, res).then((data) => {
  //     expect(data.json.args[0][0].success).to.be.true
  //     expect(data.json.args[0][0].message).equal('variants delete success')
  //     expect(data.status.args[0][0]).equal(200)
  //   }).catch((err) => {
  //     console.log(err)
  //   })
  //   done()
  // })

  it(`delete Variants failed`, (done) => {
    let req = {
      body: {},
      authUser: {
        id: 36
      },
      params: {
        id: 3999
      }
    }
    const mockingResponse = () => {
      const res = {}
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(res)
      return res
    }
    const res = mockingResponse()
    deleteVariants(req, res).then((data) => {
      expect(data.json.args[0][0].success).to.be.false
      expect(data.json.args[0][0].message).equal('variants Not Found')
      expect(data.status.args[0][0]).equal(400)
    }).catch((err) => {
      console.log(err)
    })
    done()
  })

  it(`delete Variants failed not admin`, (done) => {
    let req = {
      body: {},
      authUser: {
        id: 37
      },
      params: {
        id: 3999
      }
    }
    const mockingResponse = () => {
      const res = {}
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(res)
      return res
    }
    const res = mockingResponse()
    deleteVariants(req, res).then((data) => {
      expect(data.json.args[0][0].success).to.be.false
      expect(data.json.args[0][0].message).equal('You are not admin can\'t do this action')
      expect(data.status.args[0][0]).equal(500)
    }).catch((err) => {
      console.log(err)
    })
    done()
  })

})
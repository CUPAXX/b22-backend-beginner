const sinon = require('sinon')
const supertest = require('supertest')
const {expect, should, assert} = require('chai')
const { response } = require('../src/helpers/standardRes')
const {APP_URL} = process.env

const { getCategory, getCategoryItem, createCategory, updateCategory, deleteCategory } = require('../src/controllers/category')
describe('get Category Testing ', () => {
  it(`get Category`, (done) => {
    let req = {
     
    }
    const mockingResponse = () => {
      const res = {}
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(res)
      return res
    }
    const res = mockingResponse()
    getCategory(req, res).then((data) => {
      expect(data.json.args[0][0].success).to.be.true
      expect(data.json.args[0][0].message).equal('List of category')
      expect(data.status.args[0][0]).equal(200)
    }).catch((err) => {
      console.log(err)
    })
    done()
  })

})

describe('get item by Category Testing ', () => {
  it(`get item By Category success`, (done) => {
    let req = {
     params: {id: 1}
    }
    const mockingResponse = () => {
      const res = {}
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(res)
      return res
    }
    const res = mockingResponse()
    getCategoryItem(req, res).then((data) => {
      expect(data.json.args[0][0].success).to.be.true
      expect(data.json.args[0][0].message).equal('Detail category Item')
      expect(data.status.args[0][0]).equal(200)
    }).catch((err) => {
      console.log(err)
    })
    done()
  })

  it(`get item By Category failed`, (done) => {
    let req = {
     params: {id: 999}
    }
    const mockingResponse = () => {
      const res = {}
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(res)
      return res
    }
    const res = mockingResponse()
    getCategoryItem(req, res).then((data) => {
      expect(data.json.args[0][0].success).to.be.false
      expect(data.json.args[0][0].message).equal('category Not Found')
      expect(data.status.args[0][0]).equal(400)
    }).catch((err) => {
      console.log(err)
    })
    done()
  })
})

describe('Create Category Testing ', () => {
  it(`Create Category success`, (done) => {
    let req = {
     body: {
       name: 'test',
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
    createCategory(req, res).then((data) => {
      expect(data.json.args[0][0].success).to.be.true
      expect(data.json.args[0][0].message).equal('Category has been create successfully')
      expect(data.status.args[0][0]).equal(200)
    }).catch((err) => {
      console.log(err)
    })
    done()
  })

  it(`Create Category failed`, (done) => {
    let req = {
     body: {
       name: 'test',
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
    createCategory(req, res).then((data) => {
      expect(data.json.args[0][0].success).to.be.false
      expect(data.json.args[0][0].message).equal('You are not admin can\'t do this action')
      expect(data.status.args[0][0]).equal(500)
    }).catch((err) => {
      console.log(err)
    })
    done()
  })
})

describe('Update Category Testing ', () => {
  it(`Update Category success`, (done) => {
    let req = {
     body: {
       name: 'test',
     },
     authUser: {
       id: 36
     },
     params: {
       id: 20
     }
    }
    const mockingResponse = () => {
      const res = {}
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(res)
      return res
    }
    const res = mockingResponse()
    updateCategory(req, res).then((data) => {
      expect(data.json.args[0][0].success).to.be.true
      expect(data.json.args[0][0].message).equal('Category update successfully')
      expect(data.status.args[0][0]).equal(200)
    }).catch((err) => {
      console.log(err)
    })
    done()
  })

  it(`Update Category failed user role not admin`, (done) => {
    let req = {
     body: {
       name: 'test',
     },
     authUser: {
       id: 37
     },
     params: {
      id: 20
    }
    }
    const mockingResponse = () => {
      const res = {}
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(res)
      return res
    }
    const res = mockingResponse()
    updateCategory(req, res).then((data) => {
      expect(data.json.args[0][0].success).to.be.false
      expect(data.json.args[0][0].message).equal('You are not admin can\'t do this action')
      expect(data.status.args[0][0]).equal(500)
    }).catch((err) => {
      console.log(err)
    })
    done()
  })

  it(`Update Category failed`, (done) => {
    let req = {
      body: {
        name: 'test',
      },
      authUser: {
        id: 36
      },
      params: {
        id: 14
      }
    }
    const mockingResponse = () => {
      const res = {}
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(res)
      return res
    }
    const res = mockingResponse()
    updateCategory(req, res).then((data) => {
      expect(data.json.args[0][0].success).to.be.false
      expect(data.json.args[0][0].message).equal('Category Not Found')
      expect(data.status.args[0][0]).equal(400)
    }).catch((err) => {
      console.log(err)
    })
    done()
  })
})

describe('delete Category Testing ', () => {
  // it(`delete Category success`, (done) => {
  //   let req = {
  //     body: {},
  //     authUser: {
  //       id: 36
  //     },
  //     params: {
  //       id: 39
  //     }
  //   }
  //   const mockingResponse = () => {
  //     const res = {}
  //     res.status = sinon.stub().returns(res)
  //     res.json = sinon.stub().returns(res)
  //     return res
  //   }
  //   const res = mockingResponse()
  //   deleteCategory(req, res).then((data) => {
  //     expect(data.json.args[0][0].success).to.be.true
  //     expect(data.json.args[0][0].message).equal('Category has been Delete')
  //     expect(data.status.args[0][0]).equal(200)
  //   }).catch((err) => {
  //     console.log(err)
  //   })
  //   done()
  // })

  it(`delete Category failed`, (done) => {
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
    deleteCategory(req, res).then((data) => {
      expect(data.json.args[0][0].success).to.be.false
      expect(data.json.args[0][0].message).equal('Category Not Found')
      expect(data.status.args[0][0]).equal(400)
    }).catch((err) => {
      console.log(err)
    })
    done()
  })

  it(`delete Category failed not admin`, (done) => {
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
    deleteCategory(req, res).then((data) => {
      expect(data.json.args[0][0].success).to.be.false
      expect(data.json.args[0][0].message).equal('You are not admin can\'t do this action')
      expect(data.status.args[0][0]).equal(500)
    }).catch((err) => {
      console.log(err)
    })
    done()
  })

})
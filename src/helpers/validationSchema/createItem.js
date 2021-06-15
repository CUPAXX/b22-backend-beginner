module.exports = {
  price: {
    in: ['body'],
    isInt: {
      errorMessage: 'price must be grater than 1',
      options: {
        min: 1
      }
    },
    toInt: true
  },
  stock: {
    in: ['body'],
    isInt: {
      errorMessage: 'stock must be greatet than 1',
      options: {
        min: 1
      }
    },
    toInt: true
  }
}

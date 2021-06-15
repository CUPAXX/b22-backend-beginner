module.exports = {
  name: {
    in: ['body'],
    isLength: {
      errorMessage: 'name length min 5 character',
      options: {
        min: 4
      }
    }
  },
  password: {
    in: ['body'],
    isLength: {
      errorMessage: 'password length min 7 character',
      options: {
        min: 7
      }
    }
  }
}

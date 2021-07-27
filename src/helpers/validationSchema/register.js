module.exports = {
  phoneNumber: {
    in: ['body'],
    isLength: {
      errorMessage: 'phone number length min 11 character',
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

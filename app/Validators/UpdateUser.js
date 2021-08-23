'use strict'

class UpdateUser {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      name: 'string',
      email: 'email'
    }
  }
}

module.exports = UpdateUser

'use strict'

class UpdateUser {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      name: 'required',
      email: 'required|email|confirmed'
    }
  }
}

module.exports = UpdateUser

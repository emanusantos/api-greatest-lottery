'use strict'

class Bet {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      'betCart': 'required|array',
      'betCart.*.numbers': 'required',
      'betCart.*.game_id': 'required|integer'
    }
  }
}

module.exports = Bet

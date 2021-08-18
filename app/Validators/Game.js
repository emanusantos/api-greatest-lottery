'use strict'

class Game {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      type: 'required|string',
      description: 'required|string',
      range: 'required|integer',
      price: 'required|number',
      max_number: 'required|integer',
      color: 'required|string',
      min_cart_value: 'required|number'
    }
  }
}

module.exports = Game

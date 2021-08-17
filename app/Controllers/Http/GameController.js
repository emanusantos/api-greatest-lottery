'use strict'

const Game = use('App/Models/Game')

class GameController {
  async index ({ request, response, view }) {
  }

  async store ({ request }) {
    const data = request.only(['type', 'description', 'range', 'price', 'max_number', 'color', 'min_cart_value'])

    const game = await Game.create(data)

    return game
  }

  async show ({ params, request, response, view }) {
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = GameController

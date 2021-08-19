'use strict'

const Game = use('App/Models/Game')

class GameController {
  async index () {
    // Fetch the Game database table. 
    const games = await Game.query().fetch()

    return games
  }

  async store ({ request }) {
    // Request the specified keys that are required in the table. 
    const data = request.only(['type', 'description', 'range', 'price', 'max_number', 'color', 'min_cart_value'])

    const game = await Game.create(data)

    return game
  }

  async show ({ params }) {
    // Show the specified game based on the id request params
    const game = await Game.findOrFail(params.id)
        
    return game
  }

  async update ({ params, request }) {
    // Update an specific game based on the id request params
    const game = await Game.findOrFail(params.id)
    const data = request.only(['type', 'description', 'range', 'price', 'max_number', 'color', 'min_cart_value'])

    game.merge(data)

    await game.save()

    return game
  }

  async destroy ({ params }) {
    // Delete an specific game based on the id request params
    const game = await Game.findOrFail(params.id)

    await game.delete()
  }
}

module.exports = GameController

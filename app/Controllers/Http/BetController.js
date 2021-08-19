'use strict'

const Bet = use('App/Models/Bet')
const Game = use('App/Models/Game')

/**
 * Resourceful controller for interacting with bets
 */
class BetController {
  /**
   * Show a list of all bets.
   * GET bets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ auth }) {
    const bets = await Bet.query().where('user_id', auth.user.id).with('game').fetch()

    return bets
  }

  async store ({ request, auth }) {
    const data = request.only(['betCart'])
    let responseData = []

    for (let bet of data.betCart) {
      let currentGame = await Game.findByOrFail("id", bet.game_id)
      let price = currentGame.price
      await Bet.create({ user_id: auth.user.id, game_id: bet.game_id, price, ...bet });
      responseData.push({ user_id: auth.user.id, game_id: bet.game_id, price, ...bet });
    }

    return {...responseData}
  }

  /**
   * Display a single bet.
   * GET bets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const bet = await Bet.findOrFail(params.id)

    return bet
  }

  /**
   * Delete a bet with id.
   * DELETE bets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params }) {
    const bet = await Bet.findByOrFail(params.id)

    await bet.delete()
  }
}

module.exports = BetController

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
      await Bet.create({ ...bet, user_id: auth.user.id, game_id: bet.game_id, price });
      responseData.push({ ...bet, user_id: auth.user.id, game_id: bet.game_id, price });
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
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing bet.
   * GET bets/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update bet details.
   * PUT or PATCH bets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a bet with id.
   * DELETE bets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = BetController

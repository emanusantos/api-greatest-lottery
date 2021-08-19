'use strict'

const Bet = use('App/Models/Bet')
const Game = use('App/Models/Game')
const Mail = use('Mail')

class BetController {
  async index ({ auth }) {
    /* Query the Bet database table, with user_id being the current authenticated user, 
    and displaying the game it is showing. */
    const bets = await Bet.query().where('user_id', auth.user.id).with('game').fetch()

    return bets
  }

  async store ({ request, auth }) {
    // Request the cart of bets that is being saved from the client-side application
    const data = request.only(['betCart'])
    // Make an empty array to store and display the saved bets for the user
    let responseData = []

    // Use an for... of loop to iterate the received array and create the bets with the bets (objects) in the array
    for (let bet of data.betCart) {
      /* Based on every iteration, 
      get the game that matches the id based on the game id's received by the user request */
      let currentGame = await Game.findByOrFail("id", bet.game_id)
      // Inserts the bet price based on the currentGame variable
      let price = currentGame.price
      /* Create and bet and assign the user_id variable to the current authorized user making the request, 
      the game_id variable to the matched game id, and the price provided by the price variable */
      await Bet.create({ user_id: auth.user.id, game_id: bet.game_id, price, ...bet });
      /* Push the saved bets to the responseData array for display purposes in the return */
      responseData.push({ user_id: auth.user.id, game_id: bet.game_id, price, ...bet });
    }

    // Send an confirmation e-mail to the user
    await Mail.send(['emails.new_bet'], { name: auth.user.name }, message => {
      message
      .to(auth.user.email)
      .from('emanuel.santos@luby.software', 'Emanuel | Luby Software')
      .subject('TGL - New Bet')
  })

    return {...responseData}
  }

  // Query and show the specific bet with the id provided by the request param
  async show ({ params }) {
    const bet = await Bet.findOrFail(params.id)

    return bet
  }

  // Query and delete the specific bet with the id provided by the request param
  async destroy ({ params }) {
    const bet = await Bet.findByOrFail(params.id)

    await bet.delete()
  }
}

module.exports = BetController

'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('users', 'UserController.create').validator('User')
Route.resource('users', 'UserController').apiOnly()
Route.post('sessions', 'SessionController.store').validator('Session')
Route.post('passwords', 'ForgotPasswordController.store').validator('ForgotPassword')
Route.put('passwords', 'ForgotPasswordController.update').validator('ResetPassword')
Route.resource('games', 'GameController').apiOnly()
Route.group(() => {
    Route.resource('bets', 'BetController').apiOnly()
}).middleware(['auth'])




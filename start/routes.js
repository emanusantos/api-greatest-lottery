'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.resource('users', 'UserController').apiOnly().validator(new Map(
    [
        [
            ['users.store'], 
            ['User']
        ],
        [
            ['users.update'],
            ['UpdateUser']
        ]
    ]
))

Route.post('sessions', 'SessionController.store').validator('Session')
Route.post('passwords', 'ForgotPasswordController.store').validator('ForgotPassword')
Route.put('passwords', 'ForgotPasswordController.update').validator('ResetPassword')
Route.resource('games', 'GameController').apiOnly().validator(new Map(
    [
        [
            ['games.store', 'games.update'], 
            ['Game']
        ]
    ]
))
Route.group(() => {
    Route.resource('bets', 'BetController').apiOnly()
}).middleware(['auth'])




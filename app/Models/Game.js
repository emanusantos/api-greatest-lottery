'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Game extends Model {
    bet () {
        return this.hasMany('App/Models/Game')
    }
}

module.exports = Game

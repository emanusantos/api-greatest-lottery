'use strict'

const User = use('App/Models/User')
const Mail = use('Mail')

class UserController {
    async index () {
        const users = await User.query().fetch()

        return users
    }

    async store ({ request, response }) {
        try {
            const data = request.only(['name', 'email', 'password'])

            const user = await User.create(data)

            await Mail.send(['emails.new_user'], { name: user.name }, message => {
                message
                .to(user.email)
                .from('emanuel.santos@luby.software', 'Emanuel | Luby Software')
                .subject('Welcome to TGL')
            })

            return user
        } catch (err) {
            return response.status(err.status).send({ error: { message: "Something went wrong with your registration" } })
        }
    }

    async show ({ params }) {
        const user = await User.findOrFail(params.id)
        
        await user.load('bets')
        
        return user
    }

    async update ({ params, request }) {
        const user = await User.findOrFail(params.id)
        const data = request.only(['name', 'email'])

        user.merge(data)

        await user.save()

        return user
    }

    async destroy ({ params }) {
        const user = await User.findOrFail(params.id)

        await user.delete()
    }
}

module.exports = UserController

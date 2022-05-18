const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');

class userController {
    static signUp(req, res, next) {
        let { email, password } = req.body
        User.create({ email, password })
            .then((user) => {
                let dataUser = {
                    id: user.id,
                    email: user.email
                }
                res.status(201).json(dataUser);
            })
            .catch(err => {
                next(err)
            })
    }
    static signIn(req, res, next) {
        let { email, password } = req.body
        User.findOne({ where: { email } })
            .then(user => {
                let isPasswordTrue = comparePassword(password, user.password)
                if (user && isPasswordTrue) {
                    let token = generateToken({
                        id: user.id,
                        email: user.email
                    })
                    res.status(200).json({ token })
                }
                else {
                    next({ status: 401, message: 'Invalid Email or Password' })
                }
            })
            .catch(next)
    }
    static googleLogin(req, res, next) {
        let { id_token } = req.body
        let email = ""
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_CLIENT_ID,
        })
            .then(ticket => {
                const payload = ticket.getPayload()
                email = payload.email
                return User.findOne({ where: { email } })
            })
            .then(user => {
                if (user) {
                    return user
                }
                else {
                    return User.create({
                        email: email,
                        password: Math.random() * 1000000 + 'passwordGoogle'
                    })
                }
            })
            .then(user => {
                let token = generateToken({
                    id: user.id,
                    email: user.email
                })
                res.status(200).json({ token })
            })
            .catch(next)
    }
}

module.exports = userController

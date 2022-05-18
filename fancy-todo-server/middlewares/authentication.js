const {verifyToken} = require('../helpers/jwt')
const {User} = require('../models')

const authentication = function (req, res, next) {
  const {token} = req.headers
  try {
    let decoded = verifyToken(token)

    User.findOne({where: {email: decoded.email}})
      .then(foundUser => {
        if (foundUser) {
          req.loggedUser = decoded
          next()
        } else {
          next({status: 401, message: 'Invalid JWT'})
        }
      })
      .catch(next)
  } catch (err) {
    next({status: 403, message: 'Login First!'})
  }
}

module.exports = authentication
